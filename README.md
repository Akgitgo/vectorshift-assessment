# VectorShift Frontend Technical Assessment

This project is a React-based pipeline builder that allows users to create, connect, and analyze workflow graphs. It includes a frontend built with React Flow and a backend built with FastAPI.

## Project Structure

The project is divided into two main components:
1. frontend: A React application for the visual pipeline builder.
2. backend: A FastAPI server for graph analysis and cycle detection.

## Features

- Reusable Node Abstraction: All nodes are built from a base component.
- Dynamic Text Node: Textareas automatically resize and detect variables in double brackets.
- Automatic Handle Generation: Handles are created dynamically when variables are typed in text nodes.
- Graph Analysis: The backend calculates node and edge counts and performs cycle detection using DFS.
- Visual Feedback: Custom styles and exit/entrance animations for nodes.
- Selection Tools: Select and delete nodes or edges directly from the canvas.

## Installation and Setup

### Frontend

1. Navigate to the frontend directory:
   cd frontend
2. Install dependencies:
   npm install
3. Start the development server:
   npm start

The frontend will be available at http://localhost:3000 or http://localhost:3001.

### Backend

1. Navigate to the backend directory:
   cd backend
2. Install dependencies:
   pip install fastapi uvicorn pydantic python-multipart
3. Start the server:
   python -m uvicorn main:app --reload

The backend will be available at http://localhost:8000.

## Usage

- Drag nodes from the top toolbar onto the canvas to add them to your pipeline.
- Connect nodes by dragging between their handles.
- Create dynamic variables in Text nodes using the {{variable_name}} syntax.
- Select nodes or edges and click Delete Selected to remove items.
- Click Submit Pipeline to analyze your graph and check for cycles.
