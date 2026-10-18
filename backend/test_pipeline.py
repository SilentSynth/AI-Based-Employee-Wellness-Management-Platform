import sys
sys.stdout.reconfigure(encoding="utf-8")
from app.nlp.preprocessor import preprocessor
from app.nlp.vader_engine import vader_engine

def test_pipeline():
    print("Testing Preprocessing & VADER Sentiment Pipeline...")
    samples = [
        ("I love working here! The team is incredibly supportive and productive. 🎉", "Positive"),
        ("Today was routine. Completed the task requirements as specified.", "Neutral"),
        ("I am feeling exhausted, burned out, and deeply frustrated with management.", "Negative")
    ]

    all_passed = True
    for text, expected in samples:
        cleaned = preprocessor.clean_text(text)
        scores, tag, summary = vader_engine.analyze(cleaned)
        print(f"\nRaw: {text}")
        print(f"Cleaned: {cleaned}")
        print(f"Scores: {scores}")
        print(f"Tag: {tag} (Expected: {expected})")
        print(f"Summary: {summary}")

        if tag != expected:
            print(f"FAILED: Expected {expected}, got {tag}")
            all_passed = False
        else:
            print("PASSED")

    # Test file extractors
    print("\nTesting TXT extractor...")
    txt_bytes = "Employee pulse check: everything is smooth.".encode("utf-8")
    txt_extracted = preprocessor.extract_from_txt(txt_bytes)
    assert "smooth" in txt_extracted, "TXT extraction failed"
    print("TXT extractor PASSED")

    print("\nTesting CSV extractor...")
    csv_bytes = "id,feedback\n1,Great atmosphere\n2,Too much overtime\n".encode("utf-8")
    csv_extracted = preprocessor.extract_from_csv(csv_bytes)
    assert "Great atmosphere" in csv_extracted, "CSV extraction failed"
    print("CSV extractor PASSED")

    if all_passed:
        print("\nAll NLP Pipeline Unit Tests Passed Successfully! [OK]")
    else:
        sys.exit(1)

if __name__ == "__main__":
    test_pipeline()
