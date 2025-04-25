from transformers import pipeline
from typing import List, Dict
import numpy as np
from datetime import datetime, timedelta

class SentimentService:
    def __init__(self):
        self.sentiment_analyzer = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )
    
    def analyze_sentiment(self, text: str) -> float:
        """
        Analyze sentiment of a single text
        Returns a score between -1 (negative) and 1 (positive)
        """
        result = self.sentiment_analyzer(text)[0]
        score = 1 if result['label'] == 'POSITIVE' else -1
        return score * result['score']
    
    def analyze_posts(self, posts: List[Dict]) -> List[Dict]:
        """
        Analyze sentiment of multiple posts and add sentiment scores
        """
        analyzed_posts = []
        for post in posts:
            sentiment_score = self.analyze_sentiment(post['title'])
            analyzed_post = post.copy()
            analyzed_post['sentiment_score'] = sentiment_score
            analyzed_posts.append(analyzed_post)
        return analyzed_posts
    
    def calculate_weekly_trend(self, posts: List[Dict]) -> Dict:
        """
        Calculate sentiment trend over the past week
        """
        # Group posts by day
        daily_sentiments = {}
        for post in posts:
            post_date = datetime.fromtimestamp(post['created_utc']).date()
            if post_date not in daily_sentiments:
                daily_sentiments[post_date] = []
            daily_sentiments[post_date].append(post['sentiment_score'])
        
        # Calculate average sentiment per day
        trend_data = {
            'dates': [],
            'sentiments': [],
            'average_sentiment': 0
        }
        
        total_sentiment = 0
        total_posts = 0
        
        for date, sentiments in sorted(daily_sentiments.items()):
            avg_sentiment = np.mean(sentiments)
            trend_data['dates'].append(date.isoformat())
            trend_data['sentiments'].append(avg_sentiment)
            total_sentiment += sum(sentiments)
            total_posts += len(sentiments)
        
        if total_posts > 0:
            trend_data['average_sentiment'] = total_sentiment / total_posts
        
        return trend_data 