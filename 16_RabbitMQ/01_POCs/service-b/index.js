require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const RabbitMQConnection = require('./rabbitmq-config');

const app = express();
app.use(helmet());
app.use(express.json());

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

    // Ensure exchanges exist
    await channel.assertExchange(EXCHANGES.DIRECT, 'direct', { durable: true });
    await channel.assertExchange(EXCHANGES.FANOUT, 'fanout', { durable: true });
    await channel.assertExchange(EXCHANGES.TOPIC, 'topic', { durable: true });

    // Declare Dead Letter Queue
    await channel.assertQueue(QUEUES.DLQ, { durable: true });

    // Use consistent queue options matching Service A
    const queueOptions = {
      durable: true,
      deadLetterExchange: '',
      deadLetterRoutingKey: QUEUES.DLQ,
      messageTtl: 86400000
    };

    // 1. Consumer for Direct Exchange (Orders)
    await channel.assertQueue(QUEUES.ORDER_QUEUE, queueOptions);
    await channel.bindQueue(QUEUES.ORDER_QUEUE, EXCHANGES.DIRECT, 'order.create');

    channel.consume(QUEUES.ORDER_QUEUE, async (msg) => {
      if (msg) {
        try {
          const order = JSON.parse(msg.content.toString());
          console.log('[Service B] Processing order:', order.id);

          // Simulate order processing
          await new Promise(resolve => setTimeout(resolve, 1000));

          channel.ack(msg);
          console.log('[Service B] Order processed successfully:', order.id);
        } catch (error) {
          console.error('[Service B] Error processing order:', error);
          channel.nack(msg, false, msg.fields.redelivered === false);
        }
      }
    }, { noAck: false });

    // 2. Consumer for Fanout Exchange (Broadcasts)
    await channel.assertQueue(QUEUES.NOTIFICATION_QUEUE, queueOptions);
    await channel.bindQueue(QUEUES.NOTIFICATION_QUEUE, EXCHANGES.FANOUT, '');

    channel.consume(QUEUES.NOTIFICATION_QUEUE, (msg) => {
      if (msg) {
        const broadcast = JSON.parse(msg.content.toString());
        console.log('[Service B] Received broadcast:', broadcast.message);
        channel.ack(msg);
      }
    }, { noAck: false });

    // 3. Consumer for Topic Exchange (Events)
    const eventQueue = await channel.assertQueue('service_b_events', { durable: true });
    await channel.bindQueue(eventQueue.queue, EXCHANGES.TOPIC, 'user.*');
    await channel.bindQueue(eventQueue.queue, EXCHANGES.TOPIC, 'payment.#');

    channel.consume(eventQueue.queue, (msg) => {
      if (msg) {
        const event = JSON.parse(msg.content.toString());
        console.log('[Service B] Event received:', event.routingKey, '- Data:', event);
        channel.ack(msg);
      }
    }, { noAck: false });

    // 4. RPC Server for Payment Processing
    await channel.assertQueue(QUEUES.PAYMENT_QUEUE, queueOptions);

    channel.consume(QUEUES.PAYMENT_QUEUE, async (msg) => {
      if (msg) {
        try {
          const request = JSON.parse(msg.content.toString());
          console.log('[Service B] RPC request received - Processing payment:', request);

          // Simulate payment processing
          await new Promise(resolve => setTimeout(resolve, 500));

          const response = {
            success: true,
            transactionId: `TXN-${Date.now()}`,
            amount: request.amount,
            currency: request.currency || 'USD',
            timestamp: new Date().toISOString()
          };

          // Send response back
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(response)),
            {
              correlationId: msg.properties.correlationId
            }
          );

          channel.ack(msg);
          console.log('[Service B] Payment processed, response sent:', response.transactionId);
        } catch (error) {
          console.error('[Service B] Error in RPC handler:', error);
          channel.nack(msg, false, false);
        }
      }
    }, { noAck: false });

    console.log('[Service B] RabbitMQ consumers ready');
    console.log('[Service B] Listening on queues:');
    console.log('  - orders.process (Direct Exchange)');
    console.log('  - notifications (Fanout Exchange)');
    console.log('  - service_b_events (Topic Exchange - user.*, payment.#)');
    console.log('  - payments.process (RPC Pattern)');
  } catch (error) {
    console.error('[Service B] Setup error:', error);
    process.exit(1);
  }
}

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'service-b' });
});

setupRabbitMQ().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`[Service B] Running on port ${process.env.PORT}`);
  });
});

process.on('SIGINT', async () => {
  console.log('[Service B] Shutting down gracefully...');
  await rmqConnection.close();
  process.exit(0);
});
