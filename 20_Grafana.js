/*
TOP 25 MOST ASKED AND IMPORTANT GRAFANA INTERVIEW QUESTIONS
===========================================================

SECTION 1: FUNDAMENTALS & ARCHITECTURE
--------------------------------------

1. What is Grafana and how does it differ from other visualization and monitoring tools?

2. Explain Grafana’s architecture and main components.

3. What are data sources in Grafana and which types are most commonly used?

4. How does Grafana connect to Prometheus and what configuration steps are required?

5. What are organizations, users, and roles in Grafana, and how is access control managed?


SECTION 2: DASHBOARDS & PANELS
-------------------------------

6. How do you create a dashboard in Grafana and what are the key elements of a dashboard?

7. What are panels in Grafana and what different panel types are available?

8. How do you use variables (templating) in Grafana dashboards and why are they useful?

9. Explain how to use time range controls and refresh intervals effectively in Grafana.

10. How do you design a good production-ready dashboard (best practices and common pitfalls)?


SECTION 3: QUERIES & TRANSFORMATIONS
-------------------------------------

11. How do you write queries in Grafana for Prometheus, and what are some common PromQL patterns?

12. What are transformations in Grafana and when would you use them?

13. How do you handle multiple data sources on a single dashboard?

14. How do you use query variables and chained variables in Grafana?

15. How do you optimize queries in Grafana to avoid performance issues?


SECTION 4: ALERTING & NOTIFICATIONS
------------------------------------

16. What is Grafana Alerting and how does it differ from Prometheus Alertmanager?

17. How do you create and configure an alert rule on a panel in Grafana?

18. What are contact points and notification policies in Grafana’s unified alerting?

19. How do you manage and silence alerts in Grafana?

20. How would you choose between using Grafana alerts vs Prometheus Alertmanager for a project?


SECTION 5: SECURITY, ADMIN & INTEGRATION
-----------------------------------------

21. How do you manage user authentication in Grafana (local users, LDAP, OAuth, SSO)?

22. How do you back up and migrate Grafana dashboards and configuration between environments?

23. What are folder permissions in Grafana and how do you use them to secure dashboards?

24. How can you provision data sources and dashboards as code in Grafana?

25. How do you integrate Grafana with Kubernetes or cloud-native environments for observability?

* /





/*
TOP 25 GRAFANA INTERVIEW QUESTIONS WITH ANSWERS
================================================

SECTION 1: FUNDAMENTALS & ARCHITECTURE
--------------------------------------

1. What is Grafana and how does it differ from other visualization and monitoring tools?

ANSWER:
Grafana is an open-source platform for monitoring, visualization, and observability.

Key differences from other tools:
- Multi-data source support (Prometheus, InfluxDB, MySQL, Elasticsearch, etc.)
- Highly customizable dashboards with drag-and-drop interface
- Extensive plugin ecosystem (panels, data sources, apps)
- Strong community and enterprise support
- Better visualization options than native monitoring tools
- Cloud-native and self-hosted deployment options
- Free and open-source (unlike Datadog, New Relic)
- Focus on visualization vs monitoring (unlike Prometheus which focuses on metrics collection)

Key features:
- Interactive dashboards
- Alerting and notifications
- Template variables
- Annotations
- Dashboard sharing and collaboration


2. Explain Grafana's architecture and main components.

ANSWER:

Main components:

1. Frontend (Browser):
   - Angular/React-based UI
   - Dashboard rendering engine
   - Query editor
   - Panel visualization

2. Backend (HTTP Server):
   - Written in Go
   - API endpoints
   - Query processing
   - User authentication
   - Alerting engine

3. Database (SQLite/MySQL/PostgreSQL):
   - Dashboard definitions
   - User data
   - Organizations
   - Data source configurations
   - Alert rules

4. Data Sources:
   - Plugins that connect to external systems
   - Query translation layer
   - Time series databases (Prometheus, InfluxDB)
   - SQL databases (MySQL, PostgreSQL)
   - Cloud services (CloudWatch, Azure Monitor)

5. Plugin System:
   - Panel plugins (visualization types)
   - Data source plugins
   - App plugins (complete applications)

Data Flow:
User → Frontend → Backend API → Data Source Plugin → External Data Source → Backend → Frontend → User


3. What are data sources in Grafana and which types are most commonly used?

ANSWER:

Data sources are backends that Grafana queries to retrieve data for visualization.

Common data source types:

Time Series Databases:
- Prometheus (most popular for metrics)
- InfluxDB
- Graphite
- TimescaleDB

SQL Databases:
- MySQL
- PostgreSQL
- Microsoft SQL Server

Cloud Monitoring:
- AWS CloudWatch
- Azure Monitor
- Google Cloud Monitoring

Logging & Tracing:
- Loki (Grafana's log aggregation)
- Elasticsearch
- Jaeger (distributed tracing)
- Tempo (distributed tracing)

Other:
- JSON API
- CSV
- TestData (for testing)

Adding a data source:
- Navigate to Configuration → Data Sources
- Click "Add data source"
- Select type and configure connection details
- Test connection
- Save


4. How does Grafana connect to Prometheus and what configuration steps are required?

ANSWER:

Configuration steps:

1. Add Prometheus data source:
   Configuration → Data Sources → Add data source → Prometheus

2. Configure connection:
* /
Name: Prometheus
URL: http://prometheus:9090  // or localhost:9090
Access: Server (default) or Browser
Basic Auth: Optional
Scrape interval: 15s (should match Prometheus config)
Query timeout: 60s
HTTP Method: POST (recommended for long queries)
/*

3. Advanced settings (optional):
* /
Custom query parameters
Headers
TLS/SSL configuration
Prometheus type: Prometheus or Cortex/Thanos
/*

4. Test and save:
   - Click "Save & Test"
   - Should see "Data source is working"

5. Use in dashboard:
   - Create new panel
   - Select Prometheus as data source
   - Write PromQL query
* /
rate(http_requests_total[5m])
/*

Configuration as code (provisioning):
* /
// /etc/grafana/provisioning/datasources/prometheus.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    jsonData:
      timeInterval: 15s
      queryTimeout: 60s
      httpMethod: POST
    editable: false
/*


5. What are organizations, users, and roles in Grafana, and how is access control managed?

ANSWER:

Organizations:
- Isolated tenants within a single Grafana instance
- Separate dashboards, data sources, and users
- User can belong to multiple organizations
- Each org has its own resources

Users:
- Individual accounts with email/username
- Can have different roles in different organizations
- Global admin users can manage all organizations

Roles (within organization):

1. Viewer:
   - View dashboards
   - Cannot edit or save
   - Cannot create dashboards

2. Editor:
   - Create and edit dashboards
   - Create playlists
   - Cannot change data sources or users

3. Admin:
   - All Editor permissions
   - Add/edit data sources
   - Add/remove organization users
   - Manage organization settings

4. Server Admin (global):
   - Manage all organizations
   - Create organizations
   - Manage all users
   - Change server settings

Access control examples:
* /
// Set user role in organization
PUT /api/orgs/1/users/2
{
  "role": "Editor"
}

// Create organization
POST /api/orgs
{
  "name": "Production Team"
}

// Add user to organization
POST /api/orgs/1/users
{
  "loginOrEmail": "user@example.com",
  "role": "Viewer"
}
/*

Additional features (Enterprise):
- Team-based permissions
- Folder permissions
- Dashboard permissions
- Data source permissions
- Fine-grained access control (RBAC)


SECTION 2: DASHBOARDS & PANELS
-------------------------------

6. How do you create a dashboard in Grafana and what are the key elements of a dashboard?

ANSWER:

Creating a dashboard:

1. Manual creation:
   - Click "+" → Dashboard
   - Click "Add new panel"
   - Configure query and visualization
   - Click "Apply"
   - Click "Save dashboard"
   - Provide name and folder

2. Import existing dashboard:
   - Click "+" → Import
   - Upload JSON or enter dashboard ID from grafana.com
   - Select data source
   - Import

Key elements of a dashboard:

1. Panels:
   - Visualization components (graphs, tables, stats)
   - Each panel contains one or more queries

2. Rows:
   - Containers for organizing panels
   - Can collapse/expand
   - Logical grouping

3. Variables (Templates):
   - Dynamic values (dropdowns, text boxes)
   - Make dashboards reusable
* /
$instance, $service, $environment
/*

4. Time Range Picker:
   - Controls time window for all panels
   - Relative (last 1h, 3h, 24h) or absolute

5. Refresh Rate:
   - Auto-refresh interval
   - 5s, 10s, 30s, 1m, etc.

6. Dashboard Settings:
   - Name, tags, folder
   - Variables
   - Links
   - Annotations
   - JSON model

7. Annotations:
   - Event markers on graphs
   - Deployments, incidents, etc.

Dashboard JSON structure:
* /
{
  "dashboard": {
    "title": "System Monitoring",
    "tags": ["prometheus", "system"],
    "timezone": "browser",
    "panels": [...],
    "templating": {
      "list": [...]
    },
    "time": {
      "from": "now-6h",
      "to": "now"
    },
    "refresh": "30s"
  }
}
/*


7. What are panels in Grafana and what different panel types are available?

ANSWER:

Panels are building blocks of dashboards - individual visualization components.

Common panel types:

1. Time Series (Graph):
   - Line, bar, or points visualization
   - Multiple series on same graph
   - Best for: Metrics over time
* /
rate(http_requests_total[5m])
/*

2. Stat:
   - Single value with optional sparkline
   - Color thresholds
   - Best for: Current status, KPIs

3. Gauge:
   - Radial or linear gauge
   - Shows value within min/max range
   - Best for: Percentage, capacity

4. Bar Chart:
   - Horizontal or vertical bars
   - Best for: Comparing values

5. Table:
   - Tabular data display
   - Sortable columns
   - Best for: Logs, lists, detailed data

6. Heatmap:
   - Color-coded matrix
   - Best for: Distribution over time

7. Pie Chart:
   - Circular chart showing proportions
   - Best for: Part-to-whole relationships

8. Text:
   - Markdown or HTML content
   - Best for: Documentation, instructions

9. Logs:
   - Log viewer (works with Loki)
   - Best for: Application logs

10. Alert List:
    - Shows active alerts
    - Best for: Alert dashboard

11. Dashboard List:
    - Links to other dashboards
    - Best for: Navigation

12. News:
    - RSS feed display
    - Best for: Status updates

Panel configuration example:
* /
{
  "type": "timeseries",
  "title": "CPU Usage",
  "targets": [
    {
      "expr": "rate(node_cpu_seconds_total[5m])",
      "legendFormat": "{{instance}}"
    }
  ],
  "fieldConfig": {
    "defaults": {
      "unit": "percent",
      "thresholds": {
        "steps": [
          { "value": 0, "color": "green" },
          { "value": 70, "color": "yellow" },
          { "value": 90, "color": "red" }
        ]
      }
    }
  }
}
/*


8. How do you use variables (templating) in Grafana dashboards and why are they useful?

ANSWER:

Variables make dashboards dynamic and reusable by allowing users to select values.

Variable types:

1. Query variable (most common):
* /
// Get list of instances from Prometheus
label_values(up, instance)

// Get list of services
label_values(http_requests_total, service)

// Get metrics matching pattern
metrics(node_cpu_*)
/*

2. Custom variable:
* /
// Comma-separated values
prod, staging, dev
/*

3. Text box:
   - User enters custom value

4. Constant:
   - Hidden variable with fixed value

5. Data source:
   - Select from available data sources

6. Interval:
   - Time interval selection

Creating a variable:

Dashboard Settings → Variables → Add variable

* /
Name: instance
Type: Query
Data source: Prometheus
Query: label_values(up, instance)
Refresh: On Dashboard Load
Multi-value: true (allows selecting multiple)
Include All option: true
/*

Using variables in queries:
* /
// Single value
rate(http_requests_total{instance="$instance"}[5m])

// Multi-value with regex
rate(http_requests_total{instance=~"$instance"}[5m])

// All values
rate(http_requests_total{instance=~".*"}[5m])

// In panel title
CPU Usage - $instance

// Chained variables (dependent)
// Variable 1: region
label_values(up, region)

// Variable 2: instance (depends on region)
label_values(up{region="$region"}, instance)
/*

Benefits:
- Single dashboard for multiple environments/services
- Reduces dashboard sprawl
- Better user experience
- Easier maintenance


9. Explain how to use time range controls and refresh intervals effectively in Grafana.

ANSWER:

Time Range Controls:

1. Dashboard-level (top-right corner):
   - Applies to all panels by default
   - Relative ranges: Last 5m, 15m, 1h, 6h, 24h, 7d, 30d
   - Absolute ranges: Custom start/end times
   - Quick ranges dropdown

2. Panel-level override:
* /
{
  "timeFrom": "now-1h",  // Override dashboard time
  "timeShift": "1d"      // Shift time back by 1 day
}
/*

3. Using time in queries:
* /
// Prometheus automatically uses selected time range
rate(http_requests_total[5m])

// Compare with previous period
rate(http_requests_total[5m] offset 1d)
/*

Refresh Intervals:

1. Dashboard refresh (top-right):
   - Off, 5s, 10s, 30s, 1m, 5m, 15m, 30m, 1h, 2h, 1d
   - Auto-refresh when enabled

2. Configuration:
* /
// Dashboard JSON
{
  "refresh": "30s",
  "time": {
    "from": "now-6h",
    "to": "now"
  }
}
/*

Best practices:

1. Production monitoring:
   - Time range: Last 1h or 6h
   - Refresh: 30s to 1m

2. Troubleshooting:
   - Time range: Last 15m or 30m
   - Refresh: 5s to 10s

3. Historical analysis:
   - Time range: Last 7d or 30d
   - Refresh: Off or 5m

4. Real-time monitoring:
   - Time range: Last 5m or 15m
   - Refresh: 5s

5. Performance considerations:
   - Longer refresh for complex queries
   - Shorter time ranges for high-resolution data
   - Use $__interval variable for automatic step sizing

URL parameters for time:
* /
// Set time range via URL
?from=now-1h&to=now

// Set refresh
?refresh=30s

// Combine
?from=now-6h&to=now&refresh=1m
/*


10. How do you design a good production-ready dashboard (best practices and common pitfalls)?

ANSWER:

Best Practices:

1. Dashboard Organization:
   - Use rows to group related panels
   - Logical top-to-bottom flow
   - Most important metrics at the top
   - Follow observability patterns (RED, USE, Four Golden Signals)

2. Naming and Documentation:
   - Clear, descriptive dashboard names
   - Add text panels for context
   - Use panel titles and descriptions
   - Add links to runbooks/documentation

3. Visualization Selection:
   - Time series for trends
   - Stat panels for current values
   - Gauges for capacity/thresholds
   - Tables for detailed breakdowns

4. Query Optimization:
   - Use recording rules for expensive queries
   - Appropriate scrape intervals
   - Limit time range for heavy queries
* /
// Use $__interval for automatic step sizing
rate(metric[$__interval])

// Use $__range for range-based queries
increase(metric[$__range])
/*

5. Variables Usage:
   - Environment, region, service variables
   - Enable multi-value selection
   - Chain variables logically
   - Hide variables not needed by users

6. Thresholds and Colors:
   - Consistent color scheme
   - Green (good), yellow (warning), red (critical)
   - Meaningful thresholds based on SLOs

7. Alerting Integration:
   - Visual alert state indicators
   - Alert list panel on dashboard
   - Link to alert rules

Common Pitfalls to Avoid:

1. Dashboard Sprawl:
   - Too many similar dashboards
   - Duplicate dashboards with minor changes
   - Solution: Use variables and permissions

2. Too Many Panels:
   - >15 panels = slow loading
   - Information overload
   - Solution: Break into multiple focused dashboards

3. High Cardinality Queries:
* /
// BAD - too many series
sum by (user_id) (metric)

// GOOD - aggregate appropriately
sum by (service) (metric)
/*

4. No Context:
   - Missing panel descriptions
   - Unclear metric meanings
   - Solution: Add text panels and descriptions

5. Hard-coded Values:
   - Fixed instance names
   - Static thresholds
   - Solution: Use variables and config

6. Inconsistent Time Ranges:
   - Different panels showing different times
   - Solution: Use dashboard-level time range

7. Poor Performance:
   - Too many data points
   - Complex queries without optimization
   - Too frequent refresh
* /
// Use max_over_time to reduce data points
max_over_time(metric[5m])
/*

Dashboard Structure Example (RED Method):
* /
/*
Row 1: Overview
- Request Rate (time series)
- Error Rate % (stat with threshold)
- P95 Latency (gauge)

Row 2: Request Details
- Requests by endpoint (time series)
- Status code distribution (bar chart)
- Top errors (table)

Row 3: Resources
- CPU usage (time series)
- Memory usage (time series)
- Disk I/O (time series)

Row 4: Alerts & Links
- Active alerts (alert list)
- Related dashboards (dashboard list)
* /
/*

Folder organization:
* /
/*
/Dashboards
  /Production
    - Service Overview
    - Database Monitoring
    - Infrastructure
  /Development
    - Dev Environment
  /SRE
    - Incident Response
    - On-call Dashboard
* /
/*


SECTION 3: QUERIES & TRANSFORMATIONS
-------------------------------------

11. How do you write queries in Grafana for Prometheus, and what are some common PromQL patterns?

ANSWER:

Query Interface in Grafana:
- Builder mode (visual query builder)
- Code mode (raw PromQL)

Common PromQL Patterns:

1. Rate of increase (for counters):
* /
// Requests per second
rate(http_requests_total[5m])

// Network bytes per second
rate(node_network_receive_bytes_total[5m])
/*

2. Aggregation:
* /
// Total across all instances
sum(rate(http_requests_total[5m]))

// By label
sum by (service) (rate(http_requests_total[5m]))

// Average CPU
avg(rate(node_cpu_seconds_total{mode!="idle"}[5m])) by (instance)
/*

3. Percentage calculations:
* /
// Error rate percentage
sum(rate(http_requests_total{status=~"5.."}[5m])) / 
sum(rate(http_requests_total[5m])) * 100

// Memory usage percentage
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100
/*

4. Quantiles (percentiles):
* /
// P95 latency
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)
/*

5. Top K values:
* /
// Top 5 services by request rate
topk(5, sum by (service) (rate(http_requests_total[5m])))

// Bottom 3 by memory
bottomk(3, node_memory_MemAvailable_bytes)
/*

6. Comparison with previous period:
* /
// Current vs 1 day ago
rate(http_requests_total[5m]) 
  and 
rate(http_requests_total[5m] offset 1d)
/*

7. Filtering:
* /
// Regex match
http_requests_total{instance=~"prod-.*"}

// Not equal
http_requests_total{status!="200"}

// Multiple values
http_requests_total{status=~"200|201|204"}
/*

8. Using Grafana variables:
* /
// Single variable
rate(http_requests_total{instance="$instance"}[5m])

// Multi-value variable
rate(http_requests_total{instance=~"$instance"}[5m])

// Interval variable
rate(http_requests_total[$__interval])

// Range variable
increase(http_requests_total[$__range])
/*

9. Alerts and thresholds:
* /
// Query for alert
avg(rate(http_requests_total{status=~"5.."}[5m])) > 10
/*

Grafana-specific functions:
* /
// $__interval - automatically calculated step
// $__range - selected time range
// $__rate_interval - suitable for rate()
// $__from and $__to - Unix timestamps

rate(metric[$__rate_interval])
/*


12. What are transformations in Grafana and when would you use them?

ANSWER:

Transformations process query results before visualization.

Common transformations:

1. Merge:
   - Combines multiple queries into single table
   - Use case: Joining data from different sources

2. Filter by name:
   - Include/exclude specific fields or series
   - Use case: Remove unwanted metrics
* /
// Remove "Time" field, keep only specific metrics
Filter by name: Include "cpu_usage", "memory_usage"
/*

3. Filter by value:
   - Filter rows based on field values
   - Use case: Show only values above threshold
* /
// Show only instances with >80% CPU
Filter by value: cpu_usage > 80
/*

4. Organize fields:
   - Rename, reorder, or hide fields
   - Use case: Better column names in tables

5. Reduce:
   - Calculate single value from time series
   - Functions: Last, First, Mean, Max, Min, Sum
   - Use case: Show latest value in stat panel

6. Add field from calculation:
   - Create new field using formula
   - Use case: Calculate derived metrics
* /
// Add percentage field
cpu_percent = (cpu_used / cpu_total) * 100
/*

7. Labels to fields:
   - Convert Prometheus labels to table columns
   - Use case: Better table display

8. Group by:
   - Group rows by field value
   - Apply aggregation (sum, mean, etc.)

9. Sort by:
   - Order results by field value
   - Use case: Top N queries

10. Concatenate fields:
    - Combine multiple fields into one
    - Use case: Creating composite labels

Example transformation workflow:
* /
/*
Query 1: node_cpu_seconds_total
Query 2: node_memory_MemAvailable_bytes

Transformation 1: Merge (combine queries)
Transformation 2: Labels to fields (instance → column)
Transformation 3: Organize fields (rename columns)
Transformation 4: Sort by (order by CPU desc)
Transformation 5: Filter by value (instance with CPU > 80%)

Result: Sorted table of instances with high CPU
* /
/*

Use cases:

1. Table display:
   - Labels to fields
   - Organize fields for proper column order

2. Stat panels:
   - Reduce (get last value)
   - Filter by name (select specific metric)

3. Calculating ratios:
   - Add field from calculation
* /
// Query 1: errors
// Query 2: total
// Transform: Add field
error_rate = (errors / total) * 100
/*

4. Data cleanup:
   - Filter by value (remove nulls)
   - Rename via organize fields

5. Time series aggregation:
   - Group by (aggregate by label)
   - Reduce (calculate statistics)


13. How do you handle multiple data sources on a single dashboard?

ANSWER:

Approaches:

1. Different panels, different data sources:
* /
/*
Panel 1: Prometheus (metrics)
  - Data Source: Prometheus
  - Query: rate(http_requests_total[5m])

Panel 2: Loki (logs)
  - Data Source: Loki
  - Query: {app="backend"} |= "error"

Panel 3: MySQL (business data)
  - Data Source: MySQL
  - Query: SELECT COUNT(*) FROM orders WHERE created_at > NOW() - INTERVAL 1 HOUR
* /
/*

2. Mixed data source in single panel:
* /
/*
Panel: Combined view
  Query A: 
    - Data Source: Prometheus
    - Expression: rate(requests[5m])
  Query B:
    - Data Source: InfluxDB
    - Expression: SELECT mean("value") FROM "cpu"
* /
/*

3. Using variables for data source selection:
* /
// Create data source variable
Name: datasource
Type: Data source
Query: Prometheus

// Use in panel
Data Source: $datasource
/*

4. Data source proxy pattern:
   - Use Infinity or JSON API plugin
   - Aggregate multiple sources via API

5. Link panels across data sources:
   - Use data links to connect related data
   - Click metric in Prometheus → jump to logs in Loki

Configuration example:
* /
// Panel with data links
{
  "fieldConfig": {
    "defaults": {
      "links": [
        {
          "title": "View Logs",
          "url": "/d/loki-dashboard?var-instance=${__field.labels.instance}"
        }
      ]
    }
  }
}
/*

Best practices:

1. Organize by data source:
   - Group panels using rows
   - Row 1: Metrics (Prometheus)
   - Row 2: Logs (Loki)
   - Row 3: Traces (Jaeger)

2. Correlation:
   - Share time range across all panels
   - Use variables for filtering (instance, service)
   - Link panels with data links

3. Performance:
   - Limit queries per panel
   - Use appropriate refresh intervals per data source
   - Cache where possible

4. Provisioning multiple data sources:
* /
// datasources.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true

  - name: Loki
    type: loki
    url: http://loki:3100

  - name: MySQL
    type: mysql
    url: mysql-server:3306
    database: myapp
    user: grafana
    secureJsonData:
      password: secret
/*


14. How do you use query variables and chained variables in Grafana?

ANSWER:

Query Variables:

Variables populated from data source queries.

1. Basic query variable:
* /
// Dashboard Settings → Variables → Add

Name: region
Type: Query
Data source: Prometheus
Query: label_values(up, region)
Refresh: On Dashboard Load
Sort: Alphabetical (asc)
Multi-value: false
Include All: false
/*

2. Using in queries:
* /
rate(http_requests_total{region="$region"}[5m])
/*

Chained Variables:

Variables that depend on other variables.

Example: Region → Cluster → Instance

* /
// Variable 1: region
Name: region
Query: label_values(up, region)

// Variable 2: cluster (depends on region)
Name: cluster
Query: label_values(up{region="$region"}, cluster)

// Variable 3: instance (depends on cluster)
Name: instance
Query: label_values(up{region="$region", cluster="$cluster"}, instance)

// Use in query
rate(http_requests_total{
  region="$region", 
  cluster="$cluster", 
  instance="$instance"
}[5m])
/*

Advanced patterns:

1. Multi-value variable:
* /
Name: instance
Multi-value: true
Include All: true

// Query with multi-value
rate(http_requests_total{instance=~"$instance"}[5m])
/*

2. Custom All value:
* /
Include All: true
Custom all value: .*

// When "All" selected, becomes:
{instance=~".*"}
/*

3. Interval variable:
* /
Name: interval
Type: Interval
Values: 1m,5m,10m,30m,1h
Auto: true

// Use in query
rate(metric[$interval])
/*

4. Ad-hoc filters (Prometheus):
* /
// Automatically creates filter dropdowns
Type: Ad hoc filters
Data source: Prometheus

// Users can add filters dynamically
// label_name = label_value
/*

5. Query variable with regex:
* /
Query: label_values(up, instance)
Regex: /prod-(.*)/

// Extracts only part of label
// prod-server-1 → server-1
/*

6. Text box variable:
* /
Name: search
Type: Text box
Default: error

// Use in Loki query
{app="backend"} |= "$search"
/*

7. Constant variable (hidden):
* /
Name: threshold
Type: Constant
Value: 80
Hide: Variable

// Use in query
metric > $threshold
/*

8. Data source variable:
* /
Name: datasource
Type: Data source
Query: Prometheus

// Use as data source
Data Source: $datasource
/*

Complete example:
* /
/*
Dashboard: Service Monitoring

Variables:
1. environment: Query - label_values(up, environment)
2. region: Query - label_values(up{environment="$environment"}, region)
3. service: Query - label_values(up{environment="$environment", region="$region"}, service)
4. interval: Interval - 1m,5m,15m,1h

Query in panel:
sum(rate(http_requests_total{
  environment="$environment",
  region="$region",
  service="$service"
}[$interval])) by (status)

Result: Dynamic dashboard that filters by environment → region → service
with adjustable time interval
* /
/*


15. How do you optimize queries in Grafana to avoid performance issues?

ANSWER:

Query Optimization Techniques:

1. Use appropriate time ranges:
* /
// BAD - querying 30 days at 15s resolution
rate(metric[5m])  // with 30d time range

// GOOD - use recording rules or larger intervals
rate(metric[5m])  // with 6h time range
/*

2. Use Grafana's interval variables:
* /
// Automatically adjusts step based on panel width
rate(metric[$__interval])

// Or for rate queries
rate(metric[$__rate_interval])
/*

3. Limit series cardinality:
* /
// BAD - too many series
sum by (instance, path, method, status) (rate(http_requests_total[5m]))

// GOOD - aggregate appropriately
sum by (service, status) (rate(http_requests_total[5m]))
/*

4. Use recording rules in Prometheus:
* /
// prometheus.yml
groups:
  - name: grafana_optimization
    interval: 15s
    rules:
      - record: instance:cpu:avg_rate5m
        expr: avg(rate(node_cpu_seconds_total[5m])) by (instance)

// Use in Grafana
instance:cpu:avg_rate5m
/*

5. Set appropriate scrape intervals:
* /
// prometheus.yml
scrape_configs:
  - job_name: 'high-frequency'
    scrape_interval: 15s  // For critical metrics
  
  - job_name: 'low-frequency'
    scrape_interval: 1m   // For less critical metrics
/*

6. Limit data points:
* /
// Use max_over_time for downsampling
max_over_time(metric[5m])

// Or avg_over_time
avg_over_time(metric[1m])
/*

7. Use caching:
* /
// Set cache timeout in data source
Cache timeout: 60  // seconds
/*

8. Query optimization in panel:
* /
{
  "maxDataPoints": 1000,  // Limit points returned
  "interval": "30s",      // Minimum interval
  "intervalFactor": 2     // Multiplier for interval
}
/*

9. Avoid heavy transformations:
* /
// BAD - heavy transformation on large dataset
// Query → Transform: Complex calculation on 100k rows

// GOOD - pre-aggregate in query
// Query returns already calculated result
/*

10. Use query caching:
* /
// Data source configuration
{
  "queryTimeout": "60s",
  "defaultRegion": "us-west-1",
  "cache": {
    "enabled": true,
    "ttlQueriesMs": 60000,  // 1 minute cache
    "ttlResourcesMs": 300000 // 5 minute cache
  }
}
/*

11. Parallel queries:
   - Split into multiple panels
   - Grafana executes in parallel

12. Optimize dashboard settings:
* /
{
  "refresh": "1m",        // Don't refresh too frequently
  "time": {
    "from": "now-1h",     // Reasonable time range
    "to": "now"
  }
}
/*

13. Use query inspector:
   - Panel menu → Inspect → Query
   - Check execution time
   - Optimize slow queries

Performance checklist:

□ Use $__interval and $__rate_interval
□ Limit time range to necessary period
□ Aggregate high-cardinality labels
□ Set max data points appropriately
□ Use recording rules for complex queries
□ Enable query caching
□ Optimize refresh rate (>30s for production)
□ Limit panels per dashboard (<15)
□ Use query inspector to identify slow queries
□ Consider query timeout settings


SECTION 4: ALERTING & NOTIFICATIONS
------------------------------------

16. What is Grafana Alerting and how does it differ from Prometheus Alertmanager?

ANSWER:

Grafana Alerting (Unified Alerting):
- Built into Grafana (v8+)
- Multi-data source alerting
- Visual alert rule creation
- Integrated with dashboards
- Supports Grafana-managed and data source-managed alerts

Prometheus Alertmanager:
- Separate component
- Only Prometheus metrics
- YAML configuration
- Independent of visualization

Key Differences:

1. Data Source Support:
* /
// Grafana Alerting
// Can alert on: Prometheus, Loki, CloudWatch, MySQL, etc.

// Alertmanager
// Only Prometheus metrics
/*

2. Alert Rule Definition:
* /
// Grafana: UI + API
// Created in dashboard or alert rule page

// Alertmanager: YAML files
groups:
  - name: example
    rules:
      - alert: HighCPU
        expr: cpu > 80
/*

3. Integration:
* /
// Grafana Alerting
// - Dashboard integration
// - Panel-level alerts (legacy)
// - Centralized alert management UI

// Alertmanager
// - Standalone service
// - Grafana can send to it as contact point
// - Configured via alertmanager.yml
/*

4. Features:

Grafana Alerting:
- Silences and mute timings UI
- Alert grouping and routing
- Contact points (Slack, email, PagerDuty, etc.)
- Alert instances view
- State history
- Multi-dimensional rules

Alertmanager:
- Similar features but via YAML/API
- More mature for Prometheus-only setups
- Better for infrastructure as code

5. When to use:

Use Grafana Alerting when:
- Multiple data sources
- Want UI-based management
- Dashboard integration important
- Team prefers visual tools

Use Prometheus Alertmanager when:
- Prometheus-only environment
- Prefer GitOps/infrastructure as code
- Already have Alertmanager setup
- Need advanced routing features

Integration example (both together):
* /
// Grafana can use Alertmanager as contact point
{
  "name": "Alertmanager",
  "type": "prometheus-alertmanager",
  "settings": {
    "url": "http://alertmanager:9093"
  }
}
/*


17. How do you create and configure an alert rule on a panel in Grafana?

ANSWER:

Creating Alert Rules (Unified Alerting - Grafana 8+):

1. From Panel (Legacy Alert - deprecated):
* /
// Edit Panel → Alert tab → Create Alert
// This is deprecated, use new alerting instead
/*

2. New Unified Alerting:

Navigate to: Alerting → Alert rules → New alert rule

Step 1: Set alert rule name
* /
Rule name: High CPU Usage Alert
/*

Step 2: Define query and condition
* /
// Query A (Prometheus)
avg(rate(node_cpu_seconds_total{mode!="idle"}[5m])) by (instance) * 100

// Condition
WHEN avg() OF A IS ABOVE 80
/*

Step 3: Set evaluation behavior
* /
Folder: Production Alerts
Evaluation group: Infrastructure (evaluate every 1m)
Pending period: 5m  // Alert fires after 5 minutes above threshold
/*

Step 4: Add labels and annotations
* /
Labels:
  severity: warning
  team: platform
  environment: production

Annotations:
  summary: "High CPU on {{ $labels.instance }}"
  description: "CPU usage is {{ $value }}%"
  runbook_url: "https://wiki.company.com/runbooks/high-cpu"
/*

Step 5: Configure notifications
* /
// Handled by notification policies
/*

Complete alert rule example:
* /
{
  "uid": "cpu_alert_001",
  "title": "High CPU Usage",
  "condition": "A",
  "data": [
    {
      "refId": "A",
      "queryType": "prometheus",
      "model": {
        "expr": "avg(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) by (instance) * 100"
      }
    },
    {
      "refId": "B",
      "queryType": "threshold",
      "model": {
        "conditions": [
          {
            "evaluator": {
              "params": [80],
              "type": "gt"
            }
          }
        ]
      }
    }
  ],
  "noDataState": "NoData",
  "execErrState": "Error",
  "for": "5m",
  "annotations": {
    "summary": "High CPU on {{ $labels.instance }}",
    "description": "CPU usage is {{ $value }}%"
  },
  "labels": {
    "severity": "warning",
    "team": "platform"
  }
}
/*

Alert rule states:
- Normal: Condition not met
- Pending: Condition met, waiting for "for" duration
- Firing: Condition met for required duration
- NoData: No data received
- Error: Query execution error

Testing alerts:
* /
// Use "Preview" button in alert rule editor
// Shows current evaluation result
/*

Alert expressions:
* /
// Classic condition
WHEN last() OF query(A, 5m, now) IS ABOVE 80

// Reduce expression
reduce(A, last)

// Math expression
$B > 80

// Threshold expression
threshold(A, 80)
/*


18. What are contact points and notification policies in Grafana's unified alerting?

ANSWER:

Contact Points:
Destinations where alert notifications are sent.

Creating contact points:

Alerting → Contact points → New contact point

* /
Name: team-slack
Type: Slack
Webhook URL: https://hooks.slack.com/services/XXX
Channel: #alerts
/*

Supported contact point types:
* /
- Email
- Slack
- Microsoft Teams
- PagerDuty
- Webhook
- OpsGenie
- VictorOps
- Pushover
- Telegram
- Discord
- Google Chat
- Kafka
- SNS (Amazon)
- OnCall (Grafana)
/*

Contact point configuration examples:

1. Email:
* /
{
  "name": "email-team",
  "type": "email",
  "settings": {
    "addresses": "team@example.com",
    "singleEmail": true
  }
}
/*

2. Slack:
* /
{
  "name": "slack-critical",
  "type": "slack",
  "settings": {
    "url": "https://hooks.slack.com/services/XXX",
    "recipient": "#critical-alerts",
    "title": "{{ .GroupLabels.alertname }}",
    "text": "{{ range .Alerts }}{{ .Annotations.description }}{{ end }}"
  }
}
/*

3. Webhook:
* /
{
  "name": "custom-webhook",
  "type": "webhook",
  "settings": {
    "url": "https://api.example.com/alerts",
    "httpMethod": "POST",
    "username": "admin",
    "password": "secret"
  }
}
/*

Notification Policies:

Define which alerts go to which contact points.

Default notification policy structure:
* /
Notification policy tree:
  ├── Default policy (catch-all)
  │   Contact point: default-email
  │   
  ├── Policy: Critical alerts
  │   Matchers: severity = critical
  │   Contact point: pagerduty
  │   
  ├── Policy: Warning alerts
  │   Matchers: severity = warning
  │   Contact point: slack
  │   
  └── Policy: Dev environment
      Matchers: environment = dev
      Contact point: dev-slack
/*

Notification policy configuration:
* /
{
  "receiver": "slack-critical",
  "group_by": ["alertname", "cluster"],
  "group_wait": "30s",
  "group_interval": "5m",
  "repeat_interval": "4h",
  "matchers": [
    {
      "name": "severity",
      "value": "critical",
      "isRegex": false
    }
  ],
  "continue": false,  // Stop matching further policies
  "mute_time_intervals": ["business-hours"]
}
/*

Key settings:

1. Group by:
   - Combine similar alerts
   - Reduces notification noise

2. Group wait:
   - Initial wait time before sending
   - Allows grouping of alerts

3. Group interval:
   - Time between updates for same group

4. Repeat interval:
   - How often to resend if still firing

5. Matchers:
   - Label matching rules
   - Routes alerts to correct contact point

Complete example:
* /
// Alert rule labels
labels:
  severity: critical
  team: backend
  environment: production

// Notification policy
{
  "matchers": [
    {"name": "severity", "value": "critical"},
    {"name": "team", "value": "backend"}
  ],
  "receiver": "pagerduty-backend",
  "group_by": ["alertname"],
  "group_wait": "10s",
  "repeat_interval": "1h"
}

// Matches and sends to pagerduty-backend contact point
/*

Mute timings:
* /
// Suppress notifications during maintenance
Name: maintenance-window
Time interval: 
  - Days: Saturday, Sunday
  - Time: 02:00 - 04:00
  - Months: *
/*


19. How do you manage and silence alerts in Grafana?

ANSWER:

Managing Alerts:

1. View active alerts:
   Alerting → Alert rules
   - Shows all alert rules and their states
   - Filter by state, label, data source

2. Alert instances:
   Alerting → Alert instances
   - Shows individual firing alerts
   - Real-time status

3. Alert state:
   - Normal (green)
   - Pending (yellow) - condition met, waiting
   - Firing (red) - actively alerting
   - No Data (grey)
   - Error (orange)

Silencing Alerts:

1. Create silence:
   Alerting → Silences → New silence

* /
Silence configuration:
  Start: 2025-12-16 22:00
  End: 2025-12-17 02:00
  Duration: 4h
  
  Matchers:
    alertname = HighCPU
    instance = prod-server-1
  
  Creator: john@example.com
  Comment: Planned maintenance on prod-server-1
/*

2. Silence by label matchers:
* /
// Exact match
alertname = "HighMemory"

// Regex match
instance =~ "prod-.*"

// Multiple matchers (AND logic)
severity = "warning"
environment = "staging"
/*

3. Mute timings (recurring silences):

   Alerting → Notification policies → Mute timings

* /
Name: business-hours
Time intervals:
  - Weekdays: Monday-Friday
  - Time: 09:00-17:00
  - Location: America/New_York

Name: weekend-maintenance
Time intervals:
  - Weekdays: Saturday-Sunday
  - Time: 02:00-06:00
/*

4. Apply mute timing to notification policy:
* /
{
  "receiver": "slack-team",
  "matchers": [...],
  "mute_time_intervals": ["business-hours", "weekend-maintenance"]
}
/*

Managing alert rules:

1. Pause alert rule:
* /
// Edit alert rule → Set to paused
// Stops evaluation but keeps configuration
/*

2. Delete alert rule:
   - Alert rules → Select rule → Delete
   - Permanently removes rule

3. Edit alert rule:
   - Update query, threshold, or labels
   - Changes take effect on next evaluation

Silence management via API:
* /
// Create silence
POST /api/alertmanager/grafana/api/v2/silences
{
  "matchers": [
    {
      "name": "alertname",
      "value": "HighCPU",
      "isRegex": false
    }
  ],
  "startsAt": "2025-12-16T22:00:00Z",
  "endsAt": "2025-12-17T02:00:00Z",
  "createdBy": "admin",
  "comment": "Maintenance window"
}

// List silences
GET /api/alertmanager/grafana/api/v2/silences

// Delete silence
DELETE /api/alertmanager/grafana/api/v2/silence/{silence_id}
/*

Best practices:

1. Use specific matchers:
* /
// GOOD - specific
alertname = "DatabaseDown"
instance = "db-prod-1"

// BAD - too broad
severity = "critical"  // Silences all critical alerts
/*

2. Add comments:
   - Explain reason for silence
   - Include ticket/issue number
   - Note who requested it

3. Set appropriate duration:
   - Don't silence indefinitely
   - Use end time, not just duration

4. Use mute timings for recurring patterns:
   - Scheduled maintenance
   - Non-business hours
   - Known noisy periods

5. Review active silences regularly:
   - Remove expired or unnecessary silences
   - Clean up after maintenance

Silence states:
- Active: Currently suppressing alerts
- Pending: Scheduled for future
- Expired: Past end time


20. How would you choose between using Grafana alerts vs Prometheus Alertmanager for a project?

ANSWER:

Decision Matrix:

Use Grafana Alerting when:

1. Multiple data sources:
* /
// Need to alert on:
- Prometheus metrics
- Loki logs
- CloudWatch metrics
- SQL database queries
- Custom API data
/*

2. UI-first approach:
   - Team prefers visual configuration
   - Less technical users manage alerts
   - Dashboard-integrated alerts

3. Unified alerting:
   - Single pane of glass for all alerts
   - Consistent notification handling
   - Cross-data-source correlation

4. Grafana-centric stack:
   - Already using Grafana heavily
   - Want integrated experience
   - Leverage Grafana RBAC

Use Prometheus Alertmanager when:

1. Prometheus-only environment:
* /
// All alerts based on Prometheus metrics
- Infrastructure monitoring
- Application metrics
- No other data sources
/*

2. GitOps/IaC approach:
* /
// Alert rules in version control
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - '/etc/prometheus/alerts/*.yml'
/*

3. Mature Prometheus setup:
   - Already have Alertmanager deployed
   - Team familiar with Alertmanager
   - Existing alert rules

4. Advanced routing needs:
   - Complex inhibition rules
   - Time-based routing
   - High-availability setup

Hybrid Approach (Both):

Use both when you need:
* /
// Grafana Alerting
// - Loki log-based alerts
// - SQL query alerts
// - Dashboard panel alerts

// Prometheus Alertmanager
// - Infrastructure metric alerts
// - Existing Prometheus alert rules
// - Advanced routing/inhibition

// Configure Grafana to send to Alertmanager
Contact point type: Prometheus Alertmanager
URL: http://alertmanager:9093
/*

Comparison table:
* /
/*
Feature                  | Grafana Alerting    | Alertmanager
------------------------|---------------------|--------------------
Data Sources            | Multiple            | Prometheus only
Configuration          | UI + API + File     | YAML files
Dashboard Integration  | Native              | Via annotations
Learning Curve         | Lower               | Higher
Multi-tenancy          | Grafana orgs        | Via external auth
State History          | Built-in            | External needed
Notification Channels  | 20+                 | Similar
Alert Grouping         | Yes                 | Yes
Silencing              | UI + API            | UI + API + amtool
HA Setup               | Grafana HA          | Clustered
Version Control        | Export/Import       | GitOps friendly
* /
/*

Migration path:

From Alertmanager to Grafana:
* /
// 1. Export Alertmanager config
// 2. Recreate in Grafana as contact points
// 3. Convert alert rules to Grafana format
// 4. Test notifications
// 5. Gradually migrate alerts
/*

Recommendation:

New projects:
- Start with Grafana Alerting (simpler, more flexible)

Existing Prometheus setup:
- Keep Alertmanager, add Grafana for other data sources

Large-scale Prometheus:
- Use Alertmanager for maturity and GitOps

Mixed environments:
- Use both, route appropriately


SECTION 5: SECURITY, ADMIN & INTEGRATION
-----------------------------------------

21. How do you manage user authentication in Grafana (local users, LDAP, OAuth, SSO)?

ANSWER:

Authentication Methods:

1. Local Authentication (default):
* /
// grafana.ini
[auth]
disable_login_form = false

[users]
allow_sign_up = false
allow_org_create = false
auto_assign_org = true
auto_assign_org_role = Viewer
/*

Create local user:
* /
// Via UI: Configuration → Users → Invite
// Via API:
POST /api/admin/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "login": "john",
  "password": "secretpass",
  "OrgId": 1,
  "role": "Editor"
}
/*

2. LDAP/Active Directory:
* /
// grafana.ini
[auth.ldap]
enabled = true
config_file = /etc/grafana/ldap.toml
allow_sign_up = true

// ldap.toml
[[servers]]
host = "ldap.example.com"
port = 389
use_ssl = false
start_tls = false
ssl_skip_verify = false
bind_dn = "cn=admin,dc=grafana,dc=org"
bind_password = 'password'
search_filter = "(cn=%s)"
search_base_dns = ["dc=grafana,dc=org"]

[servers.attributes]
name = "givenName"
surname = "sn"
username = "cn"
member_of = "memberOf"
email = "email"

[[servers.group_mappings]]
group_dn = "cn=admins,dc=grafana,dc=org"
org_role = "Admin"

[[servers.group_mappings]]
group_dn = "cn=editors,dc=grafana,dc=org"
org_role = "Editor"
/*

3. OAuth (Google, GitHub, GitLab, Okta):

Google OAuth:
* /
// grafana.ini
[auth.google]
enabled = true
client_id = YOUR_CLIENT_ID
client_secret = YOUR_CLIENT_SECRET
scopes = https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email
auth_url = https://accounts.google.com/o/oauth2/auth
token_url = https://accounts.google.com/o/oauth2/token
allowed_domains = example.com
allow_sign_up = true
/*

GitHub OAuth:
* /
[auth.github]
enabled = true
client_id = YOUR_GITHUB_CLIENT_ID
client_secret = YOUR_GITHUB_CLIENT_SECRET
scopes = user:email,read:org
auth_url = https://github.com/login/oauth/authorize
token_url = https://github.com/login/oauth/access_token
api_url = https://api.github.com/user
allowed_organizations = your-org
allow_sign_up = true
/*

4. Generic OAuth (Okta, Auth0, Keycloak):
* /
[auth.generic_oauth]
enabled = true
name = Okta
client_id = YOUR_CLIENT_ID
client_secret = YOUR_CLIENT_SECRET
scopes = openid email profile
auth_url = https://your-domain.okta.com/oauth2/v1/authorize
token_url = https://your-domain.okta.com/oauth2/v1/token
api_url = https://your-domain.okta.com/oauth2/v1/userinfo
allow_sign_up = true
role_attribute_path = contains(groups[*], 'Admin') && 'Admin' || 'Viewer'
/*

5. SAML (Enterprise):
* /
[auth.saml]
enabled = true
certificate_path = /path/to/cert.pem
private_key_path = /path/to/private_key.pem
idp_metadata_url = https://idp.example.com/metadata
assertion_attribute_name = displayName
assertion_attribute_login = login
assertion_attribute_email = email
/*

6. Azure AD:
* /
[auth.azuread]
name = Azure AD
enabled = true
allow_sign_up = true
client_id = YOUR_CLIENT_ID
client_secret = YOUR_CLIENT_SECRET
scopes = openid email profile
auth_url = https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/v2.0/authorize
token_url = https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/v2.0/token
allowed_domains =
allowed_groups =
/*

Best practices:

1. Disable local sign-up in production:
* /
[users]
allow_sign_up = false
/*

2. Use OAuth/SSO for better security:
   - Centralized user management
   - MFA support
   - Automatic deprovisioning

3. Set strong password policy:
* /
[security]
admin_password = <change-me>
secret_key = <long-random-string>
/*

4. Enable HTTPS:
* /
[server]
protocol = https
cert_file = /path/to/cert.pem
cert_key = /path/to/cert.key
/*

5. Role mapping:
   - Map external groups to Grafana roles
   - Automatic role assignment

6. Session management:
* /
[session]
provider = redis
provider_config = addr=127.0.0.1:6379,pool_size=100,db=grafana
cookie_name = grafana_session
cookie_secure = true
session_life_time = 86400
/*


22. How do you back up and migrate Grafana dashboards and configuration between environments?

ANSWER:

Backup Methods:

1. Database Backup (Complete):
* /
// SQLite (default)
cp /var/lib/grafana/grafana.db /backup/grafana.db.$(date +%Y%m%d)

// PostgreSQL
pg_dump -U grafana -h localhost grafana > grafana_backup.sql

// MySQL
mysqldump -u grafana -p grafana > grafana_backup.sql
/*

2. Dashboard Export/Import (Individual):

Export single dashboard:
* /
// Via UI:
// Dashboard → Settings → JSON Model → Copy

// Via API:
GET /api/dashboards/uid/:uid
// Save response JSON
/*

Import dashboard:
* /
// Via UI:
// + → Import → Upload JSON file

// Via API:
POST /api/dashboards/db
{
  "dashboard": {...},
  "folderId": 0,
  "overwrite": false
}
/*

3. Dashboard Provisioning (Recommended):

Directory structure:
* /
/etc/grafana/provisioning/
  ├── dashboards/
  │   ├── dashboard.yml
  │   └── dashboards/
  │       ├── app-monitoring.json
  │       └── infrastructure.json
  ├── datasources/
  │   └── datasource.yml
  └── alerting/
      └── alerts.yml
/*

Dashboard provisioning config:
* /
// /etc/grafana/provisioning/dashboards/dashboard.yml
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: 'Production'
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /etc/grafana/provisioning/dashboards
      foldersFromFilesStructure: true
/*

4. Backup Script (All Dashboards):
* /
#!/bin/bash
# backup-grafana-dashboards.sh

GRAFANA_URL="http://localhost:3000"
API_KEY="your-api-key"
BACKUP_DIR="./grafana-backup-$(date +%Y%m%d)"

mkdir -p "$BACKUP_DIR"

# Get all dashboard UIDs
curl -H "Authorization: Bearer $API_KEY" \
  "$GRAFANA_URL/api/search?type=dash-db" \
  | jq -r '.[] | .uid' \
  | while read uid; do
    # Export each dashboard
    curl -H "Authorization: Bearer $API_KEY" \
      "$GRAFANA_URL/api/dashboards/uid/$uid" \
      | jq '.dashboard' \
      > "$BACKUP_DIR/$uid.json"
    echo "Backed up dashboard: $uid"
  done
/*

5. Using grafana-backup-tool:
* /
// Install
pip install grafana-backup-tool

// Backup
grafana-backup save \
  --grafana-url http://localhost:3000 \
  --grafana-token YOUR_API_KEY \
  --components dashboards,datasources,alert-channels

// Restore
grafana-backup restore \
  --grafana-url http://localhost:3000 \
  --grafana-token YOUR_API_KEY \
  _OUTPUT_/202512161000.tar.gz
/*

Migration Between Environments:

1. Development → Staging → Production:

Step 1: Export from Dev:
* /
// Export dashboards as JSON
// Store in Git repository
git add dashboards/*.json
git commit -m "Update dashboards"
git push
/*

Step 2: Deploy to Staging:
* /
// Pull from Git
git pull origin main

// Copy to provisioning directory
cp dashboards/*.json /etc/grafana/provisioning/dashboards/

// Grafana auto-loads (if provisioning enabled)
/*

Step 3: Test and deploy to Production:
   - Same process as staging

2. Complete migration workflow:
* /
#!/bin/bash
# migrate-grafana.sh

SOURCE_URL="http://dev-grafana:3000"
TARGET_URL="http://prod-grafana:3000"
SOURCE_KEY="dev-api-key"
TARGET_KEY="prod-api-key"

# Export from source
./export-all-dashboards.sh $SOURCE_URL $SOURCE_KEY ./export

# Import to target
for file in ./export/*.json; do
  curl -X POST \
    -H "Authorization: Bearer $TARGET_KEY" \
    -H "Content-Type: application/json" \
    -d @"$file" \
    "$TARGET_URL/api/dashboards/db"
done
/*

3. Data Source Configuration:

Provisioning file:
* /
// /etc/grafana/provisioning/datasources/datasource.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
    jsonData:
      timeInterval: "15s"
/*

Environment-specific:
* /
// dev.yml
datasources:
  - name: Prometheus
    url: http://dev-prometheus:9090

// prod.yml
datasources:
  - name: Prometheus
    url: http://prod-prometheus:9090
/*

4. Configuration as Code (Docker):
* /
# docker-compose.yml
version: '3'
services:
  grafana:
    image: grafana/grafana:latest
    volumes:
      - ./grafana/provisioning:/etc/grafana/provisioning
      - ./grafana/dashboards:/var/lib/grafana/dashboards
      - grafana-data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_PATHS_PROVISIONING=/etc/grafana/provisioning

volumes:
  grafana-data:
/*

Best practices:

1. Version control:
   - Store dashboards in Git
   - Track changes
   - Code review process

2. Use provisioning:
   - Automate deployment
   - Prevent manual changes
   - Consistent across environments

3. Separate data sources by environment:
   - Use variables or provisioning
   - Don't hardcode URLs

4. Regular backups:
   - Automated daily backups
   - Test restore process
   - Store offsite

5. API keys management:
   - Use service accounts
   - Rotate keys regularly
   - Minimum required permissions


23. What are folder permissions in Grafana and how do you use them to secure dashboards?

ANSWER:

Folder Permissions:

Folders organize dashboards and control access.

Permission Levels:

1. View:
   - See folder and dashboards
   - Cannot edit

2. Edit:
   - View and modify dashboards
   - Cannot change permissions

3. Admin:
   - Full control
   - Can change permissions
   - Delete folder

Setting Folder Permissions:

Via UI:
* /
// Dashboards → Folder → Settings → Permissions
// Add permission:
//   User/Team/Role: Select
//   Permission: View/Edit/Admin
/*

Via API:
* /
// Get folder by UID
GET /api/folders/:uid

// Update permissions
POST /api/folders/:uid/permissions
{
  "items": [
    {
      "userId": 2,
      "permission": 2  // 1=View, 2=Edit, 4=Admin
    },
    {
      "teamId": 1,
      "permission": 2
    },
    {
      "role": "Viewer",
      "permission": 1
    }
  ]
}
/*

Permission Inheritance:

Dashboards inherit folder permissions by default.

Organization structure:
* /
Organization: Production
├── Folder: Public Dashboards
│   ├── Permissions: Everyone (View)
│   └── Dashboard: System Overview
│
├── Folder: Team Dashboards
│   ├── Permissions: Team (Edit), Others (View)
│   └── Dashboard: Team Metrics
│
└── Folder: Admin Only
    ├── Permissions: Admin (Admin)
    └── Dashboard: Billing & Usage
/*

Role-based Access:

Built-in roles:
* /
// Viewer
- View dashboards
- Cannot edit anything

// Editor  
- Create/edit dashboards
- Cannot change data sources or permissions

// Admin
- Full organization control
- Manage users, data sources, folders
/*

Team-based Permissions:

Create teams:
* /
// Configuration → Teams → New Team
Name: Backend Team
Email: backend@example.com

Members:
- john@example.com (Member)
- jane@example.com (Admin)
/*

Assign folder to team:
* /
// Folder Permissions
Team: Backend Team
Permission: Edit

// Now all team members can edit dashboards in folder
/*

Example Permission Setup:

1. Public monitoring (read-only):
* /
Folder: Public Dashboards
Permissions:
  - Role: Viewer → View
  - Role: Editor → View
  - Role: Admin → Admin
/*

2. Team-specific dashboards:
* /
Folder: DevOps Team
Permissions:
  - Team: DevOps → Edit
  - Team: Management → View
  - Role: Admin → Admin
/*

3. Sensitive dashboards:
* /
Folder: Finance
Permissions:
  - Team: Finance → Edit
  - User: ceo@company.com → View
  - Role: Admin → Admin
  - (Remove default Viewer/Editor roles)
/*

4. Per-dashboard override:
* /
// Dashboard → Settings → Permissions
// Override folder permissions for specific dashboard
Dashboard: Critical Alerts
Permissions:
  - Team: On-Call → Edit
  - Team: Engineering → View
/*

Provisioning folder permissions:
* /
// Not directly supported via provisioning
// Use API in CI/CD pipeline

// create-folder-with-permissions.sh
#!/bin/bash
GRAFANA_URL="http://localhost:3000"
API_KEY="your-api-key"

# Create folder
FOLDER_UID=$(curl -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"Production"}' \
  "$GRAFANA_URL/api/folders" \
  | jq -r '.uid')

# Set permissions
curl -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"teamId": 1, "permission": 2},
      {"role": "Viewer", "permission": 1}
    ]
  }' \
  "$GRAFANA_URL/api/folders/$FOLDER_UID/permissions"
/*

Best practices:

1. Use teams, not individual users:
   - Easier management
   - Scales better

2. Principle of least privilege:
   - Default to View
   - Grant Edit only when needed

3. Folder structure:
* /
/Production (Admin only)
  /Public (Everyone View)
  /Engineering (Engineering Team Edit)
  /Operations (Ops Team Edit)
/Development (Developers Edit)
/Testing (QA Team Edit)
/*

4. Regular audit:
   - Review permissions quarterly
   - Remove unnecessary access

5. Service accounts for automation:
* /
// Create service account with specific permissions
// Use for CI/CD, integrations
/*

6. Dashboard links respect permissions:
   - Users only see dashboards they can access


/*
24. How can you provision data sources and dashboards as code in Grafana? (CONTINUED)

File: /etc/grafana/provisioning/datasources/datasources.yml
* /
apiVersion: 1

datasources:
  # Prometheus
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
    jsonData:
      timeInterval: "15s"
      queryTimeout: "60s"
      httpMethod: POST
    version: 1

  # Loki
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    editable: false

  # MySQL
  - name: MySQL
    type: mysql
    url: mysql-server:3306
    database: myapp
    user: grafana
    secureJsonData:
      password: ${MYSQL_PASSWORD}
    jsonData:
      maxOpenConns: 100
      maxIdleConns: 100
      connMaxLifetime: 14400

  # CloudWatch
  - name: CloudWatch
    type: cloudwatch
    jsonData:
      authType: keys
      defaultRegion: us-east-1
    secureJsonData:
      accessKey: ${AWS_ACCESS_KEY}
      secretKey: ${AWS_SECRET_KEY}

  # InfluxDB
  - name: InfluxDB
    type: influxdb
    url: http://influxdb:8086
    database: telegraf
    user: admin
    secureJsonData:
      password: ${INFLUXDB_PASSWORD}
    jsonData:
      httpMode: GET
      
  # Elasticsearch
  - name: Elasticsearch
    type: elasticsearch
    url: http://elasticsearch:9200
    database: "[logs-]YYYY.MM.DD"
    jsonData:
      interval: Daily
      timeField: "@timestamp"
      esVersion: "7.10.0"

# Delete datasources not in this list
deleteDatasources:
  - name: Old-Prometheus
  - orgId: 1
    name: Test-MySQL
/*

2. Dashboard Provisioning:

File: /etc/grafana/provisioning/dashboards/dashboards.yml
* /
apiVersion: 1

providers:
  # Default dashboards in one folder
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /var/lib/grafana/dashboards

  # Production dashboards
  - name: 'production'
    orgId: 1
    folder: 'Production'
    type: file
    disableDeletion: true
    editable: false
    options:
      path: /etc/grafana/provisioning/dashboards/production

  # Team dashboards
  - name: 'team-dashboards'
    orgId: 1
    folder: 'Team'
    type: file
    disableDeletion: false
    updateIntervalSeconds: 30
    allowUiUpdates: true
    options:
      path: /etc/grafana/provisioning/dashboards/team
      foldersFromFilesStructure: true

  # Development dashboards
  - name: 'development'
    orgId: 1
    folder: 'Development'
    type: file
    options:
      path: /etc/grafana/provisioning/dashboards/dev
/*

Directory structure:
* /
/etc/grafana/provisioning/dashboards/
  ├── dashboards.yml
  ├── production/
  │   ├── system-overview.json
  │   ├── app-monitoring.json
  │   └── infrastructure.json
  ├── team/
  │   ├── backend/
  │   │   └── api-metrics.json
  │   └── frontend/
  │       └── web-metrics.json
  └── dev/
      └── test-dashboard.json
/*

3. Alert Provisioning (Unified Alerting):

File: /etc/grafana/provisioning/alerting/alerts.yml
* /
apiVersion: 1

groups:
  - orgId: 1
    name: infrastructure_alerts
    folder: Production Alerts
    interval: 1m
    rules:
      - uid: cpu_alert_001
        title: High CPU Usage
        condition: A
        data:
          - refId: A
            queryType: prometheus
            relativeTimeRange:
              from: 300
              to: 0
            datasourceUid: prometheus-uid
            model:
              expr: 'avg(rate(node_cpu_seconds_total{mode!="idle"}[5m])) * 100'
              intervalMs: 1000
              maxDataPoints: 43200
        noDataState: NoData
        execErrState: Error
        for: 5m
        annotations:
          summary: "High CPU on {{ $labels.instance }}"
          description: "CPU usage is {{ $value }}%"
        labels:
          severity: warning
          team: platform

      - uid: memory_alert_001
        title: High Memory Usage
        condition: B
        data:
          - refId: B
            queryType: prometheus
            datasourceUid: prometheus-uid
            model:
              expr: '(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100'
        for: 5m
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
        labels:
          severity: critical
          team: platform
/*

4. Contact Points Provisioning:

File: /etc/grafana/provisioning/alerting/contactpoints.yml
* /
apiVersion: 1

contactPoints:
  - orgId: 1
    name: slack-alerts
    receivers:
      - uid: slack_001
        type: slack
        settings:
          url: https://hooks.slack.com/services/XXX
          recipient: '#alerts'
          title: '{{ .GroupLabels.alertname }}'
          text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'

  - orgId: 1
    name: email-team
    receivers:
      - uid: email_001
        type: email
        settings:
          addresses: team@example.com
          singleEmail: true

  - orgId: 1
    name: pagerduty-critical
    receivers:
      - uid: pagerduty_001
        type: pagerduty
        settings:
          integrationKey: YOUR_INTEGRATION_KEY
          severity: critical

  - orgId: 1
    name: webhook-custom
    receivers:
      - uid: webhook_001
        type: webhook
        settings:
          url: https://api.example.com/alerts
          httpMethod: POST
          username: admin
          password: ${WEBHOOK_PASSWORD}
/*

5. Notification Policies Provisioning:

File: /etc/grafana/provisioning/alerting/policies.yml
* /
apiVersion: 1

policies:
  - orgId: 1
    receiver: slack-alerts
    group_by: ['alertname', 'cluster']
    group_wait: 30s
    group_interval: 5m
    repeat_interval: 4h
    routes:
      - receiver: pagerduty-critical
        matchers:
          - severity = critical
        group_wait: 10s
        repeat_interval: 1h
        continue: false
      
      - receiver: email-team
        matchers:
          - severity = warning
          - team = backend
        group_interval: 10m
        repeat_interval: 12h

      - receiver: slack-alerts
        matchers:
          - environment = development
        group_interval: 30m
        repeat_interval: 24h
/*

6. Complete Docker Compose Example:
* /
version: '3.8'

services:
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      # Provisioning
      - ./provisioning/datasources:/etc/grafana/provisioning/datasources
      - ./provisioning/dashboards:/etc/grafana/provisioning/dashboards
      - ./provisioning/alerting:/etc/grafana/provisioning/alerting
      # Dashboard JSON files
      - ./dashboards:/var/lib/grafana/dashboards
      # Persistent data
      - grafana-data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=${ADMIN_PASSWORD}
      - GF_PATHS_PROVISIONING=/etc/grafana/provisioning
      - GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource
      - GF_SERVER_ROOT_URL=https://grafana.example.com
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
      - AWS_ACCESS_KEY=${AWS_ACCESS_KEY}
      - AWS_SECRET_KEY=${AWS_SECRET_KEY}
    depends_on:
      - prometheus

  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus

volumes:
  grafana-data:
  prometheus-data:
/*

7. Kubernetes ConfigMap Example:
* /
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-datasources
  namespace: monitoring
data:
  datasources.yml: |
    apiVersion: 1
    datasources:
      - name: Prometheus
        type: prometheus
        url: http://prometheus-service:9090
        isDefault: true
        editable: false

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboard-provider
  namespace: monitoring
data:
  dashboards.yml: |
    apiVersion: 1
    providers:
      - name: 'default'
        orgId: 1
        folder: ''
        type: file
        options:
          path: /var/lib/grafana/dashboards

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
      - name: grafana
        image: grafana/grafana:latest
        ports:
        - containerPort: 3000
        volumeMounts:
        - name: datasources
          mountPath: /etc/grafana/provisioning/datasources
        - name: dashboard-provider
          mountPath: /etc/grafana/provisioning/dashboards
        - name: dashboards
          mountPath: /var/lib/grafana/dashboards
      volumes:
      - name: datasources
        configMap:
          name: grafana-datasources
      - name: dashboard-provider
        configMap:
          name: grafana-dashboard-provider
      - name: dashboards
        configMap:
          name: grafana-dashboards
/*

8. CI/CD Pipeline Example:
* /
# .github/workflows/deploy-grafana.yml
name: Deploy Grafana Dashboards

on:
  push:
    branches: [main]
    paths:
      - 'grafana/dashboards/**'
      - 'grafana/provisioning/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Validate Dashboard JSON
        run: |
          for file in grafana/dashboards/*.json; do
            jq empty "$file" || exit 1
          done
      
      - name: Deploy to Production
        run: |
          # Copy to server
          scp -r grafana/provisioning/* user@grafana-server:/etc/grafana/provisioning/
          scp -r grafana/dashboards/* user@grafana-server:/var/lib/grafana/dashboards/
          
          # Restart Grafana to reload
          ssh user@grafana-server 'sudo systemctl restart grafana-server'
/*

Best Practices:

1. Version control all provisioning files
2. Use environment variables for secrets
3. Set editable: false for production datasources
4. Use deleteDatasources to remove old configs
5. Test provisioning in dev before production
6. Use foldersFromFilesStructure for organization
7. Document dashboard changes in Git commits
8. Automate deployment via CI/CD
9. Keep sensitive data in secrets management
10. Regular backups of provisioning configs


25. How do you integrate Grafana with Kubernetes or cloud-native environments for observability?

ANSWER:

Kubernetes Integration:

1. Deploy Grafana on Kubernetes:

Helm installation (recommended):
* /
# Add Grafana Helm repo
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Grafana
helm install grafana grafana/grafana \
  --namespace monitoring \
  --create-namespace \
  --set persistence.enabled=true \
  --set persistence.size=10Gi \
  --set adminPassword=admin123 \
  --set service.type=LoadBalancer

# Get admin password
kubectl get secret --namespace monitoring grafana \
  -o jsonpath="{.data.admin-password}" | base64 --decode
/*

2. Complete Kubernetes Manifest:
* /
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring

---
# grafana-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: grafana-pvc
  namespace: monitoring
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi

---
# grafana-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-datasources
  namespace: monitoring
data:
  prometheus.yml: |
    apiVersion: 1
    datasources:
      - name: Prometheus
        type: prometheus
        url: http://prometheus-service.monitoring.svc.cluster.local:9090
        access: proxy
        isDefault: true
        jsonData:
          timeInterval: "15s"

---
# grafana-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
  labels:
    app: grafana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      securityContext:
        fsGroup: 472
        runAsUser: 472
      containers:
      - name: grafana
        image: grafana/grafana:latest
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: GF_SECURITY_ADMIN_USER
          valueFrom:
            secretKeyRef:
              name: grafana-secret
              key: admin-user
        - name: GF_SECURITY_ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: grafana-secret
              key: admin-password
        - name: GF_INSTALL_PLUGINS
          value: "grafana-piechart-panel,grafana-clock-panel"
        volumeMounts:
        - name: grafana-storage
          mountPath: /var/lib/grafana
        - name: grafana-datasources
          mountPath: /etc/grafana/provisioning/datasources
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 60
          timeoutSeconds: 30
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 10
      volumes:
      - name: grafana-storage
        persistentVolumeClaim:
          claimName: grafana-pvc
      - name: grafana-datasources
        configMap:
          name: grafana-datasources

---
# grafana-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: grafana
  namespace: monitoring
spec:
  type: ClusterIP
  ports:
  - port: 3000
    targetPort: 3000
    protocol: TCP
  selector:
    app: grafana

---
# grafana-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: grafana
  namespace: monitoring
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - grafana.example.com
    secretName: grafana-tls
  rules:
  - host: grafana.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: grafana
            port:
              number: 3000

---
# grafana-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: grafana-secret
  namespace: monitoring
type: Opaque
stringData:
  admin-user: admin
  admin-password: your-secure-password
/*

3. Service Discovery for Kubernetes:

Prometheus data source with K8s service discovery:
* /
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus-service.monitoring.svc.cluster.local:9090
    access: proxy
    isDefault: true
    jsonData:
      timeInterval: "15s"
      queryTimeout: "60s"
/*

4. Using kube-prometheus-stack (All-in-one):
* /
# Install complete monitoring stack
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false \
  --set grafana.enabled=true \
  --set grafana.adminPassword=admin123

# This includes:
# - Prometheus Operator
# - Prometheus
# - Alertmanager
# - Grafana (pre-configured)
# - Node Exporter
# - kube-state-metrics
# - Pre-built dashboards
/*

Cloud-Native Observability Stack:

1. Complete monitoring architecture:
* /
/*
Kubernetes Cluster
├── Monitoring Namespace
│   ├── Prometheus (metrics collection)
│   ├── Grafana (visualization)
│   ├── Loki (log aggregation)
│   ├── Tempo (distributed tracing)
│   ├── Alertmanager (alerting)
│   └── Node Exporter (host metrics)
│
├── Application Namespace
│   ├── App Pods (expose /metrics)
│   └── ServiceMonitor (Prometheus discovery)
│
└── Ingress
    ├── Grafana (grafana.example.com)
    └── Prometheus (prometheus.example.com)
* /
/*

2. ServiceMonitor for automatic scraping:
* /
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: app-metrics
  namespace: monitoring
  labels:
    release: prometheus
spec:
  selector:
    matchLabels:
      app: my-application
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
  namespaceSelector:
    matchNames:
    - production
    - staging

---
# Application service with metrics
apiVersion: v1
kind: Service
metadata:
  name: my-application
  namespace: production
  labels:
    app: my-application
spec:
  ports:
  - name: metrics
    port: 8080
    targetPort: 8080
  - name: http
    port: 80
    targetPort: 8000
  selector:
    app: my-application
/*

3. Grafana Dashboard ConfigMap:
* /
apiVersion: v1
kind: ConfigMap
metadata:
  name: kubernetes-dashboard
  namespace: monitoring
  labels:
    grafana_dashboard: "1"
data:
  kubernetes-cluster.json: |
    {
      "dashboard": {
        "title": "Kubernetes Cluster Monitoring",
        "panels": [
          {
            "title": "CPU Usage",
            "targets": [
              {
                "expr": "sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)"
              }
            ]
          },
          {
            "title": "Memory Usage",
            "targets": [
              {
                "expr": "sum(container_memory_usage_bytes) by (pod)"
              }
            ]
          }
        ]
      }
    }
/*

4. Multi-cluster monitoring:
* /
# Central Grafana instance
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-multi-cluster
data:
  datasources.yml: |
    apiVersion: 1
    datasources:
      - name: Prometheus-Cluster-1
        type: prometheus
        url: https://prometheus-cluster1.example.com
        isDefault: true
        
      - name: Prometheus-Cluster-2
        type: prometheus
        url: https://prometheus-cluster2.example.com
        
      - name: Prometheus-Cluster-3
        type: prometheus
        url: https://prometheus-cluster3.example.com
/*

5. Loki Integration (Logs):
* /
# Install Loki
helm install loki grafana/loki-stack \
  --namespace monitoring \
  --set grafana.enabled=false \
  --set promtail.enabled=true

# Grafana data source
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-loki-datasource
data:
  loki.yml: |
    apiVersion: 1
    datasources:
      - name: Loki
        type: loki
        url: http://loki.monitoring.svc.cluster.local:3100
        access: proxy
        jsonData:
          maxLines: 1000
/*

6. Tempo Integration (Traces):
* /
# Tempo data source
apiVersion: 1
datasources:
  - name: Tempo
    type: tempo
    url: http://tempo.monitoring.svc.cluster.local:3100
    access: proxy
    jsonData:
      tracesToLogs:
        datasourceUid: loki
        tags: ['job', 'instance', 'pod', 'namespace']
      serviceMap:
        datasourceUid: prometheus
/*

7. Cloud Provider Integration:

AWS CloudWatch:
* /
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-cloudwatch
data:
  cloudwatch.yml: |
    apiVersion: 1
    datasources:
      - name: CloudWatch
        type: cloudwatch
        jsonData:
          authType: default
          defaultRegion: us-east-1
        secureJsonData:
          accessKey: ${AWS_ACCESS_KEY_ID}
          secretKey: ${AWS_SECRET_ACCESS_KEY}
/*

Azure Monitor:
* /
- name: Azure Monitor
  type: grafana-azure-monitor-datasource
  jsonData:
    azureAuthType: msi
    subscriptionId: your-subscription-id
/*

Google Cloud Monitoring:
* /
- name: Google Cloud Monitoring
  type: stackdriver
  jsonData:
    authenticationType: gce
    defaultProject: your-project-id
/*

8. GitOps with ArgoCD:
* /
# argocd-application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: grafana
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/k8s-monitoring
    targetRevision: main
    path: grafana
  destination:
    server: https://kubernetes.default.svc
    namespace: monitoring
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
/*

9. Best Practices for K8s Integration:

Resource Management:
* /
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
/*

High Availability:
* /
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: app
              operator: In
              values:
              - grafana
          topologyKey: kubernetes.io/hostname
/*

Security:
* /
# Use RBAC
apiVersion: v1
kind: ServiceAccount
metadata:
  name: grafana
  namespace: monitoring

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: grafana
rules:
- apiGroups: [""]
  resources:
  - nodes
  - pods
  - services
  verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: grafana
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: grafana
subjects:
- kind: ServiceAccount
  name: grafana
  namespace: monitoring

# Use Pod Security Policy
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: grafana-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'RunAsAny'
/*

Monitoring Stack Components:
* /
/*
Component           | Purpose                | Port
--------------------|------------------------|------
Grafana             | Visualization          | 3000
Prometheus          | Metrics storage        | 9090
Alertmanager        | Alert routing          | 9093
Loki                | Log aggregation        | 3100
Tempo               | Distributed tracing    | 3200
Node Exporter       | Host metrics           | 9100
kube-state-metrics  | K8s object metrics     | 8080
Promtail            | Log shipper            | 9080
* /
/*

10. Complete Observability Query Examples:

Kubernetes metrics:
* /
// Pod CPU usage
sum(rate(container_cpu_usage_seconds_total{namespace="production"}[5m])) by (pod)

// Pod memory usage
sum(container_memory_usage_bytes{namespace="production"}) by (pod)

// Pod restart count
kube_pod_container_status_restarts_total

// Node resource usage
(1 - sum(rate(node_cpu_seconds_total{mode="idle"}[5m])) by (instance) / 
 sum(rate(node_cpu_seconds_total[5m])) by (instance)) * 100
/*

Application logs (Loki):
* /
{namespace="production", app="backend"} |= "error"
{namespace="production"} | json | level="error"
/*

Distributed traces (Tempo):
* /
// Query traces by service
{service.name="api-gateway"}

// Filter by duration
{service.name="api-gateway"} && duration > 1s
/*

This completes all 25 Grafana interview questions with comprehensive answers.

*/
