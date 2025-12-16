/*
TOP 25 MOST ASKED AND IMPORTANT PROMETHEUS INTERVIEW QUESTIONS
================================================================

SECTION 1: FUNDAMENTALS & ARCHITECTURE
---------------------------------------

1. What is Prometheus and how does it differ from traditional monitoring systems?

2. Explain the architecture of Prometheus and its key components.

3. What is the Prometheus data model and how does it store time series data?

4. What are Prometheus exporters and how do they function?

5. Explain the pull-based scraping model in Prometheus and its advantages.


SECTION 2: PROMQL & QUERYING
-----------------------------

6. Write a query to calculate the average CPU usage over the last 5 minutes.

7. How do you find the top 5 services by memory usage?

8. Write a query to get the 95th percentile of response times for a service.

9. How do you find the HTTP error rate as a percentage of total traffic?

10. Write a query to find the average response time for a specific service over the last 24 hours.


SECTION 3: METRICS & DATA TYPES
--------------------------------

11. Explain the difference between Counter, Gauge, Histogram, and Summary metric types.

12. How do you create custom metrics in Prometheus using client libraries?

13. What is the concept of time series data in Prometheus?

14. Explain the importance of labels in Prometheus metrics and how they can be used effectively.

15. How do you handle high cardinality metrics in Prometheus?


SECTION 4: ALERTING & NOTIFICATIONS
------------------------------------

16. How do you set up alerting rules in Prometheus?

17. What is Alertmanager and how does it integrate with Prometheus?

18. How would you handle alerting in Prometheus to avoid alert fatigue?

19. Explain how to configure notification channels in Alertmanager.


SECTION 5: INTEGRATION & DEPLOYMENT
------------------------------------

20. How do you configure Prometheus to scrape metrics from a Kubernetes cluster?

21. What is service discovery in Prometheus and why is it important?

22. What is a Prometheus scrape configuration and how do you set it up?

23. How does Grafana integrate with Prometheus for visualization?

24. How do you install and deploy Prometheus on a Linux server?


SECTION 6: PERFORMANCE & OPTIMIZATION
--------------------------------------

25. How do you manage Prometheus data retention and storage?

* /




/*
TOP 25 PROMETHEUS INTERVIEW QUESTIONS WITH ANSWERS
===================================================

SECTION 1: FUNDAMENTALS & ARCHITECTURE
---------------------------------------

1. What is Prometheus and how does it differ from traditional monitoring systems?

ANSWER:
Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability.
Key differences from traditional systems:
- Pull-based model (Prometheus scrapes targets) vs push-based
- Multi-dimensional data model with labels
- Powerful query language (PromQL)
- No dependency on distributed storage
- Built-in service discovery
- Designed for dynamic cloud environments


2. Explain the architecture of Prometheus and its key components.

ANSWER:
Key components:
- Prometheus Server: Scrapes and stores time series data
- Time Series Database: Stores metrics data locally
- Exporters: Expose metrics from third-party systems
- Pushgateway: Allows short-lived jobs to push metrics
- Alertmanager: Handles alerts and notifications
- PromQL: Query language for data retrieval
- Service Discovery: Automatically discovers targets (Kubernetes, Consul, etc.)


3. What is the Prometheus data model and how does it store time series data?

ANSWER:
Data Model:
- Metric name + set of key-value pairs (labels) = time series
- Format: <metric_name>{<label_name>=<label_value>, ...}
- Example: http_requests_total{method="GET", handler="/api", status="200"}

Storage:
- Stores data in local time series database
- Data organized in chunks (2-hour blocks)
- Uses compression for efficient storage
- Each unique combination of labels creates a separate time series


4. What are Prometheus exporters and how do they function?

ANSWER:
Exporters are programs that:
- Expose metrics from third-party systems in Prometheus format
- Run as HTTP servers on /metrics endpoint
- Convert system-specific metrics to Prometheus format

Common exporters:
- node_exporter: Hardware and OS metrics
- blackbox_exporter: Probing of endpoints
- mysqld_exporter: MySQL metrics
- postgres_exporter: PostgreSQL metrics
- Custom exporters: Application-specific metrics


5. Explain the pull-based scraping model in Prometheus and its advantages.

ANSWER:
Pull-based model:
- Prometheus actively pulls metrics from targets at configured intervals
- Targets expose metrics via HTTP endpoints
- Scrape interval defined in prometheus.yml

Advantages:
- Centralized control over monitoring
- Easy to detect if target is down
- Can run multiple Prometheus servers scraping same targets
- No need to configure targets with server address
- Better for debugging (can manually curl /metrics endpoint)
- Prevents overloading monitoring system


SECTION 2: PROMQL & QUERYING
-----------------------------

6. Write a query to calculate the average CPU usage over the last 5 minutes.

ANSWER:
* /
// Basic average CPU usage
avg(rate(node_cpu_seconds_total[5m])) * 100

// Average CPU usage excluding idle
avg(rate(node_cpu_seconds_total{mode!="idle"}[5m])) * 100

// Per-instance CPU usage
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
/*


7. How do you find the top 5 services by memory usage?

ANSWER:
* /
// Top 5 services by memory usage
topk(5, sum by (service) (process_resident_memory_bytes))

// Top 5 containers by memory usage
topk(5, container_memory_usage_bytes{container!=""})

// Top 5 with percentage
topk(5, (container_memory_usage_bytes / container_spec_memory_limit_bytes) * 100)
/*


8. Write a query to get the 95th percentile of response times for a service.

ANSWER:
* /
// Using histogram_quantile with histogram metric
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

// For specific service
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket{service="api"}[5m])) by (le)
)

// With grouping by endpoint
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint)
)
/*


9. How do you find the HTTP error rate as a percentage of total traffic?

ANSWER:
* /
// Error rate (5xx errors)
sum(rate(http_requests_total{status=~"5.."}[5m])) / 
sum(rate(http_requests_total[5m])) * 100

// 4xx and 5xx error rate
sum(rate(http_requests_total{status=~"[45].."}[5m])) / 
sum(rate(http_requests_total[5m])) * 100

// Per service error rate
sum by (service) (rate(http_requests_total{status=~"5.."}[5m])) /
sum by (service) (rate(http_requests_total[5m])) * 100
/*


10. Write a query to find the average response time for a specific service over the last 24 hours.

ANSWER:
* /
// Average response time using histogram
rate(http_request_duration_seconds_sum{service="api"}[24h]) /
rate(http_request_duration_seconds_count{service="api"}[24h])

// Average response time by endpoint
sum by (endpoint) (rate(http_request_duration_seconds_sum{service="api"}[24h])) /
sum by (endpoint) (rate(http_request_duration_seconds_count{service="api"}[24h]))
/*


SECTION 3: METRICS & DATA TYPES
--------------------------------

11. Explain the difference between Counter, Gauge, Histogram, and Summary metric types.

ANSWER:

COUNTER:
- Cumulative metric that only increases (resets to 0 on restart)
- Use cases: Request counts, error counts, tasks completed
- Query with rate() or increase()
- Example: http_requests_total

GAUGE:
- Can go up or down
- Use cases: Temperature, memory usage, concurrent requests
- Query directly or with aggregation
- Example: node_memory_available_bytes

HISTOGRAM:
- Samples observations and counts them in configurable buckets
- Automatically creates _bucket, _sum, _count metrics
- Use cases: Request duration, response sizes
- Query with histogram_quantile()
- Example: http_request_duration_seconds

SUMMARY:
- Similar to histogram but calculates quantiles on client side
- Creates _sum, _count, and quantile metrics
- Cannot aggregate across instances
- Use cases: Pre-calculated percentiles
- Example: rpc_duration_seconds{quantile="0.95"}


12. How do you create custom metrics in Prometheus using client libraries?

ANSWER (Node.js/JavaScript example):
* /
const client = require('prom-client');

// Create a Counter
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// Create a Gauge
const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

// Create a Histogram
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

// Using the metrics
httpRequestsTotal.inc({ method: 'GET', route: '/api', status: '200' });
activeConnections.set(42);
httpRequestDuration.observe({ method: 'POST', route: '/api' }, 0.234);

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
/*


13. What is the concept of time series data in Prometheus?

ANSWER:
Time series is:
- Stream of timestamped values belonging to same metric and label set
- Uniquely identified by metric name and label combinations
- Each unique label combination creates a new time series

Example:
http_requests_total{method="GET", handler="/api"} -> Time Series 1
http_requests_total{method="POST", handler="/api"} -> Time Series 2
http_requests_total{method="GET", handler="/users"} -> Time Series 3

Structure:
- Metric name: http_requests_total
- Labels: {method="GET", handler="/api"}
- Samples: [(timestamp1, value1), (timestamp2, value2), ...]

Storage:
- Each sample contains: 64-bit float value + millisecond-precision timestamp
- Stored efficiently using compression


14. Explain the importance of labels in Prometheus metrics and how they can be used effectively.

ANSWER:

Importance:
- Enable multi-dimensional data model
- Allow filtering and aggregation in queries
- Same metric name with different labels = different time series

Best Practices:
- Use labels for dimensions you want to aggregate/filter by
- Keep cardinality low (avoid user IDs, IP addresses as labels)
- Use consistent naming (snake_case)
- Don't overuse labels (each combination = new time series)

Good label usage:
* /
http_requests_total{method="GET", handler="/api", status="200"}
/*

Bad label usage (high cardinality):
* /
http_requests_total{user_id="12345", ip="192.168.1.1"}  // DON'T DO THIS
/*

Effective querying with labels:
* /
sum by (status) (rate(http_requests_total[5m]))  // Group by status
http_requests_total{method="POST", status=~"5.."}  // Filter specific labels
/*


15. How do you handle high cardinality metrics in Prometheus?

ANSWER:

Strategies:

1. Avoid using high-cardinality data as labels
   - Don't use: user_ids, email addresses, IP addresses, session IDs
   - Use: status codes, HTTP methods, service names

2. Use metric relabeling to drop unnecessary labels:
* /
// In prometheus.yml
metric_relabel_configs:
  - source_labels: [__name__]
    regex: 'expensive_metric_.*'
    action: drop
/*

3. Limit scrape targets and intervals

4. Use recording rules to pre-aggregate:
* /
// recording_rules.yml
groups:
  - name: aggregated_metrics
    interval: 30s
    rules:
      - record: instance:requests:rate5m
        expr: sum(rate(http_requests_total[5m])) by (instance)
/*

5. Set retention policies to limit storage

6. Use hashmod relabeling for sampling:
* /
relabel_configs:
  - source_labels: [__address__]
    modulus: 10
    target_label: __tmp_hash
  - source_labels: [__tmp_hash]
    regex: "^[01]$"
    action: keep
/*


SECTION 4: ALERTING & NOTIFICATIONS
------------------------------------

16. How do you set up alerting rules in Prometheus?

ANSWER:

Step 1: Create alert rules file (alert_rules.yml):
* /
groups:
  - name: example_alerts
    interval: 30s
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is {{ $value }}%"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.instance }} is down"

      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
        for: 3m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }}"
/*

Step 2: Add to prometheus.yml:
* /
rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']
/*


17. What is Alertmanager and how does it integrate with Prometheus?

ANSWER:

Alertmanager:
- Separate component that handles alerts sent by Prometheus
- Manages deduplication, grouping, routing, and silencing
- Sends notifications via email, Slack, PagerDuty, webhooks, etc.

Integration:
1. Prometheus evaluates alert rules
2. Sends firing alerts to Alertmanager
3. Alertmanager processes and routes alerts
4. Notifications sent to configured receivers

Configuration (alertmanager.yml):
* /
global:
  resolve_timeout: 5m

route:
  group_by: ['alertname', 'cluster']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'team-email'
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty'

receivers:
  - name: 'team-email'
    email_configs:
      - to: 'team@example.com'
        from: 'alertmanager@example.com'
        smarthost: 'smtp.gmail.com:587'
        auth_username: 'alertmanager@example.com'
        auth_password: 'password'

  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_KEY'
/*


18. How would you handle alerting in Prometheus to avoid alert fatigue?

ANSWER:

Strategies:

1. Use appropriate thresholds and 'for' duration:
* /
- alert: HighCPU
  expr: cpu_usage > 80
  for: 10m  // Wait 10 minutes before firing
/*

2. Group related alerts:
* /
route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 30s
  group_interval: 5m
/*

3. Use severity levels:
* /
labels:
  severity: warning  // or critical, info
/*

4. Implement proper routing:
* /
routes:
  - match:
      severity: critical
    receiver: 'pagerduty'
    repeat_interval: 1h
  - match:
      severity: warning
    receiver: 'slack'
    repeat_interval: 24h
/*

5. Use inhibition rules to suppress dependent alerts:
* /
inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['instance']
/*

6. Implement silences for maintenance:
* /
// Via amtool or Alertmanager UI
/*

7. Create actionable alerts with clear descriptions:
* /
annotations:
  summary: "Database {{ $labels.instance }} is down"
  description: "Run: kubectl describe pod {{ $labels.pod }}"
  runbook_url: "https://wiki.example.com/runbooks/db-down"
/*


19. Explain how to configure notification channels in Alertmanager.

ANSWER:

Common notification channels:

1. Email:
* /
receivers:
  - name: 'email-team'
    email_configs:
      - to: 'team@example.com'
        from: 'alerts@example.com'
        smarthost: 'smtp.gmail.com:587'
        auth_username: 'alerts@example.com'
        auth_password: 'password'
        headers:
          Subject: 'Alert: {{ .GroupLabels.alertname }}'
/*

2. Slack:
* /
receivers:
  - name: 'slack-notifications'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'
        channel: '#alerts'
        title: '{{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
/*

3. PagerDuty:
* /
receivers:
  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: 'YOUR_SERVICE_KEY'
        description: '{{ .GroupLabels.alertname }}'
/*

4. Webhook:
* /
receivers:
  - name: 'webhook-receiver'
    webhook_configs:
      - url: 'http://example.com/webhook'
        send_resolved: true
/*

5. Multiple channels:
* /
receivers:
  - name: 'multi-channel'
    email_configs:
      - to: 'team@example.com'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/XXX'
        channel: '#alerts'
    pagerduty_configs:
      - service_key: 'YOUR_KEY'
/*


SECTION 5: INTEGRATION & DEPLOYMENT
------------------------------------

20. How do you configure Prometheus to scrape metrics from a Kubernetes cluster?

ANSWER:

Configuration in prometheus.yml:
* /
scrape_configs:
  # Scrape Kubernetes nodes
  - job_name: 'kubernetes-nodes'
    kubernetes_sd_configs:
      - role: node
    relabel_configs:
      - source_labels: [__address__]
        regex: '(.*):10250'
        replacement: '${1}:9100'
        target_label: __address__
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)

  # Scrape Kubernetes pods
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)

  # Scrape Kubernetes services
  - job_name: 'kubernetes-services'
    kubernetes_sd_configs:
      - role: service
    metrics_path: /metrics
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
        action: keep
        regex: true
/*

Pod annotation for automatic discovery:
* /
apiVersion: v1
kind: Pod
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "8080"
    prometheus.io/path: "/metrics"
/*


21. What is service discovery in Prometheus and why is it important?

ANSWER:

Service Discovery:
- Automatic mechanism to discover and monitor targets dynamically
- Eliminates manual configuration of scrape targets
- Essential for dynamic environments (cloud, Kubernetes)

Supported service discovery mechanisms:
- kubernetes_sd_config: Kubernetes services/pods/nodes
- consul_sd_config: Consul services
- ec2_sd_config: AWS EC2 instances
- azure_sd_config: Azure VMs
- dns_sd_config: DNS SRV records
- file_sd_config: File-based discovery (JSON/YAML)

Importance:
- Automatically adapts to infrastructure changes
- Scales with dynamic environments
- Reduces manual configuration errors
- Supports ephemeral workloads

Example with file-based discovery:
* /
// prometheus.yml
scrape_configs:
  - job_name: 'file-sd'
    file_sd_configs:
      - files:
          - 'targets/*.json'
        refresh_interval: 30s

// targets/app.json
[
  {
    "targets": ["localhost:9090", "localhost:9091"],
    "labels": {
      "job": "application",
      "env": "production"
    }
  }
]
/*


22. What is a Prometheus scrape configuration and how do you set it up?

ANSWER:

Scrape configuration defines how Prometheus collects metrics from targets.

Basic scrape config (prometheus.yml):
* /
global:
  scrape_interval: 15s      // How often to scrape targets
  evaluation_interval: 15s  // How often to evaluate rules
  scrape_timeout: 10s       // Timeout for scrape requests

scrape_configs:
  # Simple static configuration
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node exporter with labels
  - job_name: 'node-exporter'
    static_configs:
      - targets: 
          - 'node1:9100'
          - 'node2:9100'
        labels:
          env: 'production'
          region: 'us-west'

  # Custom scrape interval and path
  - job_name: 'custom-app'
    scrape_interval: 30s
    scrape_timeout: 10s
    metrics_path: '/custom/metrics'
    static_configs:
      - targets: ['app:8080']

  # With relabeling
  - job_name: 'app-with-relabel'
    static_configs:
      - targets: ['app:8080']
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
        replacement: 'my-app-instance'

  # With basic auth
  - job_name: 'secured-app'
    static_configs:
      - targets: ['secure-app:8080']
    basic_auth:
      username: 'admin'
      password: 'secret'

  # With TLS
  - job_name: 'tls-app'
    scheme: https
    tls_config:
      ca_file: /etc/prometheus/ca.crt
      cert_file: /etc/prometheus/client.crt
      key_file: /etc/prometheus/client.key
    static_configs:
      - targets: ['secure-app:8443']
/*


23. How does Grafana integrate with Prometheus for visualization?

ANSWER:

Integration steps:

1. Add Prometheus as data source in Grafana:
   - Go to Configuration > Data Sources
   - Click "Add data source"
   - Select Prometheus
   - URL: http://prometheus:9090
   - Click "Save & Test"

2. Create dashboard with PromQL queries:
   - Create new dashboard
   - Add panel
   - Select Prometheus data source
   - Write PromQL query

Example dashboard queries:
* /
// CPU usage panel
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

// Memory usage panel
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / 
node_memory_MemTotal_bytes * 100

// Request rate panel
sum(rate(http_requests_total[5m])) by (service)

// Error rate panel
sum(rate(http_requests_total{status=~"5.."}[5m])) / 
sum(rate(http_requests_total[5m])) * 100
/*

3. Use variables for dynamic dashboards:
* /
// Variable: $instance
Query: label_values(up, instance)

// Use in query:
rate(http_requests_total{instance="$instance"}[5m])
/*

4. Configure alerts in Grafana:
   - Set alert conditions using PromQL
   - Configure notification channels
   - Alerts sent via Grafana Alerting (alternative to Alertmanager)

Benefits:
- Rich visualization options (graphs, gauges, heatmaps)
- Template variables for dynamic dashboards
- Dashboard sharing and versioning
- Multi-data source support


24. How do you install and deploy Prometheus on a Linux server?

ANSWER:

Method 1: Binary installation
* /
// Download
wget https://github.com/prometheus/prometheus/releases/download/v2.45.0/prometheus-2.45.0.linux-amd64.tar.gz

// Extract
tar xvfz prometheus-2.45.0.linux-amd64.tar.gz
cd prometheus-2.45.0.linux-amd64

// Create prometheus.yml
cat > prometheus.yml << EOF
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
EOF

// Run Prometheus
./prometheus --config.file=prometheus.yml
/*

Method 2: Using systemd service
* /
// Create user
sudo useradd --no-create-home --shell /bin/false prometheus

// Create directories
sudo mkdir -p /etc/prometheus /var/lib/prometheus

// Copy files
sudo cp prometheus promtool /usr/local/bin/
sudo cp -r consoles/ console_libraries/ /etc/prometheus/
sudo cp prometheus.yml /etc/prometheus/

// Set ownership
sudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus
sudo chown prometheus:prometheus /usr/local/bin/{prometheus,promtool}

// Create systemd service
sudo cat > /etc/systemd/system/prometheus.service << EOF
[Unit]
Description=Prometheus
After=network.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/var/lib/prometheus/ \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
EOF

// Start service
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
sudo systemctl status prometheus
/*

Method 3: Docker deployment
* /
// Run Prometheus container
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
  -v prometheus-data:/prometheus \
  prom/prometheus

// Docker Compose
/*
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

volumes:
  prometheus-data:
* /
/*

Access: http://localhost:9090


SECTION 6: PERFORMANCE & OPTIMIZATION
--------------------------------------

25. How do you manage Prometheus data retention and storage?

ANSWER:

Configuration options:

1. Retention by time:
* /
// Command line flag
--storage.tsdb.retention.time=15d  // Keep data for 15 days (default)

// systemd service
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.retention.time=30d
/*

2. Retention by size:
* /
--storage.tsdb.retention.size=50GB  // Keep max 50GB of data
/*

3. Both time and size (whichever limit hits first):
* /
--storage.tsdb.retention.time=30d \
--storage.tsdb.retention.size=100GB
/*

4. Configure storage path:
* /
--storage.tsdb.path=/var/lib/prometheus/
/*

5. Optimize with recording rules (pre-aggregate data):
* /
groups:
  - name: aggregate_metrics
    interval: 1m
    rules:
      - record: instance:node_cpu:avg_rate5m
        expr: avg(rate(node_cpu_seconds_total[5m])) by (instance)
      
      - record: job:http_requests:rate5m
        expr: sum(rate(http_requests_total[5m])) by (job)
/*

6. Remote storage for long-term retention:
* /
// prometheus.yml
remote_write:
  - url: "http://remote-storage:9201/write"
    queue_config:
      capacity: 10000
      max_shards: 50

remote_read:
  - url: "http://remote-storage:9201/read"
/*

7. Block size configuration:
* /
--storage.tsdb.min-block-duration=2h  // Minimum block duration
--storage.tsdb.max-block-duration=36h // Maximum block duration
/*

8. Monitor storage usage:
* /
// Query to check storage size
prometheus_tsdb_storage_blocks_bytes

// Query to check time series count
prometheus_tsdb_head_series
/*

Best practices:
- Use recording rules to reduce query load
- Implement appropriate retention based on requirements
- Monitor cardinality to prevent excessive time series
- Use remote storage for long-term data
- Regular backup of /var/lib/prometheus/
- Monitor disk usage and IOPS

Disk space estimation:
needed_disk_space = retention_time_seconds * ingested_samples_per_second * bytes_per_sample
bytes_per_sample ≈ 1-2 bytes (with compression)

*/
