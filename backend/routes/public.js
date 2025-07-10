// backend/routes/public.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const axios = require('axios');

// Get public prices
router.get('/prices', async (req, res) => {
  try {
    // Get last 7 days of approved transactions
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const transactions = await Transaction.find({
      status: 'approved',
      createdAt: { $gte: sevenDaysAgo }
    });
    
    // Calculate average prices by commodity
    const commodityPrices = {};
    transactions.forEach(t => {
      if (!commodityPrices[t.commodity]) {
        commodityPrices[t.commodity] = { total: 0, count: 0, totalQty: 0 };
      }
      commodityPrices[t.commodity].total += t.pricePerKg;
      commodityPrices[t.commodity].count += 1;
      commodityPrices[t.commodity].totalQty += t.quantity;
    });
    
    const prices = [];
    for (const commodity in commodityPrices) {
      const avgPrice = commodityPrices[commodity].total / commodityPrices[commodity].count;
      
      // Get prediction from ML service
      let predictedPrice = avgPrice; // fallback
      try {
        const mlResponse = await axios.get(`http://localhost:8000/predict?commodity=${commodity}`);
        predictedPrice = mlResponse.data.predicted_price;
      } catch (error) {
        console.log('ML service unavailable, using fallback prediction');
      }
      
      prices.push({
        commodity,
        currentPrice: Math.round(avgPrice * 100) / 100,
        predictedPrice: Math.round(predictedPrice * 100) / 100,
        totalQuantity: commodityPrices[commodity].totalQty,
        dealCount: commodityPrices[commodity].count
      });
    }
    
    res.json({ success: true, prices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;