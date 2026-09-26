FROM python:3.12-slim
WORKDIR /app
COPY services/csv_ingestion/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/csv_ingestion .
COPY shared /app/shared
RUN useradd -m appuser && chown -R appuser /app
USER appuser
ENTRYPOINT ["python", "main.py"]
