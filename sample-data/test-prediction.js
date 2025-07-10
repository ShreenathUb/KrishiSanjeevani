// sample-data/test-prediction.js
const axios = require('axios');

const testPrediction = async () => {
  try {
    console.log('Testing ML prediction service...\n');
    
    const commodities = ['onion', 'tomato', 'potato', 'wheat', 'rice'];
    
    for (const commodity of commodities) {
      try {
        const response = await axios.get(`http://localhost:8000/predict?commodity=${commodity}`);
        const prediction = response.data;
        
        console.log(`${commodity.toUpperCase()}:`);
        console.log(`  Current Avg Price: ₹${prediction.current_avg_price}/kg`);
        console.log(`  Predicted Price: ₹${prediction.predicted_price}/kg`);
        console.log(`  Supply (Last 7 days): ${prediction.supply_info.total_quantity}kg`);
        console.log(`  Demand (Deals): ${prediction.demand_info.total_deals}`);
        console.log(`  Confidence: ${prediction.confidence}`);
        console.log('---');
      } catch (error) {
        console.log(`${commodity.toUpperCase()}: No data or prediction error`);
      }
    }

    console.log('\nTesting public prices API...');
    const publicResponse = await axios.get('http://localhost:5000/api/public/prices');
    console.log('Public prices response:', JSON.stringify(publicResponse.data, null, 2));

  } catch (error) {
    console.error('Error testing prediction:', error.message);
  }
};

// Run test after a delay to ensure services are running
setTimeout(testPrediction, 2000);