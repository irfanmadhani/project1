from fastapi import APIRouter, HTTPException
from typing import Dict, List
from app.services.reddit_service import RedditService
from app.services.sentiment_service import SentimentService

router = APIRouter()
reddit_service = RedditService()
sentiment_service = SentimentService()

@router.get("/analyze/{topic}")
async def analyze_topic(topic: str) -> Dict:
    """
    Analyze sentiment for a given topic
    """
    try:
        # Get posts from Reddit
        posts = reddit_service.search_posts(topic)
        
        if not posts:
            raise HTTPException(status_code=404, detail="No posts found for this topic")
        
        # Analyze sentiment
        analyzed_posts = sentiment_service.analyze_posts(posts)
        trend_data = sentiment_service.calculate_weekly_trend(analyzed_posts)
        
        # Get top posts by score
        top_posts = sorted(analyzed_posts, key=lambda x: x['score'], reverse=True)[:5]
        
        return {
            "topic": topic,
            "average_sentiment": trend_data['average_sentiment'],
            "trend_data": trend_data,
            "top_posts": top_posts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check() -> Dict:
    """
    Health check endpoint
    """
    return {"status": "healthy"} 