export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  problemStatement: string;
  keyFeatures: string[];
  techStack: string[];
  githubUrl?: string;
  hasCaseStudy: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "RAG-Based Chat with PDFs",
    shortDescription: "A retrieval-augmented generation system that enables conversational Q&A over PDF documents using vector embeddings and semantic search.",
    problemStatement: "Enabling efficient question-answering over large PDF documents without requiring full document parsing for each query.",
    keyFeatures: [
      "Implemented document chunking strategy with overlap handling for context preservation",
      "Built vector embedding pipeline using OpenAI embeddings stored in ChromaDB",
      "Designed semantic search retrieval system with configurable top-k results",
      "Integrated LangChain for chain orchestration and prompt management",
      "Developed FastAPI endpoints for document upload, embedding, and query processing"
    ],
    techStack: [
      "Python",
      "LangChain",
      "OpenAI API",
      "ChromaDB",
      "FastAPI",
      "PyPDF2"
    ],
    githubUrl: "https://github.com/yourusername/rag-pdf-chat",
    hasCaseStudy: true,
  },
  {
    id: "2",
    title: "OCR-Based Document Extraction Pipeline",
    shortDescription: "An end-to-end OCR pipeline for extracting structured data from scanned documents with preprocessing, text extraction, and validation.",
    problemStatement: "Automating text extraction from scanned documents with varying quality and formats while maintaining accuracy.",
    keyFeatures: [
      "Implemented image preprocessing pipeline with noise reduction and contrast enhancement",
      "Integrated Tesseract OCR with custom configuration for improved accuracy",
      "Built data validation layer to verify extracted text against expected patterns",
      "Designed PostgreSQL schema for storing extracted data and metadata",
      "Created FastAPI service with async processing for batch document handling"
    ],
    techStack: [
      "Python",
      "Tesseract OCR",
      "OpenCV",
      "FastAPI",
      "PostgreSQL",
      "Pillow"
    ],
    githubUrl: "https://github.com/yourusername/ocr-extraction-pipeline",
    hasCaseStudy: false,
  },
  {
    id: "3",
    title: "Odia Alpha-Numeric Character Recognition",
    shortDescription: "A custom CNN-based OCR model for recognizing Odia script characters and digits, trained on a curated dataset with data augmentation.",
    problemStatement: "Building an accurate OCR system for Odia script where existing solutions have limited support and low accuracy.",
    keyFeatures: [
      "Collected and curated dataset of 10K+ Odia character images across multiple fonts",
      "Implemented data augmentation pipeline with rotation, scaling, and noise injection",
      "Designed CNN architecture with batch normalization and dropout for regularization",
      "Trained model achieving 94% accuracy on test set with transfer learning approach",
      "Built inference API with image preprocessing and post-processing for character segmentation"
    ],
    techStack: [
      "Python",
      "PyTorch",
      "OpenCV",
      "NumPy",
      "FastAPI",
      "Pillow"
    ],
    githubUrl: "https://github.com/yourusername/odia-ocr",
    hasCaseStudy: true,
  },
  {
    id: "4",
    title: "Stock Price Prediction using LSTM",
    shortDescription: "A time series forecasting model using LSTM networks to predict stock prices with feature engineering and sequence modeling.",
    problemStatement: "Predicting stock price movements using historical data with consideration for temporal dependencies and market volatility.",
    keyFeatures: [
      "Preprocessed time series data with normalization and feature scaling",
      "Engineered features including moving averages, RSI, and volume indicators",
      "Implemented LSTM architecture with attention mechanism for sequence learning",
      "Designed sliding window approach for sequence generation and prediction",
      "Built evaluation framework with metrics including MAPE and directional accuracy"
    ],
    techStack: [
      "Python",
      "PyTorch",
      "Pandas",
      "NumPy",
      "FastAPI",
      "yfinance"
    ],
    githubUrl: "https://github.com/yourusername/lstm-stock-prediction",
    hasCaseStudy: false,
  },
];
