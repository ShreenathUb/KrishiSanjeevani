# ml-service/utils/data_processor.py
import os
from pymongo import MongoClient
from datetime import datetime, timedelta
from typing import List, Dict

class DataProcessor:
    def __init__(self):
        self.mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/krishi-db')
        self.client = None
        self.db = None
        self.connect_to_db()
    
    def connect_to_db(self):
        """Connect to MongoDB"""
        try:
            self.client = MongoClient(self.mongo_uri)
            self.db = self.client['krishi-db']
            print("Connected to MongoDB")
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
    
    def get_commodity_data(self, commodity: str) -> List[Dict]:
        """Get historical data for a specific commodity"""
        try:
            # Get data from last 7 days
            seven_days_ago = datetime.now() - timedelta(days=7)
            
            # Query transactions collection
            transactions = self.db.transactions.find({
                'commodity': commodity,
                'status': 'approved',
                'createdAt': {'$gte': seven_days_ago}
            })
            
            data = []
            for transaction in transactions:
                data.append({
                    'commodity': transaction['commodity'],
                    'quantity': transaction['quantity'],
                    'pricePerKg': transaction['pricePerKg'],
                    'createdAt': transaction['createdAt']
                })
            
            return data
        
        except Exception as e:
            print(f"Error fetching data: {e}")
            return []
    
    def get_all_commodities(self) -> List[str]:
        """Get list of all commodities with transactions"""
        try:
            commodities = self.db.transactions.distinct('commodity', {'status': 'approved'})
            return commodities
        except Exception as e:
            print(f"Error fetching commodities: {e}")
            return []