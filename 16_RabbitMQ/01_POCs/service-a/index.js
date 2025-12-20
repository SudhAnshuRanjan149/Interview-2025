require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const RabbitMQConnection = require('./rabbitmq-config');

const app = express();
app.use(helmet());
app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

const rmqConnection = new RabbitMQConnection();
let channel;

const EXCHANGES = {
  DIRECT: 'direct_exchange',
  FANOUT: 'fanout_exchange',
  TOPIC: 'topic_exchange'
};

const QUEUES = {
  ORDER_QUEUE: 'orders.process',
  NOTIFICATION_QUEUE: 'notifications',
  PAYMENT_QUEUE: 'payments.process',
  DLQ: 'dead_letter_queue'
};

async function setupRabbitMQ() {
  try {
    channel = await rmqConnection.connect(
      process.env.RABBITMQ_URL,
      process.env.SERVICE_NAME
    );

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Declare exchanges with durability
    await channel.assertExchange(EXCHANGES.DIRECT, 'direct', { durable: true });
    await channel.assertExchange(EXCHANGES.FANOUT, 'fanout', { durable: true });
    await channel.assertExchange(EXCHANGES.TOPIC, 'topic', { durable: true });

    // Declare Dead Letter Queue
    await channel.assertQueue(QUEUES.DLQ, { durable: true });

    // Declare queues with consistent options
    const queueOptions = {
      durable: true,
      deadLetterExchange: '',
      deadLetterRoutingKey: QUEUES.DLQ,
      messageTtl: 86400000
    };

    await channel.assertQueue(QUEUES.ORDER_QUEUE, queueOptions);
    await channel.assertQueue(QUEUES.NOTIFICATION_QUEUE, queueOptions);
    await channel.assertQueue(QUEUES.PAYMENT_QUEUE, queueOptions);
    
    // Bind queues to exchanges
    await channel.bindQueue(QUEUES.ORDER_QUEUE, EXCHANGES.DIRECT, 'order.create');
    await channel.bindQueue(QUEUES.NOTIFICATION_QUEUE, EXCHANGES.FANOUT, '');

    // Consumer for responses from Service B
    const responseQueue = await channel.assertQueue('response_to_service_a', { durable: true });
    await channel.consume(responseQueue.queue, async (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        console.log('[Service A] Received response:', content);
        channel.ack(msg);
      }
    }, { noAck: false });

    console.log('[Service A] RabbitMQ setup complete');
  } catch (error) {
    console.error('[Service A] Setup error:', error);
    process.exit(1);
  }
}

// 1. Direct Exchange Pattern - Point-to-Point
app.post('/api/orders', async (req, res) => {
  try {
    const order = {
      id: Date.now(),
      ...req.body,
      timestamp: new Date().toISOString()
    };

    const message = Buffer.from(JSON.stringify(order));
    
    channel.publish(
      EXCHANGES.DIRECT,
      'order.create',
      message,
      {
        persistent: true,
        contentType: 'application/json',
        messageId: order.id.toString(),
        timestamp: Date.now(),
        appId: process.env.SERVICE_NAME
      }
    );

    console.log('[Service A] Order published:', order.id);
    res.status(202).json({ message: 'Order queued', orderId: order.id });
  } catch (error) {
    console.error('[Service A] Error publishing order:', error);
    res.status(500).json({ error: 'Failed to queue order' });
  }
});

// 2. Fanout Exchange Pattern - Pub/Sub
app.post('/api/broadcast', async (req, res) => {
  try {
    const broadcast = {
      type: 'system_announcement',
      message: req.body.message,
      timestamp: new Date().toISOString()
    };

    channel.publish(
      EXCHANGES.FANOUT,
      '',
      Buffer.from(JSON.stringify(broadcast)),
      { persistent: true }
    );

    console.log('[Service A] Broadcast sent');
    res.json({ message: 'Broadcast sent to all subscribers' });
  } catch (error) {
    res.status(500).json({ error: 'Broadcast failed' });
  }
});

// 3. Topic Exchange Pattern - Pattern Matching
app.post('/api/events/:category/:action', async (req, res) => {
  try {
    const routingKey = `${req.params.category}.${req.params.action}`;
    const event = {
      ...req.body,
      routingKey,
      timestamp: new Date().toISOString()
    };

    channel.publish(
      EXCHANGES.TOPIC,
      routingKey,
      Buffer.from(JSON.stringify(event)),
      { persistent: true }
    );

    console.log('[Service A] Event published:', routingKey);
    res.json({ message: 'Event published', routingKey });
  } catch (error) {
    res.status(500).json({ error: 'Event publish failed' });
  }
});

// 4. RPC Pattern - Request/Response
app.post('/api/rpc/payment', async (req, res) => {
  try {
    const correlationId = Date.now().toString();
    const replyQueue = await channel.assertQueue('', { exclusive: true });

    const responsePromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('RPC timeout'));
      }, 10000);

      channel.consume(replyQueue.queue, (msg) => {
        if (msg && msg.properties.correlationId === correlationId) {
          clearTimeout(timeout);
          resolve(JSON.parse(msg.content.toString()));
          channel.ack(msg);
        }
      }, { noAck: false });
    });

    channel.sendToQueue(
      QUEUES.PAYMENT_QUEUE,
      Buffer.from(JSON.stringify(req.body)),
      {
        correlationId,
        replyTo: replyQueue.queue,
        persistent: true
      }
    );

    const response = await responsePromise;
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'RPC call failed', details: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'service-a' });
});

setupRabbitMQ().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`[Service A] Running on port ${process.env.PORT}`);
  });
});

process.on('SIGINT', async () => {
  console.log('[Service A] Shutting down gracefully...');
  await rmqConnection.close();
  process.exit(0);
});
