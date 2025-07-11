// // const express = require('express');
// // const router = express.Router();
// // const mongoose = require('mongoose');
// // const Transaction = require('../models/Transaction');
// // const Merchant = require('../models/Merchant');
// // const Farmer = require('../models/Farmer');
// // const { generateOTP, sendOTP } = require('../utils/otp');

// // // Helper function to validate ObjectId
// // const isValidObjectId = (id) => {
// //   return mongoose.Types.ObjectId.isValid(id);
// // };

// // router.post('/create', async (req, res) => {
// //   try {
// //     const { merchantId, commodity, quantity, pricePerKg } = req.body;
    
// //     // ❌ Removed isValidObjectId check

// //     const merchant = await Merchant.findById(merchantId);
// //     if (!merchant) {
// //       return res.status(404).json({ error: 'Merchant not found' });
// //     }

// //     const transaction = new Transaction({
// //       merchantId,
// //       commodity,
// //       quantity,
// //       pricePerKg
// //     });

// //     await transaction.save();

// //     res.json({ success: true, deal: transaction });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Get deal details
// // router.get('/:id', async (req, res) => {
// //   try {
// //     // Validate deal ID
// //     if (!isValidObjectId(req.params.id)) {
// //       return res.status(400).json({ error: 'Invalid deal ID format' });
// //     }
    
// //     const transaction = await Transaction.findById(req.params.id).populate('merchantId');
// //     if (!transaction) {
// //       return res.status(404).json({ error: 'Deal not found' });
// //     }
    
// //     res.json({ success: true, deal: transaction });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Get pending deals
// // router.get('/', async (req, res) => {
// //   try {
// //     const deals = await Transaction.find({ status: 'pending' })
// //       .populate('merchantId')
// //       .sort({ createdAt: -1 });
    
// //     res.json({ success: true, deals });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Get deals for a specific farmer
// // router.get('/farmer/:farmerId', async (req, res) => {
// //   try {
// //     // Validate farmer ID
// //     if (!isValidObjectId(req.params.farmerId)) {
// //       return res.status(400).json({ error: 'Invalid farmer ID format' });
// //     }
    
// //     const deals = await Transaction.find({ farmerId: req.params.farmerId })
// //       .populate('merchantId')
// //       .sort({ createdAt: -1 });
    
// //     res.json({ success: true, deals });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Get deals for a specific merchant
// // router.get('/merchant/:merchantId', async (req, res) => {
// //   try {
// //     // Validate merchant ID
// //     if (!isValidObjectId(req.params.merchantId)) {
// //       return res.status(400).json({ error: ' merchant ID format' });
// //     }
    
// //     const deals = await Transaction.find({ merchantId: req.params.merchantId })
// //       .populate('farmerId')
// //       .sort({ createdAt: -1 });
    
// //     res.json({ success: true, deals });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Approve deal with OTP
// // router.post('/:id/approve', async (req, res) => {
// //   try {
// //     const { farmerId, otp } = req.body;
    
// //     // Validate IDs
// //     if (!isValidObjectId(req.params.id)) {
// //       return res.status(400).json({ error: 'Invalid deal ID format' });
// //     }
    
// //     if (!isValidObjectId(farmerId)) {
// //       return res.status(400).json({ error: 'Invalid farmer ID format' });
// //     }
    
// //     // Check if farmer exists and is verified
// //     const farmer = await Farmer.findById(farmerId);
// //     if (!farmer) {
// //       return res.status(404).json({ error: 'Farmer not found' });
// //     }
    
// //     if (!farmer.isVerified) {
// //       return res.status(400).json({ error: 'Farmer is not verified' });
// //     }
    
// //     // Check if deal exists and is pending
// //     const transaction = await Transaction.findById(req.params.id);
// //     if (!transaction) {
// //       return res.status(404).json({ error: 'Deal not found' });
// //     }
    
// //     if (transaction.status !== 'pending') {
// //       return res.status(400).json({ error: 'Deal is not pending or already processed' });
// //     }
    
