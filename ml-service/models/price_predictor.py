# ml-service/models/price_predictor.py
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timedelta
import xgboost as xgb

class PricePredictor:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def extract_features(self, data):
        """Extract features from historical transaction data"""
        if not data:
            return np.array([[50, 100, 5, 1, 0.5]])  # Default features
        
        df = pd.DataFrame(data)
        
        # Basic supply-demand features
        total_supply = df['quantity'].sum()
        total_demand = len(df)  # number of transactions
        avg_price = df['pricePerKg'].mean()
        price_volatility = df['pricePerKg'].std() if len(df) > 1 else 0
        
        # Time-based features
        recent_days = 3
        recent_data = df[df['createdAt'] >= (datetime.now() - timedelta(days=recent_days))]
        recent_supply = recent_data['quantity'].sum() if not recent_data.empty else 0
        
        # Market momentum (recent vs historical price)
        if not recent_data.empty:
            recent_avg_price = recent_data['pricePerKg'].mean()
            price_momentum = (recent_avg_price - avg_price) / avg_price if avg_price > 0 else 0
        else:
            price_momentum = 0
        
        # Supply-demand ratio
        supply_demand_ratio = total_supply / total_demand if total_demand > 0 else 1
        
        features = np.array([[
            avg_price,
            total_supply,
            total_demand,
            price_volatility,
            supply_demand_ratio,
            price_momentum,
            recent_supply
        ]])
        
        return features
    
    def train_model(self, features):
        """Train the model with available features"""
        # For demo purposes, create a simple rule-based model
        # In production, you would train on more historical data
        self.model = RandomForestRegressor(n_estimators=10, random_state=42)
        
        # Create dummy training data based on current features
        X_train = np.repeat(features, 10, axis=0)
        X_train += np.random.normal(0, 0.1, X_train.shape)  # Add noise
        
        # Generate target prices with some logic
        y_train = []
        for x in X_train:
            base_price = x[0]  # Current avg price
            supply_factor = max(0.8, min(1.2, 1.0 - (x[1] - 100) / 500))  # Supply adjustment
            demand_factor = max(0.9, min(1.1, 1.0 + (x[2] - 5) / 20))     # Demand adjustment
            momentum_factor = 1.0 + x[5] * 0.1  # Momentum adjustment
            
            predicted_price = base_price * supply_factor * demand_factor * momentum_factor
            y_train.append(max(10, predicted_price))  # Minimum price threshold
        
        self.model.fit(X_train, y_train)
        self.is_trained = True
    
    def predict(self, historical_data):
        """Predict price for next day"""
        features = self.extract_features(historical_data)
        
        if not self.is_trained:
            self.train_model(features)
        
        # Make prediction
        predicted_price = self.model.predict(features)[0]
        
        # Rule-based adjustments for supply-demand
        if historical_data:
            df = pd.DataFrame(historical_data)
            
            # Supply-demand logic
            avg_supply = df['quantity'].mean()
            num_deals = len(df)
            current_price = df['pricePerKg'].mean()
            
            # Adjust based on supply-demand fundamentals
            if avg_supply > 200:  # High supply
                predicted_price *= 0.95
            elif avg_supply < 50:  # Low supply
                predicted_price *= 1.05
            
            if num_deals > 10:  # High demand
                predicted_price *= 1.03
            elif num_deals < 3:  # Low demand
                predicted_price *= 0.97
        
        # Ensure reasonable bounds
        predicted_price = max(10, min(500, predicted_price))
        
        return {
            "price": round(predicted_price, 2),
            "confidence": 0.75,
            "features": {
                "supply_level": "medium",
                "demand_level": "medium",
                "price_trend": "stable"
            }
        }
