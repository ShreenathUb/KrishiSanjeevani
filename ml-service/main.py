# ml-service/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from models.price_predictor import PricePredictor
from utils.data_processor import DataProcessor

app = FastAPI(title="Krishi ML Service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
data_processor = DataProcessor()
price_predictor = PricePredictor()

@app.get("/")
async def root():
    return {"message": "Krishi ML Service is running"}

@app.get("/predict")
async def predict_price(commodity: str):
    try:
        # Get historical data
        historical_data = data_processor.get_commodity_data(commodity)
        
        if not historical_data:
            # If no data, return a default prediction
            return {
                "commodity": commodity,
                "predicted_price": 50.0,
                "confidence": 0.5,
                "message": "No historical data available, using default prediction"
            }
        
        # Make prediction
        prediction = price_predictor.predict(historical_data)
        
        return {
            "commodity": commodity,
            "predicted_price": prediction["price"],
            "confidence": prediction["confidence"],
            "features_used": prediction["features"]
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)