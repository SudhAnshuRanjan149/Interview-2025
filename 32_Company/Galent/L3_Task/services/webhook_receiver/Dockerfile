FROM python:3.12-slim
WORKDIR /app
COPY services/webhook_receiver/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/webhook_receiver .
RUN useradd -m appuser && chown -R appuser /app
USER appuser
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
