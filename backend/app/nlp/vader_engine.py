from typing import Dict, Any, Tuple
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

class VaderSentimentEngine:
    def __init__(self):
        self._ensure_vader_lexicon()
        self.analyzer = SentimentIntensityAnalyzer()

    def _ensure_vader_lexicon(self):
        try:
            nltk.data.find("sentiment/vader_lexicon.zip")
        except LookupError:
            nltk.download("vader_lexicon", quiet=True)

    def analyze(self, text: str) -> Tuple[Dict[str, float], str, str]:
        """
        Runs VADER sentiment analysis on text.
        Returns:
            scores: Dict with 'pos', 'neg', 'neu', 'compound'
            sentiment_tag: 'Positive' | 'Neutral' | 'Negative'
            emotion_summary: Descriptive summary string
        """
        if not text or not text.strip():
            scores = {"neg": 0.0, "neu": 1.0, "pos": 0.0, "compound": 0.0}
            return scores, "Neutral", "No emotional expression detected in empty input."

        scores = self.analyzer.polarity_scores(text)
        compound = scores["compound"]

        # Standard VADER thresholding
        if compound >= 0.05:
            sentiment_tag = "Positive"
            if compound >= 0.6:
                summary = "Strongly uplifting and enthusiastic tone."
            else:
                summary = "Generally optimistic and satisfied tone."
        elif compound <= -0.05:
            sentiment_tag = "Negative"
            if compound <= -0.6:
                summary = "High distress or significant dissatisfaction detected."
            else:
                summary = "Mild concern, stress, or dissatisfaction indicated."
        else:
            sentiment_tag = "Neutral"
            summary = "Balanced, objective, or neutral emotional tone."

        return scores, sentiment_tag, summary

vader_engine = VaderSentimentEngine()