// //     // Check if deal is already assigned to another farmer
// //     if (transaction.farmerId && transaction.farmerId.toString() !== farmerId) {
// //       return res.status(400).json({ error: 'Deal is already assigned to another farmer' });
// //     }
    
// //     // For demo purposes, accept both generated OTP and demo OTP
// //     const isValidOTP = otp === '123456'; // Demo OTP
    
// //     // In production, you would generate and send OTP like this:
// //     // const approvalOTP = generateOTP();
// //     // console.log("OTP FOR FARMER APPROVAL:", approvalOTP);
// //     // await sendOTP(farmer.phone, approvalOTP);
// //     // const isValidOTP = otp === approvalOTP;
    
// //     if (isValidOTP) {
// //       transaction.status = 'approved';
// //       transaction.farmerId = farmerId;
// //       transaction.otpUsed = otp;
// //       transaction.approvedAt = new Date();
// //       await transaction.save();
      
// //       // Populate the updated transaction for response
// //       const populatedTransaction = await Transaction.findById(transaction._id)
// //         .populate('merchantId')
// //         .populate('farmerId');
      
// //       res.json({ 
// //         success: true, 
// //         message: 'Deal approved successfully', 
// //         deal: populatedTransaction 
// //       });
// //     } else {
// //       res.status(400).json({ error: 'Invalid OTP' });
// //     }
    
// //   } catch (error) {
// //     console.error('Error approving deal:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Reject deal
// // router.post('/:id/reject', async (req, res) => {
// //   try {
// //     const { farmerId, reason } = req.body;
    
// //     // Validate IDs
// //     if (!isValidObjectId(req.params.id)) {
// //       return res.status(400).json({ error: 'Invalid deal ID format' });
// //     }
    
// //     if (!isValidObjectId(farmerId)) {
// //       return res.status(400).json({ error: 'Invalid farmer ID format' });
// //     }
    
// //     // Check if farmer exists and is verified
// //     const farmer = await Farmer.findById(farmerId);
// //     if (!farmer) {
// //       return res.status(404).json({ error: 'Farmer not found' });
// //     }
    
// //     if (!farmer.isVerified) {
// //       return res.status(400).json({ error: 'Farmer is not verified' });
// //     }
    
// //     // Check if deal exists and is pending
// //     const transaction = await Transaction.findById(req.params.id);
// //     if (!transaction) {
// //       return res.status(404).json({ error: 'Deal not found' });
// //     }
    
// //     if (transaction.status !== 'pending') {
// //       return res.status(400).json({ error: 'Deal is not pending or already processed' });
// //     }
    
// //     transaction.status = 'rejected';
// //     transaction.rejectionReason = reason;
// //     transaction.rejectedBy = farmerId;
// //     transaction.rejectedAt = new Date();
// //     await transaction.save();
    
// //     // Populate the updated transaction for response
// //     const populatedTransaction = await Transaction.findById(transaction._id)
// //       .populate('merchantId')
// //       .populate('farmerId');
    
// //     res.json({ 
// //       success: true, 
// //       message: 'Deal rejected successfully', 
// //       deal: populatedTransaction 
// //     });
    
// //   } catch (error) {
// //     console.error('Error rejecting deal:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Transaction = require('../models/Transaction');
// const Merchant = require('../models/Merchant');
// const Farmer = require('../models/Farmer');
// const { generateOTP, sendOTP } = require('../utils/otp');

// // Helper function to validate ObjectId
// const isValidObjectId = (id) => {
//   return mongoose.Types.ObjectId.isValid(id);
// };

// // Create deal
// router.post('/create', async (req, res) => {
//   try {
//     const { merchantId, commodity, quantity, pricePerKg } = req.body;
    
//     // Validate merchantId
//     if (!isValidObjectId(merchantId)) {
//       return res.status(400).json({ error: 'Invalid merchant ID format' });
//     }
    
