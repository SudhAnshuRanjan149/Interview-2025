.PHONY: up down logs restart ps build test test-unit test-acceptance ingest-csv help

# ── Colours ───────────────────────────────────────────────────────────────────
GREEN  := \033[0;32m
YELLOW := \033[0;33m
NC     := \033[0m

# ── Core commands ─────────────────────────────────────────────────────────────

## up: Start all infrastructure and application services
up:
	@echo "$(GREEN)Starting fleet-maintenance-engine...$(NC)"
	cp -n .env.example .env 2>/dev/null || true
	docker compose up -d --build
	@echo "$(GREEN)Services started. Dashboard: http://localhost:3000$(NC)"
	@echo "$(GREEN)Ingestion API: http://localhost:8001$(NC)"
	@echo "$(GREEN)Dashboard API: http://localhost:8002$(NC)"

## down: Stop all services and remove containers
down:
	@echo "$(YELLOW)Stopping all services...$(NC)"
	docker compose down

## down-volumes: Stop all services and remove volumes (DESTROYS DATA)
down-volumes:
	@echo "$(YELLOW)Stopping all services and removing volumes...$(NC)"
	docker compose down -v

## logs: Tail logs from all services
logs:
	docker compose logs -f

## logs-svc: Tail logs from a specific service (make logs-svc SVC=ingestion-api)
logs-svc:
	docker compose logs -f $(SVC)

## restart: Restart a specific service (make restart SVC=rule-engine)
restart:
	docker compose restart $(SVC)

## ps: Show running containers with health status
ps:
	docker compose ps

## build: Rebuild all service images
build:
	docker compose build

# ── Testing ───────────────────────────────────────────────────────────────────

## test-unit: Run all unit tests (no external deps required)
test-unit:
	@echo "$(GREEN)Running unit tests...$(NC)"
	python3 -m pytest tests/unit/ -v --tb=short

## test-acceptance: Run full acceptance tests against running docker-compose stack
test-acceptance:
	@echo "$(GREEN)Running acceptance tests...$(NC)"
	python3 -m pytest tests/acceptance/ -v --tb=short

## test: Run all tests (unit + acceptance)
test: test-unit test-acceptance

# ── Data ──────────────────────────────────────────────────────────────────────

## ingest-csv: Manually run CSV batch ingestion (make ingest-csv FILE=data/service_records.csv)
ingest-csv:
	docker compose run --rm csv-ingestion python main.py --file /data/$(FILE)

## seed: Send sample telemetry events to the ingestion API
seed:
	@echo "$(GREEN)Sending sample telemetry events...$(NC)"
	@for event in $$(cat data/sample_telemetry.json | python3 -c "import sys,json; [print(json.dumps(e)) for e in json.load(sys.stdin)]"); do \
		curl -s -X POST http://localhost:8001/telemetry \
			-H "Content-Type: application/json" \
			-H "X-API-Key: $${API_KEY:-dev-api-key}" \
			-d "$$event"; \
		echo ""; \
	done

## check-topics: List Kafka topics
check-topics:
	docker exec fleet-kafka kafka-topics --bootstrap-server localhost:9092 --list

## check-db: Connect to Postgres (requires psql)
check-db:
	docker exec -it fleet-postgres psql -U fleet -d fleet_db

## check-redis: Connect to Redis CLI
check-redis:
	docker exec -it fleet-redis redis-cli

# ── Help ──────────────────────────────────────────────────────────────────────

## help: Show this help message
help:
	@echo "$(GREEN)Fleet Maintenance Engine — Available Commands$(NC)"
	@grep -E '^## ' Makefile | sed 's/## /  make /' | sort
