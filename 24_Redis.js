/*
TOP 25 MOST ASKED AND IMPORTANT REDIS INTERVIEW QUESTIONS

1. What is Redis and what are its primary use cases?

2. Explain the difference between Redis and traditional relational databases.

3. What data structures does Redis support and when would you use each?

4. How does Redis achieve high performance and low latency?

5. What is Redis persistence and what are the differences between RDB and AOF?

6. Explain Redis Replication and how master-slave replication works.

7. What is Redis Sentinel and how does it provide high availability?

8. What is Redis Cluster and how does it enable horizontal scaling?

9. How does Redis handle data expiration and eviction policies?

10. What is Redis pipelining and how does it improve performance?

11. Explain Redis Transactions (MULTI/EXEC) and their limitations.

12. What is Redis Pub/Sub and what are its use cases and limitations?

13. How do you implement caching strategies with Redis (cache-aside, write-through, write-behind)?

14. What are Redis Streams and how do they differ from Pub/Sub?

15. Explain the concept of Redis keys, namespaces, and key naming conventions.

16. How do you implement distributed locks with Redis (Redlock algorithm)?

17. What is the difference between Redis single-threaded model and multi-threaded I/O?

18. How do you monitor Redis performance and what are the key metrics to track?

19. What are Redis Lua scripts and when would you use them?

20. How do you handle memory management and prevent out-of-memory issues in Redis?

21. What is the difference between Redis GET/SET and GETEX/SETEX commands?

22. How do you implement rate limiting using Redis?

23. What are Redis Sorted Sets and how would you use them for leaderboards or ranking systems?

24. How do you secure Redis (authentication, encryption, network isolation)?

25. What are common performance bottlenecks in Redis and how do you troubleshoot them?
*/



