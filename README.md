# React Flow

This project consists of a backend and frontend. Follow the instructions below to set up and run the application.

## Getting Started

### Prerequisites

- Python (for backend)
- Node.js and npm (for frontend)

### Backend Setup

1. **Navigate to the backend directory**  
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**  
   - On macOS/Linux:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

3. **Install the required dependencies**  
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server**  
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. **Navigate to the frontend directory**  
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**  
   ```bash
   npm install
   ```

3. **Start the frontend application**  
   ```bash
   npm start
   ```

### Additional Notes

- Ensure that both the backend and frontend servers are running concurrently.
- The backend server typically runs on `http://127.0.0.1:8000` and the frontend on `http://localhost:3000`.

---

Feel free to reach out if you encounter any issues!
