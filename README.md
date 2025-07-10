# Krishi-Sanjeevani 

A minimal full-stack MVP for farmer-merchant agri-deal management with ML-based price prediction.

## 🚀 Features

- **Farmer Registration**: OTP-based phone verification
- **Merchant Registration**: Simple registration with location
- **Deal Creation**: Merchants post buy offers (commodity, quantity, price)
- **Deal Approval**: Farmers approve deals using OTP
- **Price Prediction**: ML service predicts tomorrow's prices based on last 7 days of transactions
- **Public Prices**: Anyone can view current and predicted prices without login

## 🛠️ Tech Stack

- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Frontend**: React + Vite + TailwindCSS + React Router
- **ML Service**: Python + FastAPI + XGBoost + Pandas
- **Database**: MongoDB
- **DevOps**: Docker + docker-compose

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   ML Service    │
│   (React)       │───▶│   (Express)     │───▶│   (FastAPI)     │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 8000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   MongoDB       │
                       │   Port: 27017   │
                       └─────────────────┘
```

## 📦 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for development)
- Python 3.9+ (for development)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd krishi-sanjeevani
```

### 2. Start All Services

```bash
# Build and start all containers
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 3. Wait for Services to Start

The services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **ML Service**: http://localhost:8000
- **MongoDB**: mongodb://localhost:27017

### 4. Seed Sample Data

```bash
# Install dependencies for seeding
cd sample-data
npm install

# Seed the database with sample data
npm run seed

# Test ML predictions
npm run test
```

### 5. Access the Application

- **Public Prices**: http://localhost:3000 (no login required)
- **Farmer Registration**: http://localhost:3000/farmer-register
- **Merchant Registration**: http://localhost:3000/merchant-register
- **Create Deal**: http://localhost:3000/merchant-deal

## 🔧 Development Setup

### Backend Development
```bash
cd backend
npm install
npm run dev  # Runs on port 5000
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev  # Runs on port 3000
```

### ML Service Development
```bash
cd ml-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## 📱 Usage Flow

### For Farmers:
1. Register at `/farmer-register` with name and phone
2. Verify OTP (any 6-digit number works in demo)
3. Browse available deals (shared via link)
4. Approve deals at `/farmer-approve/:dealId` using OTP

### For Merchants:
1. Register at `/merchant-register` with name, phone, and location
2. Create deals at `/merchant-deal` with commodity, quantity, and price
3. Share deal link with farmers

### For Public:
1. View current and predicted prices at `/prices`
2. No registration required

## 🔑 API Endpoints

### Farmer APIs
- `POST /api/farmer/register` - Register farmer and send OTP
- `POST /api/farmer/verify` - Verify OTP

### Merchant APIs
- `POST /api/merchant/register` - Register merchant

### Deal APIs
- `POST /api/deal/create` - Create new deal
- `GET /api/deal/:id` - Get deal details
- `POST /api/deal/:id/approve` - Approve deal with OTP

### Public APIs
- `GET /api/public/prices` - Get current and predicted prices

### ML Service APIs
- `GET /predict?commodity=onion` - Get price prediction for commodity

## 🗃️ Database Schema

### Farmers Collection
```javascript
{
  phone: String (unique),
  name: String,
  otp: String,
  isVerified: Boolean,
  createdAt: Date
}
```

### Merchants Collection
```javascript
{
  phone: String (unique),
  name: String,
  location: String,
  createdAt: Date
}
```

### Transactions Collection
```javascript
{
  merchantId: ObjectId,
  farmerId: ObjectId,
  commodity: String,
  quantity: Number,
  pricePerKg: Number,
  location: String,
  status: String (pending/approved/rejected),
  createdAt: Date
}
```

## 🤖 ML Price Prediction

The ML service uses a simple but effective approach:

1. **Data Collection**: Fetches last 7 days of approved transactions
2. **Feature Engineering**: 
   - Supply = Total quantity traded
   - Demand = Number of deals
   - Average price = Mean of all transactions
