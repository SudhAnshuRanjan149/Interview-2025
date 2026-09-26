FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY services/ingestion_api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy service code
COPY services/ingestion_api .

# Copy shared library
COPY shared /app/shared

# Non-root user for security
RUN useradd -m appuser && chown -R appuser /app
USER appuser

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
