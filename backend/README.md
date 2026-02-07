# LearnSphere Backend (FastAPI + MongoDB)

## Prerequisites
- Python 3.11+
- MongoDB running locally (default: `mongodb://localhost:27017`)

## Setup (Windows / PowerShell)

### 1) Create and activate a virtual environment
```powershell
cd E:\backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 2) Install dependencies
```powershell
pip install -r requirements.txt
```

### 3) Configure environment
Update `.env` if needed:
- `MONGODB_URI`
- `DATABASE_NAME`

### 4) Run the server
```powershell
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## Endpoints
- `GET /`
- `GET /health`


- email id : admin@gmail.com
- password: Admin@123