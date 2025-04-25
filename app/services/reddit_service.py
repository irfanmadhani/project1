import praw
from datetime import datetime, timedelta
from typing import List, Dict
from app.core.config import get_settings

settings = get_settings()

class RedditService:
    def __init__(self):
        self.reddit = praw.Reddit(
            client_id=settings.REDDIT_CLIENT_ID,
            client_secret=settings.REDDIT_CLIENT_SECRET,
            user_agent=settings.REDDIT_USER_AGENT
        )
    
    def search_posts(self, topic: str, time_filter: str = "week", limit: int = 100) -> List[Dict]:
        """
        Search for posts related to a topic in the past week
        """
        posts = []
        for submission in self.reddit.subreddit("all").search(
            query=topic,
            time_filter=time_filter,
            limit=limit
        ):
            posts.append({
                "id": submission.id,
                "title": submission.title,
                "score": submission.score,
                "created_utc": submission.created_utc,
                "subreddit": submission.subreddit.display_name,
                "url": submission.url
            })
        return posts
    
    def get_recent_posts(self, subreddit: str, limit: int = 25) -> List[Dict]:
        """
        Get recent posts from a specific subreddit
        """
        posts = []
        for submission in self.reddit.subreddit(subreddit).new(limit=limit):
            posts.append({
                "id": submission.id,
                "title": submission.title,
                "score": submission.score,
                "created_utc": submission.created_utc,
                "url": submission.url
            })
        return posts 