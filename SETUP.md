# Lead-to-CRM Automation Platform - Setup Guide

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 15+ (optional - can use Docker)
- **Redis** 7+ (optional - can use Docker)
- **Docker** and Docker Compose (recommended)

## Option 1: Docker (Recommended)

The fastest way to get started:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Option 2: Local Development

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Start the server
uvicorn main:app --reload
```

Backend will run at: http://localhost:8000

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

Frontend will run at: http://localhost:3000 (or http://localhost:5173 with Vite)

## 🗄️ Database Setup

### Using Docker (Recommended)

```bash
docker-compose up -d postgres redis
```

### Manual Setup

1. **PostgreSQL**:
```sql
CREATE DATABASE leadcrm;
CREATE USER leadcrm WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE leadcrm TO leadcrm;
```

2. **Redis**:
```bash
# Install Redis
brew install redis  # macOS
# or
apt-get install redis-server  # Ubuntu

# Start Redis
redis-server
```

## 🔑 Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://leadcrm:password@localhost:5432/leadcrm
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 🏗️ Building for Production

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend

```bash
cd frontend
npm run build
# Build output in dist/
```

## 📦 Project Structure

```
Lead-to-CRM Automation Platform/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── data/         # Mock data and types
│   │   ├── lib/          # Utility functions
│   │   └── App.tsx       # Main app component
│   ├── package.json
│   └── vite.config.ts
│
├── backend/              # FastAPI + Python
│   ├── main.py          # Main API application
│   ├── requirements.txt
│   └── .env.example
│
├── docker/              # Docker configurations
├── docs/                # Documentation
├── docker-compose.yml   # Multi-container setup
└── README.md
```

## 🔧 Configuration

### Database Migrations

```bash
cd backend
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### Adding New Integrations

1. Add integration credentials to backend/.env
2. Create integration module in backend/integrations/
3. Add UI components in frontend/src/pages/IntegrationsPage.tsx
4. Update automation workflow nodes in frontend/src/pages/WorkflowBuilder.tsx

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Database Connection Issues

1. Check PostgreSQL is running: `pg_isready`
2. Verify credentials in .env
3. Check DATABASE_URL format

### Redis Connection Issues

1. Check Redis is running: `redis-cli ping`
2. Verify REDIS_URL in .env

### Frontend Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/docs/)

## 🆘 Support

For issues or questions:
- GitHub Issues: [Report a bug](#)
- Email: support@leadtocrm.com
- Discord: [Join community](#)

## 📝 License

MIT License - see LICENSE file for details
