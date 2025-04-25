from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.endpoints import router as api_router

app = FastAPI(title="Reddit Sentiment Analyzer")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api")

# Mount static files for frontend
app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")

@app.get("/")
async def root():
    return {"message": "Welcome to Reddit Sentiment Analyzer API"} 