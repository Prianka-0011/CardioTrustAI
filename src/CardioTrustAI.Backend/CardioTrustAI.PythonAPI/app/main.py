
from fastapi import FastAPI

app = FastAPI(
    title="CardioTrustAI Python API",
    description="Python backend for ECG analysis",
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "message": "CardioTrustAI Python API is running",
        "status": "healthy",
    }


@app.get("/api/v1/ai/health")
def health_check():
    return {
        "service": "CardioTrustAI AI Backend",
        "status": "healthy",
    }
