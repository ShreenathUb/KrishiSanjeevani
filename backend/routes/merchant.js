// backend/routes/merchant.js
const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');

// Register merchant
// backend/routes/merchant.js
router.post('/register', async (req, res) => {
  const { phone, name } = req.body;
  if (!phone || !name) {
    return res.status(400).json({ error: 'Phone and name are required' });
  }

  try {
    let merchant = await Merchant.findOne({ phone });

    if (!merchant) {
      merchant = new Merchant({ phone, name });
      await merchant.save();
    }

    res.json({ success: true, merchant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/by-phone/:phone', async (req, res) => {
  try {
    const merchant = await Merchant.findOne({ phone: req.params.phone });
    console.log("Request coming at merchant.js line 32 by phone ");
    if (!merchant) return res.status(404).json({ error: 'Merchant not found' });
    res.json(merchant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;