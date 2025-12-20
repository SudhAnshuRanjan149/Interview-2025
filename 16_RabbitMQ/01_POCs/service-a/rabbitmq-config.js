const amqp = require('amqplib');

class RabbitMQConnection {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
  }

  async connect(url, serviceName) {
    try {
      const connectionOptions = {
        heartbeat: 60,
        connectionTimeout: 30000,
      };

      console.log(`[${serviceName}] Attempting to connect to RabbitMQ...`);
      this.connection = await amqp.connect(url, connectionOptions);
      this.channel = await this.connection.createChannel();

      await this.channel.prefetch(10);

      console.log(`[${serviceName}] Connected to RabbitMQ securely`);

      this.connection.on('error', (err) => {
        console.error(`[${serviceName}] Connection error:`, err.message);
      });

      this.connection.on('close', () => {
        console.log(`[${serviceName}] Connection closed. Reconnecting...`);
        setTimeout(() => this.reconnect(url, serviceName), 3000);
      });

      this.reconnectAttempts = 0;
      return this.channel;
    } catch (error) {
      console.error(`[${serviceName}] Failed to connect:`, error.message);
      await this.reconnect(url, serviceName);
      throw error;
    }
  }

  async reconnect(url, serviceName) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      console.log(`[${serviceName}] Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms...`);
      
      return new Promise((resolve) => {
        setTimeout(async () => {
          try {
            await this.connect(url, serviceName);
            resolve();
          } catch (err) {
            // Will retry automatically
          }
        }, delay);
      });
    } else {
      console.error(`[${serviceName}] Max reconnect attempts reached`);
      process.exit(1);
    }
  }

  async close() {
    try {
      await this.channel?.close();
      await this.connection?.close();
    } catch (err) {
      console.error('Error closing connection:', err.message);
    }
  }
}

module.exports = RabbitMQConnection;
