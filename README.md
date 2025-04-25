# Reddit Sentiment Analyzer

A web application that analyzes sentiment trends around topics using Reddit post titles. The application provides real-time sentiment analysis, trend visualization, and displays the most influential posts related to any topic.

## Features
- Real-time sentiment analysis of Reddit post titles
- Weekly sentiment trend tracking
- Interactive sentiment visualization
- Top posts display with sentiment scores
- Detailed sentiment score guide

## Prerequisites

### Required Software
1. **Python 3.11**
   - Download from: https://www.python.org/downloads/release/python-3116/
   - During installation, check "Add Python to PATH"

2. **Node.js and npm**
   - Download from: https://nodejs.org/
   - This will install both Node.js and npm

3. **Reddit API Credentials**
   - Create a Reddit application at: https://www.reddit.com/prefs/apps
   - Note down your client ID and client secret

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Set Up Backend

1. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\Activate.ps1

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with your Reddit credentials:
```
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USER_AGENT=your_app_name:v1.0 (by /u/your_reddit_username)
```

### 3. Set Up Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install JavaScript dependencies:
```bash
npm install
```

## Running the Application

### 1. Start the Backend Server
Open a terminal and run:
```bash
# Activate virtual environment if not already activated
.\venv\Scripts\Activate.ps1  # Windows
source venv/bin/activate     # macOS/Linux

# Start the FastAPI server
uvicorn app.main:app --reload
```
The backend will be available at: http://localhost:8000

### 2. Start the Frontend Development Server
Open another terminal and run:
```bash
cd frontend
npm start
```
The frontend will automatically open in your browser at: http://localhost:3000

## Using the Application

1. Enter a topic in the search box (e.g., "Bitcoin", "AI", "Climate Change")
2. Click "Analyze" or press Enter
3. View the sentiment analysis results:
   - Average sentiment score
   - Sentiment trend chart
   - Top posts with their sentiment scores
   - Sentiment score guide

## Troubleshooting

### Common Issues

1. **Module Not Found Errors**
   - Make sure you've activated the virtual environment
   - Try reinstalling requirements: `pip install -r requirements.txt`

2. **Frontend Connection Issues**
   - Make sure both backend and frontend servers are running
   - Check that you're using the correct ports (8000 for backend, 3000 for frontend)

### Getting Help
If you encounter any issues not covered here, please:
1. Check the console for error messages
2. Verify all prerequisites are installed correctly
3. Ensure all environment variables are set properly

## Tech Stack

### Backend
- Python 3.11
- FastAPI
- PRAW (Python Reddit API Wrapper)
- Transformers (Hugging Face)
- SQLite

### Frontend
- React
- Material-UI
- Recharts
- Axios

