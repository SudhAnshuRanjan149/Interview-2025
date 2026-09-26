FROM python:3.12-slim

WORKDIR /app

COPY services/rule_engine/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY services/rule_engine .
COPY shared /app/shared

RUN useradd -m appuser && chown -R appuser /app
USER appuser

CMD ["python", "main.py"]