3. **Model**: XGBoost regression with supply-demand features
4. **Fallback**: Rule-based prediction if insufficient data

### Prediction Logic
```python
# If sufficient data (>= 3 transactions)
predicted_price = model.predict(supply, demand, avg_price)

# If insufficient data
predicted_price = last_known_price * (1 + random_factor)
```

## 🔒 Security Notes

- OTP system is mocked for demo (any 6-digit number works)
- No authentication tokens - uses phone-based verification
- In production, implement proper SMS service and JWT tokens

## 🐳 Docker Services

### docker-compose.yml includes:
- **mongodb**: MongoDB database
- **backend**: Node.js Express server
- **frontend**: React app served via Nginx
- **ml-service**: Python FastAPI service

### Individual Dockerfiles:
- `backend/Dockerfile`: Node.js 18 Alpine
- `frontend/Dockerfile`: Multi-stage build with Nginx
- `ml-service/Dockerfile`: Python 3.9 slim

## 🧪 Testing

### Test Sample Data
```bash
cd sample-data
npm install
npm run seed    # Seeds database
npm run test    # Tests ML predictions
```

### Test ML Service Directly
```bash
curl "http://localhost:8000/predict?commodity=onion"
```

### Test Backend APIs
```bash
# Register farmer
curl -X POST http://localhost:5000/api/farmer/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Farmer", "phone": "+919999999999"}'

# Create deal
curl -X POST http://localhost:5000/api/deal/create \
  -H "Content-Type: application/json" \
  -d '{"merchantPhone": "+919876543220", "commodity": "onion", "quantity": 100, "pricePerKg": 25, "location": "Test Location"}'
```

## 🔧 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   ```bash
   docker-compose down
   docker-compose up --build
   ```

2. **ML Service Not Starting**
   ```bash
   docker-compose logs ml-service
   ```

3. **Frontend Build Issues**
   ```bash
   cd frontend
   rm -rf node_modules
   npm install
   npm run build
   ```

4. **Port Conflicts**
   - Change ports in docker-compose.yml
   - Default ports: 3000 (frontend), 5000 (backend), 8000 (ML), 27017 (MongoDB)

## 📊 Sample Data

The seed script creates:
- 3 verified farmers
- 3 merchants
- 20+ transactions over the last 7 days
- Covers commodities: onion, tomato, potato, wheat, rice

## 🔄 Development Workflow

1. **Start services**: `docker-compose up --build`
2. **Seed data**: `cd sample-data && npm run seed`
3. **Test predictions**: `npm run test`
4. **Access frontend**: http://localhost:3000
5. **View prices**: Public prices page shows current and predicted prices

## 🚀 Production Deployment

For production deployment:

1. **Environment Variables**: Set proper MongoDB connection strings
2. **SSL/TLS**: Add HTTPS support
3. **SMS Service**: Integrate real SMS API (Twilio, AWS SNS)
4. **Authentication**: Implement JWT tokens
5. **Rate Limiting**: Add API rate limiting
6. **Monitoring**: Add health checks and logging
7. **ML Model**: Train with real historical data

## 📝 API Response Examples

### Get Public Prices
```json
{
  "data": [
    {
      "commodity": "onion",
      "avgPrice": 25.50,
      "predictedPrice": 26.20,
      "transactionCount": 5
    },
    {
      "commodity": "tomato",
      "avgPrice": 30.00,
      "predictedPrice": 28.80,
      "transactionCount": 3
    }
  ]
}
```

### ML Prediction Response
```json
{
  "commodity": "onion",
  "predicted_price": 26.20,
  "current_avg_price": 25.50,
  "confidence": "medium",
  "supply_info": {
    "total_quantity": 2500,
    "avg_quantity_per_deal": 500
  },
  "demand_info": {
    "total_deals": 5,
    "avg_deals_per_day": 0.7
  }
}
```

## 🎯 Future Enhancements

- Real-time price updates using WebSocket
- Advanced ML models (LSTM, Prophet)
- Weather data integration
- Mobile app (React Native)
- Geolocation-based deals
- Payment integration
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for farmers and merchants**