//     const merchant = await Merchant.findById(merchantId);
//     if (!merchant) {
//       console.log('Merchant not found in database'); // Debug log
//       return res.status(404).json({ error: 'Merchant not found' });
//     }
    
//     const transaction = new Transaction({
//       merchantId,
//       commodity,
//       quantity,
//       pricePerKg
//     });
    
//     await transaction.save();
    
//     res.json({ success: true, deal: transaction });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get deal details
// router.get('/:id', async (req, res) => {
//   try {
//     // Validate deal ID
//     if (!isValidObjectId(req.params.id)) {
//       return res.status(400).json({ error: 'Invalid deal ID format' });
//     }
    
//     const transaction = await Transaction.findById(req.params.id).populate('merchantId');
//     if (!transaction) {
//       return res.status(404).json({ error: 'Deal not found' });
//     }
    
//     res.json({ success: true, deal: transaction });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get pending deals
// router.get('/', async (req, res) => {
//   try {
//     const deals = await Transaction.find({ status: 'pending' })
//       .populate('merchantId')
//       .sort({ createdAt: -1 });
    
//     res.json({ success: true, deals });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get deals for a specific farmer
// router.get('/farmer/:farmerId', async (req, res) => {
//   try {
//     // Validate farmer ID
//     if (!isValidObjectId(req.params.farmerId)) {
//       return res.status(400).json({ error: 'Invalid farmer ID format' });
//     }
    
//     const deals = await Transaction.find({ farmerId: req.params.farmerId })
//       .populate('merchantId')
//       .sort({ createdAt: -1 });
    
//     res.json({ success: true, deals });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get deals for a specific merchant
// router.get('/merchant/:merchantId', async (req, res) => {
//   try {
//     // Validate merchant ID
//     if (!isValidObjectId(req.params.merchantId)) {
//       return res.status(400).json({ error: 'Invalid merchant ID format' });
//     }
    
//     const deals = await Transaction.find({ merchantId: req.params.merchantId })
//       .populate('farmerId')
//       .sort({ createdAt: -1 });
    
//     res.json({ success: true, deals });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Approve deal with OTP
// router.post('/:id/approve', async (req, res) => {
//   try {
//     const { farmerId, otp } = req.body;
    
//     // Validate IDs
//     if (!isValidObjectId(req.params.id)) {
//       return res.status(400).json({ error: 'Invalid deal ID format' });
//     }
    
//     if (!isValidObjectId(farmerId)) {
//       return res.status(400).json({ error: 'Invalid farmer ID format' });
//     }
    
//     // Check if farmer exists and is verified
//     const farmer = await Farmer.findById(farmerId);
//     if (!farmer) {
//       return res.status(404).json({ error: 'Farmer not found' });
//     }
    
//     if (!farmer.isVerified) {
//       return res.status(400).json({ error: 'Farmer is not verified' });
//     }
    
//     // Check if deal exists and is pending
//     const transaction = await Transaction.findById(req.params.id);
//     if (!transaction) {
//       return res.status(404).json({ error: 'Deal not found' });
//     }
    
//     if (transaction.status !== 'pending') {
//       return res.status(400).json({ error: 'Deal is not pending or already processed' });
//     }
    
//     // Check if deal is already assigned to another farmer
//     if (transaction.farmerId && transaction.farmerId.toString() !== farmerId) {
//       return res.status(400).json({ error: 'Deal is already assigned to another farmer' });
//     }
    
//     // For demo purposes, accept both generated OTP and demo OTP
//     const isValidOTP = otp === '123456'; // Demo OTP
    
//     // In production, you would generate and send OTP like this:
//     // const approvalOTP = generateOTP();
//     // console.log("OTP FOR FARMER APPROVAL:", approvalOTP);
//     // await sendOTP(farmer.phone, approvalOTP);
//     // const isValidOTP = otp === approvalOTP;
    
//     if (isValidOTP) {
//       transaction.status = 'approved';
//       transaction.farmerId = farmerId;
//       transaction.otpUsed = otp;
//       transaction.approvedAt = new Date();
//       await transaction.save();
      
