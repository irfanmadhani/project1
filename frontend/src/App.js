import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper,
  CircularProgress,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const analyzeTopic = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:8000/api/analyze/${encodeURIComponent(topic)}`);
      setData(response.data);
    } catch (err) {
      setError('Error analyzing topic. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatChartData = () => {
    if (!data?.trend_data) return [];
    
    return data.trend_data.dates.map((date, index) => ({
      date: new Date(date).toLocaleDateString(),
      sentiment: data.trend_data.sentiments[index]
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            Reddit Sentiment Analyzer
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="secondary">
            View the sentiment of a topic on Reddit from the past week
          </Typography>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Enter a topic"
                variant="outlined"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeTopic()}
                placeholder="e.g., Seattle Seahawks, Crypto, Climate Change"
              />
              <Button 
                variant="contained" 
                onClick={analyzeTopic}
                disabled={loading || !topic.trim()}
                size="large"
              >
                Analyze
              </Button>
            </Box>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {data && (
              <>
                <Typography variant="h5" gutterBottom>
                  Analysis Results for: {data.topic}
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  Average Sentiment: {data.average_sentiment.toFixed(2)}
                  {
                  data.average_sentiment > 0 ? data.average_sentiment > 0.5 ? ' (Very Positive)' : ' (Somewhat Positive)' 
                  : data.average_sentiment < -0.5 ? ' (Very Negative)' : ' (Somewhat Negative)'
                  }
                </Typography>

                <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Sentiment Score Guide:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2">
                      <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Very Negative (-1.0 to -0.5):</span> Strongly negative sentiment, often expressing anger, frustration, or strong disagreement
                    </Typography>
                    <Typography variant="body2">
                      <span style={{ color: '#f57c00', fontWeight: 'bold' }}>Somewhat Negative (-0.5 to 0):</span> Mildly negative sentiment, expressing concern, skepticism, or slight dissatisfaction
                    </Typography>
                    <Typography variant="body2">
                      <span style={{ color: '#757575', fontWeight: 'bold' }}>Neutral (0):</span> Balanced or factual statements without clear positive or negative sentiment
                    </Typography>
                    <Typography variant="body2">
                      <span style={{ color: '#4caf50', fontWeight: 'bold' }}>Somewhat Positive (0 to 0.5):</span> Mildly positive sentiment, expressing optimism, interest, or slight approval
                    </Typography>
                    <Typography variant="body2">
                      <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>Very Positive (0.5 to 1.0):</span> Strongly positive sentiment, expressing enthusiasm, strong approval, or excitement
                    </Typography>
                  </Box>
                </Paper>

                <Box sx={{ height: 400, mb: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: 'Sentiment', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="sentiment" 
                        stroke="#1976d2" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>

                <Typography variant="h6" gutterBottom>
                  View the most influential and voted on posts and their sentiment scores:
                </Typography>
                {data.top_posts.map((post, index) => (
                  <Paper key={post.id} sx={{ p: 2, mb: 1 }}>
                    <Typography variant="body1">
                      {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Score: {post.score} | Sentiment: {post.sentiment_score.toFixed(2)}
                    </Typography>
                  </Paper>
                ))}
              </>
            )}
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
