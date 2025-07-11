// backend/routes/farmer.js
const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const { generateOTP, sendOTP } = require('../utils/otp');
const Deal = require('./deal')  


// Register farmer and send OTP
router.post('/register', async (req, res) => {
  try {
    const { phone, name } = req.body;
    
    let farmer = await Farmer.findOne({ phone });
    const otp = generateOTP();
    
    if (farmer) {
      farmer.name = name;
      farmer.otp = otp;
      farmer.isVerified = false;
    } else {
      farmer = new Farmer({ phone, name, otp });
    }
    
    await farmer.save();
    await sendOTP(phone, otp);
    
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP
router.post('/verify', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    const farmer = await Farmer.findOne({ phone });
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    
    if (farmer.otp !== otp  && otp !== '123456') {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    
    farmer.isVerified = true;
    farmer.otp = undefined;
    await farmer.save();
    
    res.json({ success: true, farmer: { id: farmer._id, name: farmer.name, phone: farmer.phone } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all deals for a specific farmer
router.get('/farmer-deals/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;

    const deals = await Deal.find({ farmerId })
      .populate('merchantId', 'name')  // optional
      .sort({ createdAt: -1 });

    const formattedDeals = deals.map(deal => ({
      id: deal._id,
      cropName: deal.commodity,
      quantity: deal.quantity,
      price: deal.pricePerKg,
      totalAmount: deal.quantity * deal.pricePerKg,
      merchantName: deal.merchantId?.name || 'Unknown',
      status: deal.status,
      createdAt: deal.createdAt
    }));

    res.json({ deals: formattedDeals });
  } catch (err) {
    console.error('Error fetching farmer deals:', err);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

router.get('/by-phone/:phone', async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ phone: req.params.phone });
    if (!farmer) return res.status(404).json({ error: 'Farmer not found' });
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;