/*
1. What is Redis and what are its primary use cases?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine. It stores data in memory (RAM) for ultra-fast access and supports various data structures like strings, lists, sets, sorted sets, hashes, bitmaps, hyperloglogs, and streams [web:21][web:23].

Primary use cases:
- Caching: Session storage, page caching, API response caching
- Real-time analytics: Counters, metrics, leaderboards
- Message queues and Pub/Sub: Real-time messaging, event streaming
- Distributed locks: Coordination in microservices
- Rate limiting: API throttling, DDoS protection
- Geospatial data: Location-based services
- Session management: Web application sessions
- Full-page caching: High-performance web applications [web:23][web:26]

2. Explain the difference between Redis and traditional relational databases.

Redis vs Relational Databases:
- Storage:
  - Redis: In-memory (RAM), with optional persistence to disk
  - RDBMS: Disk-based with caching layers
- Data Model:
  - Redis: Key-value store with rich data structures (no schema, no tables)
  - RDBMS: Table-based with rows, columns, relationships, and strict schema
- Query Language:
  - Redis: Simple commands (GET, SET, LPUSH, etc.)
  - RDBMS: SQL with complex queries, joins, aggregations
- Performance:
  - Redis: Sub-millisecond latency, millions of operations/sec
  - RDBMS: Slower due to disk I/O, but optimized for complex queries
- Use Cases:
  - Redis: Caching, real-time analytics, temporary data
  - RDBMS: Persistent transactional data, complex relationships
- ACID Properties:
  - Redis: Limited transaction support, eventual consistency in cluster
  - RDBMS: Full ACID compliance [web:21][web:23]

3. What data structures does Redis support and when would you use each?

Redis Data Structures:

- Strings:
  - Basic key-value pairs, can store text, numbers, serialized objects
  - Use cases: Caching, counters (INCR/DECR), session tokens, feature flags
  
- Lists:
  - Ordered collections of strings, implemented as linked lists
  - Use cases: Message queues, activity streams, recent items, timeline feeds [web:23][web:26]
  
- Sets:
  - Unordered collections of unique strings
  - Use cases: Unique visitor tracking, tagging, IP filtering, social graphs (followers/following) [web:26][web:29]
  
- Sorted Sets (ZSets):
  - Sets with scores for ordering
  - Use cases: Leaderboards, ranking systems, priority queues, time-series data [web:23][web:26]
  
- Hashes:
  - Maps of field-value pairs
  - Use cases: User profiles, object storage, shopping carts, configuration
  
- Bitmaps:
  - Bit-level operations on strings
  - Use cases: Real-time analytics, user activity tracking, feature flags
  
- HyperLogLogs:
  - Probabilistic data structure for cardinality estimation
  - Use cases: Unique visitor counts, distinct element counting
  
- Streams:
  - Append-only log data structure
  - Use cases: Event sourcing, message queuing, activity feeds [web:23]

4. How does Redis achieve high performance and low latency?

Redis Performance Factors:

- In-Memory Storage:
  - All data resides in RAM, eliminating disk I/O latency
  - Access times in microseconds vs milliseconds for disk

- Single-Threaded Event Loop:
  - No context switching or thread synchronization overhead
  - Simplified architecture, no lock contention
  - Sequential command execution ensures atomic operations

- Simple Data Structures:
  - Optimized C implementations
  - Direct memory access patterns

- Pipelining:
  - Batch multiple commands, reducing network round trips
  - Client sends multiple commands without waiting for responses

- Efficient Protocols:
  - RESP (Redis Serialization Protocol) is lightweight and simple
  - Minimal parsing overhead

- Zero-Copy Operations:
  - Efficient memory management
  - No unnecessary data copying

- Optimized Algorithms:
  - Skip lists for sorted sets
  - Hash tables with rehashing strategies [web:21][web:23]

5. What is Redis persistence and what are the differences between RDB and AOF?

Redis Persistence Mechanisms:

- RDB (Redis Database Snapshot):
  - Point-in-time snapshots of dataset at intervals
  - Creates binary dump files (dump.rdb)
  - Configured via save points (e.g., save 900 1, save 300 10)
  - Advantages:
    - Compact single file, good for backups
    - Faster restart times
    - Better performance (less overhead)
  - Disadvantages:
    - Potential data loss between snapshots
    - Fork() can be expensive with large datasets
  - Use when: Data loss of a few minutes is acceptable [web:27][web:30]

- AOF (Append-Only File):
  - Logs every write operation in append-only file
  - Can replay operations on restart
  - Sync policies: always, everysec (default), no
  - Advantages:
    - More durable, minimal data loss
    - Human-readable log format
    - Automatic rewrite when file grows large
  - Disadvantages:
    - Larger file sizes
    - Slower restart times
    - Slightly slower performance
  - Use when: Maximum data durability required [web:27][web:30]

- RDB + AOF Combined:
  - Use both simultaneously
  - AOF prioritized during recovery
  - Balance between performance and durability [web:27][web:30]

6. Explain Redis Replication and how master-slave replication works.

Redis Replication:

- Architecture:
  - One master (primary) node, multiple replica (slave) nodes
  - Master handles writes, replicas handle reads
  - Asynchronous replication by default

- How it works:
  1. Replica connects to master with REPLICAOF command
  2. Full sync: Master creates RDB snapshot, sends to replica
  3. Replica loads snapshot, then master streams subsequent writes
  4. Incremental sync: Only changed data sent after initial sync
  5. Heartbeat and monitoring ensure connection health

- Features:
  - Read scalability: Distribute read load across replicas
  - High availability: Replicas can be promoted to master
  - Data redundancy: Multiple copies across nodes
  - Non-blocking: Replication doesn't block master operations

- Limitations:
  - Asynchronous: Potential data loss if master fails before replication
  - Write operations only on master
  - Replication lag in high-load scenarios [web:23]

7. What is Redis Sentinel and how does it provide high availability?

Redis Sentinel:

- Definition:
  - Distributed system for monitoring and automatic failover
  - Provides high availability for Redis deployments

- Key Functions:
  - Monitoring: Continuously checks master and replica health
  - Notification: Alerts administrators about failures
  - Automatic Failover: Promotes replica to master if master fails
  - Configuration Provider: Clients query Sentinel for current master address

- How Failover Works:
  1. Multiple Sentinels monitor Redis instances
  2. Quorum of Sentinels agree master is down (SDOWN → ODOWN)
  3. Sentinels elect a leader to perform failover
  4. Leader promotes best replica to master
  5. Other replicas reconfigured to replicate from new master
  6. Clients receive notification of new master

- Deployment:
  - Run at least 3 Sentinel instances for quorum
  - Deploy on separate machines from Redis nodes
  - Typical setup: 3 Sentinels, 1 master, 2+ replicas [web:21][web:23]

8. What is Redis Cluster and how does it enable horizontal scaling?

Redis Cluster:

- Definition:
  - Native distributed implementation providing automatic sharding
  - Enables horizontal scaling across multiple nodes

- Architecture:
  - Data automatically split across 16,384 hash slots
  - Each master node holds subset of hash slots
  - Each master can have replicas for redundancy
  - Minimum 3 master nodes required

- Sharding:
  - Keys hashed (CRC16) and mapped to slots
  - Slot assignment distributed across masters
  - Hash tags {} allow grouping keys on same node

- Features:
  - Automatic failover: Replicas promoted when master fails
  - Linear scalability: Add nodes to increase capacity
  - No single point of failure
  - Gossip protocol for cluster communication
  - Client-side routing or server-side redirection

- Limitations:
  - Multi-key operations limited to same hash slot
  - No support for SELECT (database selection)
  - More complex setup and management [web:21][web:23]

9. How does Redis handle data expiration and eviction policies?

Data Expiration:

- Commands:
  - EXPIRE: Set timeout in seconds
  - EXPIREAT: Set absolute Unix timestamp
  - TTL: Check remaining time to live
  - PERSIST: Remove expiration

- Expiration Mechanisms:
  - Passive: Keys checked on access, expired ones deleted
  - Active: Random sampling and deletion of expired keys (100 keys/sec)

Eviction Policies (when maxmemory reached):

- noeviction: Return errors, no eviction (default)
- allkeys-lru: Evict least recently used keys
- allkeys-lfu: Evict least frequently used keys
- allkeys-random: Evict random keys
- volatile-lru: LRU among keys with expiration
- volatile-lfu: LFU among keys with expiration
- volatile-random: Random among keys with expiration
- volatile-ttl: Evict keys with shortest TTL

Configuration:
- Set maxmemory and maxmemory-policy in redis.conf [web:21][web:23]

10. What is Redis pipelining and how does it improve performance?

Redis Pipelining:

- Definition:
  - Technique to send multiple commands to server without waiting for individual replies
  - Commands are buffered and sent in batch

- How it works:
  1. Client queues multiple commands
  2. Sends all commands in single network request
  3. Server processes commands sequentially
  4. Responses sent back in batch
  5. Client reads all responses

- Performance Benefits:
  - Reduces network round-trip time (RTT)
  - Fewer system calls
  - Can achieve 10x+ throughput improvement
  - Example: 100 commands with 1ms RTT
    - Without pipeline: 100ms (100 RTTs)
    - With pipeline: ~1ms (1 RTT)

- Limitations:
  - No atomicity guarantee (use transactions if needed)
  - Commands are independent
  - Large pipelines consume memory buffers

- Use Cases:
  - Bulk data loading
  - Multiple independent operations
  - High-throughput scenarios [web:21][web:23]

11. Explain Redis Transactions (MULTI/EXEC) and their limitations.

Redis Transactions:

- Commands:
  - MULTI: Start transaction block
  - EXEC: Execute all queued commands atomically
  - DISCARD: Cancel transaction
  - WATCH: Optimistic locking on keys

- Characteristics:
  - Atomic execution: All commands executed sequentially without interruption
  - Isolation: No other client commands executed during transaction
  - Commands queued and executed together
  - No rollback on errors

- Example:
  MULTI
  SET key1 "value1"
  INCR counter
  LPUSH list "item"
  EXEC

- WATCH for Optimistic Locking:
  WATCH mykey
  val = GET mykey
  val = val + 1
  MULTI
  SET mykey val
  EXEC
  (EXEC fails if mykey changed after WATCH)

- Limitations:
  - No rollback if command fails during EXEC
  - Can't make decisions based on intermediate results
  - Not as powerful as RDBMS transactions
  - Commands must be known upfront
  - Use Lua scripts for conditional logic [web:21][web:23]

12. What is Redis Pub/Sub and what are its use cases and limitations?

Redis Pub/Sub:

- Concept:
  - Publisher sends messages to channels
  - Subscribers receive messages from channels
  - Decoupled messaging pattern

- Commands:
  - PUBLISH channel message: Send message
  - SUBSCRIBE channel: Subscribe to channel(s)
  - PSUBSCRIBE pattern: Subscribe with pattern matching
  - UNSUBSCRIBE: Unsubscribe from channel(s)

- Use Cases:
  - Real-time notifications and alerts
  - Chat applications
  - Live updates (stock prices, sports scores)
  - Event-driven architectures
  - Broadcast messages to multiple consumers [web:21][web:23]

- Limitations:
  - Fire-and-forget: Messages not stored
  - If no subscribers, messages lost
  - No message persistence or history
  - No acknowledgment mechanism
  - Subscribers must be actively connected
  - Not suitable for reliable messaging or task queues
  - Consider Redis Streams for persistent messaging needs [web:23]

13. How do you implement caching strategies with Redis (cache-aside, write-through, write-behind)?

Caching Strategies:

- Cache-Aside (Lazy Loading):
  1. Application requests data
  2. Check Redis cache
  3. If cache miss: Fetch from database, write to cache
  4. If cache hit: Return cached data
  - Pros: Only requested data cached, simple to implement
  - Cons: Cache miss penalty, stale data possible
  - Use: Read-heavy applications

- Write-Through:
  1. Write to cache and database simultaneously
  2. Cache always consistent with database
  - Pros: Cache always up-to-date, no stale data
  - Cons: Write latency, unnecessary cache writes
  - Use: Write-heavy with consistent reads

- Write-Behind (Write-Back):
  1. Write to cache immediately
  2. Asynchronously write to database later (batched)
  - Pros: Low write latency, reduces database load
  - Cons: Risk of data loss, complexity
  - Use: High write throughput scenarios

- Read-Through:
  - Cache library handles loading from database
  - Application only interacts with cache

- Refresh-Ahead:
  - Proactively refresh cache before expiration
  - Reduces cache misses [web:21]

14. What are Redis Streams and how do they differ from Pub/Sub?

Redis Streams:

- Definition:
  - Append-only log data structure for messaging and event streaming
  - Introduced in Redis 5.0

- Features:
  - Persistent message storage with IDs
  - Consumer groups for parallel processing
  - Message acknowledgment (XACK)
  - Range queries and message replay
  - Blocking reads with XREAD
  - Automatic ID generation (timestamp-sequence)

- Key Commands:
  - XADD: Add entry to stream
  - XREAD: Read from stream
  - XGROUP: Manage consumer groups
  - XACK: Acknowledge processed messages

- Streams vs Pub/Sub:
  - Persistence: Streams persist, Pub/Sub doesn't
  - History: Streams allow replay, Pub/Sub fire-and-forget
  - Acknowledgment: Streams support acks, Pub/Sub doesn't
  - Consumer groups: Streams enable load distribution
  - Reliability: Streams ensure delivery, Pub/Sub can lose messages
  - Use Streams for: Task queues, event sourcing, reliable messaging
  - Use Pub/Sub for: Simple broadcasts, real-time notifications [web:23]

15. Explain the concept of Redis keys, namespaces, and key naming conventions.

Redis Keys:

- Characteristics:
  - Binary-safe strings (any binary sequence)
  - Maximum size: 512 MB (practically much smaller)
  - Keys are unique identifiers for values

- Key Naming Conventions:
  - Use colons for hierarchy: user:1000:profile
  - Schema-like structure: object-type:id:field
  - Examples:
    - session:user:12345
    - cache:product:999:details
    - counter:page:views:homepage
  - Keep keys readable and consistent

- Namespaces:
  - Redis has no native namespaces
  - Simulate with key prefixes
  - Example: app1:users:*, app2:users:*
  - Helps organize keys and avoid collisions

- Best Practices:
  - Use descriptive names
  - Avoid very long keys (waste memory)
  - Avoid very short keys (lose clarity)
  - Balance between readability and size
  - Use consistent delimiter (: common)
  - Consider key expiration policies
  - Use SCAN instead of KEYS for production [web:21][web:23]

16. How do you implement distributed locks with Redis (Redlock algorithm)?

Distributed Locks with Redis:

- Simple Approach (Single Instance):
  - SET key value NX EX timeout
  - NX: Only set if not exists
  - EX: Set expiration (auto-release if client dies)
  - DELETE key to release lock
  - Use unique value (UUID) to ensure only lock owner releases

- Redlock Algorithm (Multiple Instances):
  - For higher reliability across Redis cluster
  - Steps:
    1. Get current timestamp
    2. Try to acquire lock in all N instances sequentially
    3. Use same key and unique value, short timeout
    4. Calculate time elapsed
    5. Lock acquired if:
       - Got lock on majority (N/2 + 1) instances
       - Total time < lock validity time
    6. If failed, release locks on all instances
    7. Use lock, then release on all instances

- Considerations:
  - Set appropriate timeout
  - Handle network failures and timeouts
  - Ensure clock synchronization across nodes
  - Libraries: Redlock-rb, Redlock-py, node-redlock

- Use Cases:
  - Prevent duplicate task execution
  - Ensure single instance of job
  - Coordinate distributed operations [web:21]

17. What is the difference between Redis single-threaded model and multi-threaded I/O?

Redis Threading Model:

- Traditional Single-Threaded:
  - Core command processing in single thread
  - Event-driven, non-blocking I/O
  - Simplicity, no race conditions
  - Commands executed atomically
  - Sequential processing ensures consistency

- Modern Multi-Threaded I/O (Redis 6.0+):
  - Command execution still single-threaded
  - I/O operations (network read/write) multi-threaded
  - Background threads handle:
    - Socket reads
    - Socket writes
    - Encryption/decryption (TLS)
  - Main thread processes commands serially

- Benefits of Multi-threaded I/O:
  - Better utilization of multi-core CPUs
  - Improved throughput for I/O-bound workloads
  - Reduces network bottlenecks
  - Maintains atomicity guarantees

- Configuration:
  - io-threads: Set number of I/O threads
  - io-threads-do-reads: Enable threaded reads

- When to Use:
  - High connection count
  - Large network payloads
  - TLS encryption overhead [web:21]

18. How do you monitor Redis performance and what are the key metrics to track?

Redis Monitoring:

- Key Metrics:
  - Memory:
    - used_memory: Total memory used
    - used_memory_rss: Resident set size
    - mem_fragmentation_ratio: Fragmentation
    - maxmemory setting
  - Performance:
    - instantaneous_ops_per_sec: Throughput
    - hit_rate: Cache hit ratio
    - latency: Response time
  - Connections:
    - connected_clients: Active connections
    - blocked_clients: Clients waiting
  - Persistence:
    - rdb_last_save_time, aof_rewrite_in_progress
  - Replication:
    - connected_slaves, repl_backlog_size
  - Keyspace:
    - Total keys, expired keys, evicted keys

- Monitoring Commands:
  - INFO: Comprehensive server stats
  - MONITOR: Real-time command stream (debug only)
  - SLOWLOG: Slow query log
  - LATENCY: Latency monitoring
  - CLIENT LIST: Connected clients

- Tools:
  - Redis-cli: Built-in CLI
  - Redis-stat: Real-time monitoring
  - RedisInsight: Official GUI
  - Prometheus + Grafana: Time-series monitoring
  - Datadog, New Relic: APM solutions [web:21][web:23]

19. What are Redis Lua scripts and when would you use them?

Redis Lua Scripts:

- Definition:
  - Execute custom Lua scripts atomically on Redis server
  - EVAL and EVALSHA commands

- Features:
  - Atomic execution: Script runs as single operation
  - Server-side logic: Reduces network round trips
  - Access to all Redis commands
  - Can accept arguments (keys and values)
  - Scripts cached with SHA hash

- Syntax:
  EVAL "script" numkeys key1 key2... arg1 arg2...

- Example (atomic increment if value exists):
  EVAL "if redis.call('exists', KEYS[1]) == 1 then
         return redis.call('incr', KEYS[1])
       else return 0 end" 1 mykey

- Use Cases:
  - Complex atomic operations
  - Conditional logic based on data
  - Rate limiting algorithms
  - Distributed lock patterns
  - Data transformations server-side
  - Reduce multiple round trips to single call
  - Implement custom commands

- Best Practices:
  - Keep scripts short and fast
  - Avoid infinite loops
  - Use EVALSHA for frequently used scripts
  - Test scripts thoroughly [web:21][web:23]

20. How do you handle memory management and prevent out-of-memory issues in Redis?

Memory Management Strategies:

- Set maxmemory Limit:
  - Configure maximum memory Redis can use
  - Prevents consuming all system RAM

- Choose Eviction Policy:
  - Configure maxmemory-policy based on use case
  - allkeys-lru: Good general purpose
  - volatile-lru: If using expiration
  - noeviction: If OOM errors acceptable

- Use Expiration:
  - Set TTL on keys with EXPIRE/EXPIREAT
  - Automatic cleanup of old data
  - Reduces memory pressure

- Monitor Memory Usage:
  - Track used_memory, mem_fragmentation_ratio
  - Set alerts for high memory usage

- Optimize Data Structures:
  - Use hashes for objects instead of multiple keys
  - Compress values if possible
  - Use appropriate data types

- Memory Optimization Settings:
  - activerehashing: Spread rehashing over time
  - hash-max-ziplist-entries/value: Optimize small hashes
  - list-max-ziplist-size: Optimize lists

- Scale Horizontally:
  - Use Redis Cluster for sharding
  - Distribute data across multiple nodes

- Regular Maintenance:
  - Clean up unused keys
  - Archive old data to disk/database [web:21][web:23]

21. What is the difference between Redis GET/SET and GETEX/SETEX commands?

Redis String Commands:

- Basic Commands:
  - GET key: Retrieve value
  - SET key value: Set value
  - SET supports options: NX, XX, EX, PX, EXAT, PXAT, GET

- SET with Options:
  - SET key value EX seconds: Set with expiration
  - SET key value PX milliseconds: Millisecond expiration
  - SET key value NX: Only if not exists (like SETNX)
  - SET key value XX: Only if exists
  - SET key value GET: Return old value

- SETEX (deprecated in favor of SET EX):
  - SETEX key seconds value
  - Atomic set with expiration
  - Equivalent to: SET key value EX seconds

- GETEX (Redis 6.2+):
  - GETEX key EX seconds: Get and set expiration
  - GETEX key EXAT timestamp: Get and set expiry at timestamp
  - GETEX key PERSIST: Get and remove expiration
  - Useful for refreshing cache TTL on access

- Other Variants:
  - SETNX: Set if not exists (use SET NX now)
  - GETSET: Get old, set new (use SET GET now)
  - MGET/MSET: Multiple keys operations [web:23]

22. How do you implement rate limiting using Redis?

Rate Limiting Patterns:

- Fixed Window Counter:
  - Key: user:ratelimit:userid:timestamp
  - INCR key, EXPIRE if new
  - Check if count > limit
  - Simple but has boundary issues

- Sliding Window Log:
  - Store timestamps in sorted set
  - ZADD key timestamp timestamp
  - ZREMRANGEBYSCORE to remove old
  - ZCARD to count within window
  - Accurate but memory intensive

- Sliding Window Counter:
  - Hybrid approach
  - Weight current and previous window
  - More accurate than fixed, efficient

- Token Bucket (Lua Script):
  - Track tokens and last refill time
  - Atomic token consumption
  - Smooth rate limiting

- Example (Fixed Window):
  key = "rate:user:" + user_id + ":" + current_minute
  count = INCR key
  if count == 1:
    EXPIRE key 60
  if count > limit:
    reject request

- Libraries:
  - redis-rate-limiter
  - node-rate-limiter-flexible
  - Built-in patterns in frameworks [web:21]

23. What are Redis Sorted Sets and how would you use them for leaderboards or ranking systems?

Redis Sorted Sets (ZSets):

- Characteristics:
  - Collection of unique members with associated scores
  - Members ordered by score
  - O(log N) for add/remove/update
  - Efficient range queries

- Key Commands:
  - ZADD key score member: Add/update member
  - ZRANGE key start stop [WITHSCORES]: Get by rank
  - ZREVRANGE: Get by rank (descending)
  - ZRANK/ZREVRANK: Get member rank
  - ZSCORE: Get member score
  - ZINCRBY: Increment score
  - ZREM: Remove member
  - ZCOUNT: Count in score range

- Leaderboard Implementation:
  key = "leaderboard:game123"
  
  # Update score
  ZADD leaderboard:game123 1500 player1
  ZINCRBY leaderboard:game123 10 player1
  
  # Get top 10
  ZREVRANGE leaderboard:game123 0 9 WITHSCORES
  
  # Get player rank
  ZREVRANK leaderboard:game123 player1
  
  # Get score
  ZSCORE leaderboard:game123 player1
  
  # Get players around user (context)
  ZREVRANK for position
  ZREVRANGE position-5 position+5

- Use Cases:
  - Gaming leaderboards
  - Priority queues
  - Time-series data (timestamp as score)
  - Auto-complete systems
  - Trending content (score = engagement) [web:23][web:26]

24. How do you secure Redis (authentication, encryption, network isolation)?

Redis Security Best Practices:

- Authentication:
  - Set requirepass in redis.conf
  - Clients use AUTH password
  - Use strong, random passwords
  - Redis 6.0+: ACL (Access Control Lists)
    - Multiple users with different permissions
    - Fine-grained command restrictions

- Network Isolation:
  - Bind to specific interfaces: bind 127.0.0.1
  - Don't expose to public internet
  - Use private networks/VPCs
  - Firewall rules: Allow only trusted IPs

- Encryption:
  - TLS/SSL for data in transit (Redis 6.0+)
  - Configure tls-port, tls-cert-file, tls-key-file
  - Encrypt at-rest with disk encryption

- Disable Dangerous Commands:
  - rename-command FLUSHDB ""
  - rename-command FLUSHALL ""
  - rename-command CONFIG "secret-config"

- Run as Unprivileged User:
  - Don't run Redis as root
  - Use dedicated redis user

- Protected Mode:
  - Enabled by default when no password
  - Refuses external connections

- Regular Updates:
  - Keep Redis version up-to-date
  - Apply security patches

- Monitoring and Auditing:
  - Log all connections
  - Monitor for suspicious activity
  - Use Redis ACL logs [web:21][web:23]

25. What are common performance bottlenecks in Redis and how do you troubleshoot them?

Common Bottlenecks and Solutions:

- High CPU Usage:
  - Cause: Expensive commands (KEYS, SMEMBERS on large sets)
  - Solution:
    - Use SCAN instead of KEYS
    - Avoid O(N) commands on large datasets
    - Use pipelining
    - Check SLOWLOG

- Memory Issues:
  - Cause: Memory fragmentation, no eviction
  - Solution:
    - Set maxmemory and eviction policy
    - Restart Redis to defragment
    - Use activedefrag (Redis 4.0+)
    - Monitor used_memory_rss

- High Latency:
  - Cause: Slow commands, network issues, persistence
  - Solution:
    - Enable latency monitoring: LATENCY DOCTOR
    - Use --latency with redis-cli
    - Optimize persistence (AOF appendfsync everysec)
    - Check network bandwidth

- Connection Issues:
  - Cause: Too many connections, timeout
  - Solution:
    - Use connection pooling
    - Increase maxclients
    - Set appropriate timeout values
    - Monitor connected_clients

- Slow Persistence:
  - Cause: Large RDB saves, AOF rewrites
  - Solution:
    - Tune save intervals
    - Use faster disks (SSD)
    - Disable persistence if not needed
    - Schedule maintenance windows

- Replication Lag:
  - Cause: Heavy write load, network latency
  - Solution:
    - Monitor repl_backlog_size
    - Increase repl-backlog-size
    - Optimize network
    - Reduce write load

- Key Distribution (Cluster):
  - Cause: Hot keys, uneven slot distribution
  - Solution:
    - Identify hot keys with --hotkeys
    - Redistribute slots
    - Use hash tags carefully [web:21][web:23]
*/