//       // Populate the updated transaction for response
//       const populatedTransaction = await Transaction.findById(transaction._id)
//         .populate('merchantId')
//         .populate('farmerId');
      
//       res.json({ 
//         success: true, 
//         message: 'Deal approved successfully', 
//         deal: populatedTransaction 
//       });
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
    
//   } catch (error) {
//     console.error('Error approving deal:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Reject deal
// router.post('/:id/reject', async (req, res) => {
//   try {
//     const { farmerId, reason } = req.body;
    
//     // Validate IDs
//     if (!isValidObjectId(req.params.id)) {
//       return res.status(400).json({ error: 'Invalid deal ID format' });
//     }
    
//     if (!isValidObjectId(farmerId)) {
//       return res.status(400).json({ error: 'Invalid farmer ID format' });
//     }
    
//     // Check if farmer exists and is verified
//     const farmer = await Farmer.findById(farmerId);
//     if (!farmer) {
//       return res.status(404).json({ error: 'Farmer not found' });
//     }
    
//     if (!farmer.isVerified) {
//       return res.status(400).json({ error: 'Farmer is not verified' });
//     }
    
//     // Check if deal exists and is pending
//     const transaction = await Transaction.findById(req.params.id);
//     if (!transaction) {
//       return res.status(404).json({ error: 'Deal not found' });
//     }
    
//     if (transaction.status !== 'pending') {
//       return res.status(400).json({ error: 'Deal is not pending or already processed' });
//     }
    
//     transaction.status = 'rejected';
//     transaction.rejectionReason = reason;
//     transaction.rejectedBy = farmerId;
//     transaction.rejectedAt = new Date();
//     await transaction.save();
    
//     // Populate the updated transaction for response
//     const populatedTransaction = await Transaction.findById(transaction._id)
//       .populate('merchantId')
//       .populate('farmerId');
    
//     res.json({ 
//       success: true, 
//       message: 'Deal rejected successfully', 
//       deal: populatedTransaction 
//     });
    
//   } catch (error) {
//     console.error('Error rejecting deal:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const Merchant = require('../models/Merchant');
const Farmer = require('../models/Farmer');
const { generateOTP, sendOTP } = require('../utils/otp');

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// ===== SPECIFIC ROUTES MUST COME FIRST =====

