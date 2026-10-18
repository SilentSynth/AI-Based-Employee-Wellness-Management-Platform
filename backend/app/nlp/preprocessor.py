import re
import unicodedata
import io
import csv
from typing import Optional
from pypdf import PdfReader

class TextPreprocessor:
    @staticmethod
    def clean_text(text: str) -> str:
        """
        Cleans and standardizes input text:
        - Normalizes Unicode (NFKC)
        - Handles encoding artifacts and non-printable control characters
        - Strips HTML artifacts if any
        - Normalizes whitespace (preserves punctuation and capitalization needed by VADER)
        """
        if not text:
            return ""

        # Normalize unicode characters (e.g., smart quotes, accents, ligatures)
        text = unicodedata.normalize("NFKC", text)

        # Remove HTML tags if present
        text = re.sub(r"<[^>]+>", " ", text)

        # Remove control characters except standard line breaks and tabs
        text = "".join(ch for ch in text if ch == "\n" or ch == "\t" or not unicodedata.category(ch).startswith("C"))

        # Replace excessive whitespace while keeping paragraph structure
        lines = [re.sub(r"[ \t]+", " ", line).strip() for line in text.splitlines()]
        cleaned = "\n".join(line for line in lines if line)

        return cleaned.strip()

    @staticmethod
    def extract_from_txt(file_bytes: bytes) -> str:
        """Decodes text bytes handling multiple common encodings."""
        for encoding in ["utf-8", "utf-8-sig", "latin-1", "cp1252"]:
            try:
                return file_bytes.decode(encoding)
            except UnicodeDecodeError:
                continue
        return file_bytes.decode("utf-8", errors="replace")

    @staticmethod
    def extract_from_csv(file_bytes: bytes) -> str:
        """Extracts text content from uploaded CSV file."""
        content = TextPreprocessor.extract_from_txt(file_bytes)
        reader = csv.reader(io.StringIO(content))
        extracted_lines = []
        for row in reader:
            # Join non-empty cells
            row_text = " ".join([cell.strip() for cell in row if cell and cell.strip()])
            if row_text:
                extracted_lines.append(row_text)
        return "\n".join(extracted_lines)

    @staticmethod
    def extract_from_pdf(file_bytes: bytes) -> str:
        """Extracts text content from PDF file using pypdf."""
        reader = PdfReader(io.BytesIO(file_bytes))
        pages_text = []
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                pages_text.append(extracted)
        return "\n\n".join(pages_text)

preprocessor = TextPreprocessor()
