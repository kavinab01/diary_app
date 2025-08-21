FROM python:3.12-slim AS base
WORKDIR /app
# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy the app folder
COPY ./app ./app
ENV PYTHONUNBUFFERED=1
EXPOSE 8000
# Run FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

