# Apache Kafka - Interview Questions & Answers

## Questions List

1. [What is Apache Kafka and what problem does it solve?](#1-what-is-apache-kafka-and-what-problem-does-it-solve)

2. [Explain the key components of Kafka: Broker, Topic, Partition, Producer, Consumer, and Zookeeper/Kraft.](#2-explain-the-key-components-of-kafka-broker-topic-partition-producer-consumer-and-zookeepercraft)

3. [What is a Kafka Topic and how do partitions work?](#3-what-is-a-kafka-topic-and-how-do-partitions-work)

4. [What is the difference between Kafka Producer and Consumer?](#4-what-is-the-difference-between-kafka-producer-and-consumer)

5. [How does Kafka ensure durability and reliability of messages?](#5-how-does-kafka-ensure-durability-and-reliability-of-messages)

6. [What is a Consumer Group and how does it enable parallelism and scalability?](#6-what-is-a-consumer-group-and-how-does-it-enable-parallelism-and-scalability)

7. [Explain the difference between at-most-once, at-least-once, and exactly-once delivery semantics in Kafka.](#7-explain-the-difference-between-at-most-once-at-least-once-and-exactly-once-delivery-semantics-in-kafka)

8. [What is Kafka retention policy and how is it configured?](#8-what-is-kafka-retention-policy-and-how-is-it-configured)

9. [How does replication work in Kafka and what are leader and follower replicas?](#9-how-does-replication-work-in-kafka-and-what-are-leader-and-follower-replicas)

10. [What is ISR (In-Sync Replica) and why is it important?](#10-what-is-isr-in-sync-replica-and-why-is-it-important)

11. [Explain the role of offsets in Kafka and how consumers manage offsets.](#11-explain-the-role-of-offsets-in-kafka-and-how-consumers-manage-offsets)

12. [What is the difference between Kafka's "log compaction" and "log retention by time/size"?](#12-what-is-the-difference-between-kafkas-log-compaction-and-log-retention-by-timesize)

13. [How does Kafka achieve high throughput and low latency?](#13-how-does-kafka-achieve-high-throughput-and-low-latency)

14. [What is a Kafka partition key and how does it affect message distribution?](#14-what-is-a-kafka-partition-key-and-how-does-it-affect-message-distribution)

15. [Explain idempotent producers and transactional messaging in Kafka.](#15-explain-idempotent-producers-and-transactional-messaging-in-kafka)

16. [What is the difference between Kafka and traditional message queues like RabbitMQ or ActiveMQ?](#16-what-is-the-difference-between-kafka-and-traditional-message-queues-like-rabbitmq-or-activemq)

17. [How do you handle schema evolution with Kafka messages (e.g., using Schema Registry, Avro, Protobuf)?](#17-how-do-you-handle-schema-evolution-with-kafka-messages-eg-using-schema-registry-avro-protobuf)

18. [What is Kafka Streams and how is it different from Kafka Connect?](#18-what-is-kafka-streams-and-how-is-it-different-from-kafka-connect)

19. [What is Kafka Connect and when would you use a source connector vs a sink connector?](#19-what-is-kafka-connect-and-when-would-you-use-a-source-connector-vs-a-sink-connector)

20. [How do you monitor and tune Kafka cluster performance (key metrics and tools)?](#20-how-do-you-monitor-and-tune-kafka-cluster-performance-key-metrics-and-tools)

21. [What is backpressure in Kafka consumers and how do you handle it?](#21-what-is-backpressure-in-kafka-consumers-and-how-do-you-handle-it)

22. [How would you design a scalable Kafka-based system for event-driven microservices?](#22-how-would-you-design-a-scalable-kafka-based-system-for-event-driven-microservices)

23. [What happens when a Kafka broker goes down? How does Kafka handle failover?](#23-what-happens-when-a-kafka-broker-goes-down-how-does-kafka-handle-failover)

24. [How do you secure a Kafka cluster (authentication, authorization, encryption)?](#24-how-do-you-secure-a-kafka-cluster-authentication-authorization-encryption)

25. [What are common causes of message loss or duplication in Kafka and how do you prevent them?](#25-what-are-common-causes-of-message-loss-or-duplication-in-kafka-and-how-do-you-prevent-them)

---

## Detailed Answers

---

### 1. What is Apache Kafka and what problem does it solve?

**Apache Kafka** is a distributed, fault-tolerant event streaming platform designed for high-throughput, low-latency ingestion and processing of real-time data streams.

### Problems It Solves:
- **Decoupling** producers and consumers
- Handling **massive message volumes**
- **Reliably storing and distributing** events
- Use cases include:
  - Logging
  - Metrics collection
  - Event-driven architectures
  - Data pipelines

---

### 2. Explain the key components of Kafka: Broker, Topic, Partition, Producer, Consumer, and Zookeeper/KRaft.

### Broker
- A Kafka server that stores message data and serves client requests (producers/consumers)
- A Kafka cluster consists of multiple brokers for scalability and fault tolerance

### Topic
- A named logical stream/category of messages (e.g., "orders", "payments")
- Producers write messages to topics; consumers read from topics

### Partition
- A topic is split into multiple partitions for parallelism and scalability
- Each partition is an ordered, immutable log of messages

### Producer
- Client that publishes (writes) messages to Kafka topics
- Can control:
  - Partitioning
  - Acks
  - Retries
  - Batching
  - Compression

### Consumer
- Client that subscribes to one or more topics and reads messages
- Works in consumer groups for load balancing and fault tolerance

### Zookeeper / KRaft
- **Zookeeper (legacy)**: External coordination service used for metadata, leader election, and configuration management
- **KRaft (Kafka Raft)**: Kafka's internal consensus protocol replacing Zookeeper, managing metadata quorum within Kafka itself

---

### 3. What is a Kafka Topic and how do partitions work?

### Kafka Topic
- Logical category or feed name to which messages are published
- Messages are appended to topics and are read by consumers independently

### Partitions
A topic is divided into partitions to:
- Enable **parallel processing**
- **Distribute load** across brokers

**Key characteristics:**
- Each partition is an ordered log; messages are identified by an **offset**
- Within a partition, **ordering is guaranteed**; across partitions, no global ordering
- More partitions → higher parallelism but more overhead for coordination and file handles

---

### 4. What is the difference between Kafka Producer and Consumer?

### Producer
- Sends messages to topics
- Decides:
  - Which topic and partition to write to
  - Acknowledgment level (`acks=0,1,all`)
  - Batch size, compression, retries
- Typically **"push"-based**: actively sends data to Kafka

### Consumer
- Reads messages from topics/partitions
- **Pull-based model**: consumer polls Kafka for messages
- Uses consumer groups:
  - Partitions are distributed across consumers for parallelism
- Manages offsets (commit/seek) to control read position

---

### 5. How does Kafka ensure durability and reliability of messages?

### Durability
- Messages are written to disk in append-only logs (OS page cache friendly)
- **Replication**: Each partition has multiple replicas across brokers
- **Acks**:
  - `acks=all`: leader waits until replicas in ISR have persisted the message
- Configurable retention ensures messages remain stored for a defined time/size or via compaction

### Reliability
- **Leader–follower replication**; if leader fails, a follower in ISR is elected as new leader
- Producer retries and idempotence reduce loss or duplication
- Consumers can commit offsets after processing to avoid losing processed data

---

### 6. What is a Consumer Group and how does it enable parallelism and scalability?

### What is a Consumer Group?
A group of one or more consumers sharing the same `group.id` that coordinate to consume data from a set of topics.

**Key rule:** Each partition in a topic is consumed by only one consumer instance within the group at a time.

### Parallelism and Scalability
- Adding more consumers in the same group increases parallelism up to the number of partitions
- **Rebalance**: When consumers join/leave, Kafka redistributes partitions across consumers
- Multiple groups can read the same topic independently for different applications

---

### 7. Explain the difference between at-most-once, at-least-once, and exactly-once delivery semantics in Kafka.

### At-Most-Once
- Messages **may be lost** but never processed more than once
- Offsets are committed before processing or without retries
- Used when occasional loss is acceptable but duplicates are not

### At-Least-Once
- Messages are **not lost** but may be processed multiple times (duplicates)
- Offsets are committed after processing and retries are enabled
- Common default in many systems; consumers must handle idempotency

### Exactly-Once
- Messages are processed **once and only once**
- Kafka supports this via idempotent producers and transactions:
  - Producer IDs and sequence numbers
  - Transactional writes spanning producer and consumer offset commits
- Requires correct usage of transactional APIs and EOS configuration

---

### 8. What is Kafka retention policy and how is it configured?

### What is Retention Policy?
Defines how long or how much data Kafka keeps per topic. Kafka is not a traditional queue; it retains messages based on time/size, not consumption.

### Configuration Options

#### Time-Based Retention
- `log.retention.hours` / `log.retention.ms`
- Retain data for a specified time (e.g., 168 hours for a week)

#### Size-Based Retention
- `log.retention.bytes`
- Retain data until total size per partition exceeds a limit

#### Cleanup Policy
- `log.cleanup.policy`:
  - **"delete"**: delete older segments according to retention
  - **"compact"**: keep latest record per key (log compaction)

These can be configured at broker level and overridden per topic.

---

### 9. How does replication work in Kafka and what are leader and follower replicas?

### How Replication Works
- Each partition is replicated to multiple brokers
- One replica is the **leader**; others are **followers**

### Leader Replica
- Handles all reads and writes for that partition
- Responsible for coordinating replication to followers

### Follower Replicas
- Fetch data from the leader asynchronously
- Maintain a copy of the partition log
- If the leader fails, one of the in-sync followers is elected as the new leader

---

### 10. What is ISR (In-Sync Replica) and why is it important?

### What is ISR?
**In-Sync Replicas (ISR)** is the set of replicas that are fully caught up with the leader within a certain lag threshold. It includes the leader and followers that are synchronized.

### Why is it Important?
- Only replicas in ISR are eligible to become leader during failover, ensuring no data loss within committed constraints
- `acks=all` uses ISR to decide when a write is considered committed
- Monitoring ISR shrinkage helps detect lagging replicas and potential reliability issues

---

### 11. Explain the role of offsets in Kafka and how consumers manage offsets.

### What is an Offset?
A monotonically increasing integer identifying a message's position within a partition log. Acts as a pointer for consumers to track read progress.

### Consumer Offset Management
- Consumers track last processed offset per partition
- Offsets can be:
  - **Automatically committed** (`enable.auto.commit`)
  - **Manually committed** (synchronous/asynchronous) for more control
- Offsets are generally stored in:
  - `__consumer_offsets` internal topic (Kafka's default)
  - Or external stores like DB/ZooKeeper in custom setups
- Consumers can seek to specific offsets, beginning, or end for reprocessing or backfill

---

### 12. What is the difference between Kafka's "log compaction" and "log retention by time/size"?

### Log Retention by Time/Size
- Policy: **"delete"**
- Kafka deletes old log segments based on:
  - Age (`retention.ms`/`retention.hours`)
  - Total size (`retention.bytes`)
- All messages older than threshold are removed, regardless of key

### Log Compaction
- Policy: **"compact"** (or "compact,delete" combined)
- Kafka keeps at least the latest value for each key
- Older records with the same key are eventually removed
- **Use cases:**
  - Changelog topics
  - State reconstruction
  - Durable key-value snapshots

---

### 13. How does Kafka achieve high throughput and low latency?

### Design Characteristics

#### Append-Only Logs
- Sequential disk writes, leveraging OS page cache for efficiency

#### Batching
- Producers batch messages and compress them before sending

#### Zero-Copy
- Uses `sendfile` to transfer data directly from disk to network

#### Partitioning
- Distributes load across brokers and CPU cores

#### Asynchronous I/O
- Network and disk operations are pipelined

### Configuration Tuning
- **Producer**: `batch.size`, `linger.ms`, `compression.type`
- **Broker**: `num.io.threads`, `num.network.threads`, replication settings
- Proper hardware (SSD, network) and OS tuning

---

### 14. What is a Kafka partition key and how does it affect message distribution?

### What is a Partition Key?
A value provided by the producer used to determine which partition a message goes to.

### How It Works
- **If key is null**: Default partitioner may round-robin among partitions
- **If key is provided**: Partition is chosen by hashing the key (e.g., `hash(key) % numPartitions`)

### Effects
- Ensures **message ordering per key** (all events for a key go to the same partition)
- Enables **data locality** (e.g., all events for a user or entity on one partition)
- ⚠️ Uneven key distribution can cause partition skew (hot partitions), affecting performance

---

### 15. Explain idempotent producers and transactional messaging in Kafka.

### Idempotent Producers
- Guarantee that resending the same message due to retries does not result in duplicates in a partition
- Kafka uses:
  - Producer ID (PID)
  - Sequence numbers per partition
- Broker detects duplicates and discards them
- Enabled via configuration: `enable.idempotence=true`

### Transactional Messaging
- Provides **exactly-once semantics** across multiple partitions and topics
- Allows grouping of writes and consumer offset commits into a single atomic transaction
- Uses `transactional.id` and transaction APIs:
  - `beginTransaction`
  - `send`
  - `sendOffsetsToTransaction`
  - `commitTransaction`/`abortTransaction`

---

### 16. What is the difference between Kafka and traditional message queues like RabbitMQ or ActiveMQ?

### Apache Kafka
- Log-based, persistent event streaming platform
- Messages retained for configured time/size regardless of consumption
- Consumers manage their own offsets; multiple consumer groups can independently read
- Designed for **high throughput**, horizontal scaling, and long-term storage
- Excellent for:
  - Event sourcing
  - Stream processing
  - Data pipelines

### Traditional MQ (RabbitMQ/ActiveMQ)
- Message brokers with queue semantics
- Messages are usually deleted once consumed (at-least-once semantics)
- Strong focus on per-message acknowledgments, routing, and complex delivery patterns
- More suited for **transactional**, low-latency, command-style messaging

---

### 17. How do you handle schema evolution with Kafka messages (e.g., using Schema Registry, Avro, Protobuf)?

### Approach
Use a schema-aware serialization format:
- **Avro**
- **Protobuf**
- **JSON with schema**

Use a **Schema Registry**:
- Stores schemas centrally and assigns schema IDs
- Producers write a schema ID plus serialized data
- Consumers fetch schema by ID

### Handling Schema Evolution
Design schemas with backward/forward compatibility:
- Add optional fields with defaults
- Avoid removing/renaming fields in breaking ways

**Versioning:**
- Each schema change is a new version in the registry
- Consumers/producers can be upgraded independently as long as compatibility rules are honored

---

### 18. What is Kafka Streams and how is it different from Kafka Connect?

### Kafka Streams
- A Java library for building **stream processing applications** on top of Kafka
- Provides high-level DSL (map, filter, join, aggregate, window) and low-level Processor API
- Runs inside application processes; no separate cluster needed
- Handles state, fault tolerance, repartitioning, and exactly-once processing

### Kafka Connect
- A framework for scalable, fault-tolerant **integration** between Kafka and external systems
- Uses reusable connectors:
  - **Source connectors**: ingest data into Kafka
  - **Sink connectors**: push data from Kafka to external systems
- Runs as standalone or distributed workers, separate from application code

---

### 19. What is Kafka Connect and when would you use a source connector vs a sink connector?

### What is Kafka Connect?
A framework to move data between Kafka and other systems with minimal custom code. Provides configuration-based deployment of connectors.

### Source Connector
Reads data from an external system and writes to Kafka topics.

**Examples:**
- JDBC Source Connector reading DB tables into Kafka
- File Source Connector tailing logs

### Sink Connector
Reads data from Kafka topics and writes to an external system.

**Examples:**
- Elasticsearch Sink writing events to indices
- JDBC Sink writing Kafka events into a database

---

### 20. How do you monitor and tune Kafka cluster performance (key metrics and tools)?

### Key Metrics to Monitor

#### Broker Metrics
- BytesIn/Out per second
- Request latency (produce/fetch time)
- Under-replicated partitions
- ISR size and shrink/expand events

#### Producer Metrics
- Record send rate
- Batch sizes
- Retries
- Errors

#### Consumer Metrics
- **Lag per partition** (difference between latest offset and committed offset)

#### System Metrics
- CPU, memory, disk I/O, network utilization

### Monitoring Tools
- Kafka's JMX metrics (exposed via Prometheus, Grafana dashboards)
- Confluent Control Center
- LinkedIn Burrow
- Cruise Control
- Logs and topic-level metrics

### Tuning Configuration
- **Producer**: `batch.size`, `linger.ms`, `compression.type`, `acks`
- **Broker**: `num.partitions`, replication factor, `log.segment.bytes`
- **Consumer**: `max.poll.records`, `fetch.min.bytes`, `session.timeout.ms`

---

### 21. What is backpressure in Kafka consumers and how do you handle it?

### What is Backpressure?
A condition where consumers cannot keep up with the rate of incoming messages. This leads to growing consumer lag and potential resource exhaustion in downstream systems.

### Handling Strategies

#### Scale Out
Add more consumers in the group (up to number of partitions)

#### Tune Consumer
- Increase `max.poll.records`
- Optimize processing logic
- Use async I/O

#### Apply Flow Control
- Use rate-limiting
- Buffering
- Batching downstream

#### Use Backpressure-Aware Frameworks
- Reactive streams
- Kafka Streams with appropriate configuration

#### Last Resort
Reduce producer rate or apply throttling

---

### 22. How would you design a scalable Kafka-based system for event-driven microservices?

### Key Design Elements

#### Topics for Domain Events
Use Kafka topics for domain events (e.g., `OrderCreated`, `PaymentCompleted`)

#### Microservice Pattern
Each microservice:
- Publishes events for state changes
- Subscribes to relevant topics for reacting to other services' events

#### Topic Design
- Use partition keys based on entities (`userId`, `orderId`) for ordering
- Separate topics for commands vs events if needed

### Scalability
- Use sufficient partitions for expected throughput and consumer parallelism
- Scale services horizontally; each instance joins consumer group
- Leverage Kafka Streams or other stream processors for aggregation and projection

### Reliability
- Use replication factor and `acks=all`
- Implement idempotent event handlers and deduplication if necessary
- Define clear contracts for schemas and use Schema Registry

---

### 23. What happens when a Kafka broker goes down? How does Kafka handle failover?

### What Happens When a Broker Goes Down?
- Partitions for which it was leader or follower become temporarily unavailable or under-replicated
- Controller detects failure via heartbeat/metadata

### Failover Process

1. **Leader Election**
   - For each affected partition, a new leader is elected from ISR replicas (if available)

2. **Metadata Update**
   - Producers and consumers receive updated metadata
   - Redirect requests to new leaders

3. **If No ISR Available**
   - Behavior depends on configuration (e.g., `unclean.leader.election`):
     - May wait for ISR to return (safer)
     - Or elect an out-of-sync replica (risking data loss)

---

### 24. How do you secure a Kafka cluster (authentication, authorization, encryption)?

### Authentication
Use SSL/TLS client auth or SASL mechanisms:
- SASL/SCRAM
- SASL/GSSAPI (Kerberos)
- SASL/OAUTHBEARER

Clients must present valid credentials.

### Authorization
Use Kafka's **ACLs** (Access Control Lists):
- Define who can read/write/admin on topics, consumer groups, and cluster
- Manage via CLI or external tools

### Encryption
Enable TLS for:
- **Client–broker communication** (listeners with SSL)
- **Inter-broker communication**
- Protects data in transit and mitigates eavesdropping

### Additional Security Measures
- Network isolation (VPC, firewalls, security groups)
- Auditing and logging of access
- Rotate credentials and certificates regularly

---

### 25. What are common causes of message loss or duplication in Kafka and how do you prevent them?

### Common Causes of Message Loss

#### Producer Issues
- `acks=0` or `acks=1` with leader failure before replication
- Not retrying on transient failures

#### Consumer Issues
- Committing offsets before processing
- Using auto-commit with slow processing causing unexpected behavior

#### Cluster Issues
- Unclean leader election with out-of-sync replicas

### Preventing Message Loss
- Use `acks=all` and replication factor ≥ 3
- Enable idempotent producer and retries
- Ensure `min.insync.replicas` is properly configured
- Commit offsets only after successful processing

### Common Causes of Duplication
- Producer retries without idempotence
- Consumer reprocessing messages after failure because offset not committed

### Preventing Duplication
- Use idempotent producers and transactional APIs for EOS
- Implement idempotent consumers (deduplicate by key, maintain processed offsets/state)

---

## Additional Resources

- [Apache Kafka Official Documentation](https://kafka.apache.org/documentation/)
- [Confluent Documentation](https://docs.confluent.io/)
- [Kafka: The Definitive Guide](https://www.confluent.io/resources/kafka-the-definitive-guide/)

---

*Last Updated: December 2025*