// Create deal (POST /deal/create)
router.post('/create', async (req, res) => {
  try {
    const { merchantId, commodity, quantity, pricePerKg } = req.body;
    
    console.log('Creating deal with data:', { merchantId, commodity, quantity, pricePerKg });
    
    // Validate required fields
    if (!merchantId || !commodity || !quantity || !pricePerKg) {
      return res.status(400).json({ 
        error: 'Missing required fields: merchantId, commodity, quantity, pricePerKg' 
      });
    }
    
    // Validate merchantId
    if (!isValidObjectId(merchantId)) {
      return res.status(400).json({ error: 'Invalid merchant ID format' });
    }
    
    const merchant = await Merchant.findById(merchantId);
    if (!merchant) {
      console.log('Merchant not found in database for ID:', merchantId);
      return res.status(404).json({ error: 'Merchant not found' });
    }
    
    console.log('Merchant found:', merchant.name);
    
    const transaction = new Transaction({
      merchantId,
      commodity,
      quantity: Number(quantity),
      pricePerKg: Number(pricePerKg)
    });
    
    await transaction.save();
    console.log('Deal created successfully:', transaction._id);
    
    res.json({ success: true, deal: transaction });
  } catch (error) {
    console.error('Deal creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get pending deals (GET /deal)
router.get('/', async (req, res) => {
  try {
    const deals = await Transaction.find({ status: 'pending' })
      .populate('merchantId')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, deals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get deals for a specific farmer (GET /deal/farmer/:farmerId)
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    // Validate farmer ID
    if (!isValidObjectId(req.params.farmerId)) {
      return res.status(400).json({ error: 'Invalid farmer ID format' });
    }
    
    const deals = await Transaction.find({ farmerId: req.params.farmerId })
      .populate('merchantId')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, deals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get deals for a specific merchant (GET /deal/merchant/:merchantId)
router.get('/merchant/:merchantId', async (req, res) => {
  try {
    // Validate merchant ID
    if (!isValidObjectId(req.params.merchantId)) {
      return res.status(400).json({ error: 'Invalid merchant ID format' });
    }
    
    const deals = await Transaction.find({ merchantId: req.params.merchantId })
      .populate('farmerId')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, deals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve deal with OTP (POST /deal/:id/approve)
router.post('/:id/approve', async (req, res) => {
  try {
    const { farmerId, otp } = req.body;
    
    // Validate IDs
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid deal ID format' });
    }
    
    if (!isValidObjectId(farmerId)) {
      return res.status(400).json({ error: 'Invalid farmer ID format' });
    }
    
    // Check if farmer exists and is verified
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    
    if (!farmer.isVerified) {
      return res.status(400).json({ error: 'Farmer is not verified' });
    }
    
    // Check if deal exists and is pending
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    if (transaction.status !== 'pending') {
      return res.status(400).json({ error: 'Deal is not pending or already processed' });
    }
    
    // Check if deal is already assigned to another farmer
    if (transaction.farmerId && transaction.farmerId.toString() !== farmerId) {
      return res.status(400).json({ error: 'Deal is already assigned to another farmer' });
    }
    
    // For demo purposes, accept both generated OTP and demo OTP
    const isValidOTP = otp === '123456'; // Demo OTP
    
    if (isValidOTP) {
      transaction.status = 'approved';
      transaction.farmerId = farmerId;
      transaction.otpUsed = otp;
      transaction.approvedAt = new Date();
      await transaction.save();
      
      // Populate the updated transaction for response
      const populatedTransaction = await Transaction.findById(transaction._id)
        .populate('merchantId')
        .populate('farmerId');
      
      res.json({ 
        success: true, 
        message: 'Deal approved successfully', 
        deal: populatedTransaction 
      });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
    
  } catch (error) {
    console.error('Error approving deal:', error);
    res.status(500).json({ error: error.message });
  }
});

// Reject deal (POST /deal/:id/reject)
router.post('/:id/reject', async (req, res) => {
  try {
    const { farmerId, reason } = req.body;
    
    // Validate IDs
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid deal ID format' });
    }
    
    if (!isValidObjectId(farmerId)) {
      return res.status(400).json({ error: 'Invalid farmer ID format' });
    }
    
    // Check if farmer exists and is verified
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    
    if (!farmer.isVerified) {
      return res.status(400).json({ error: 'Farmer is not verified' });
    }
    
    // Check if deal exists and is pending
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    if (transaction.status !== 'pending') {
      return res.status(400).json({ error: 'Deal is not pending or already processed' });
    }
    
    transaction.status = 'rejected';
    transaction.rejectionReason = reason;
    transaction.rejectedBy = farmerId;
    transaction.rejectedAt = new Date();
    await transaction.save();
    
    // Populate the updated transaction for response
    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('merchantId')
      .populate('farmerId');
    
    res.json({ 
      success: true, 
      message: 'Deal rejected successfully', 
      deal: populatedTransaction 
    });
    
  } catch (error) {
    console.error('Error rejecting deal:', error);
    res.status(500).json({ error: error.message });
  }
});

// ===== PARAMETERIZED ROUTES MUST COME LAST =====

// Get deal details (GET /deal/:id) - THIS MUST BE LAST!
router.get('/:id', async (req, res) => {
  try {
    console.log('Getting deal with ID:', req.params.id);
    
    // Validate deal ID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid deal ID format' });
    }
    
    const transaction = await Transaction.findById(req.params.id).populate('merchantId');
    if (!transaction) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    res.json({ success: true, deal: transaction });
  } catch (error) {
    console.error('Get deal error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;