// sample-data/seed.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://admin:admin123@localhost:27017/krishi-db?authSource=admin');

// Define schemas (same as backend models)
const farmerSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const merchantSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const transactionSchema = new mongoose.Schema({
  merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  commodity: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerKg: { type: Number, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Farmer = mongoose.model('Farmer', farmerSchema);
const Merchant = mongoose.model('Merchant', merchantSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// Sample data
const sampleFarmers = [
  { phone: '+919876543210', name: 'Ramesh Kumar', otp: '123456', isVerified: true },
  { phone: '+919876543211', name: 'Suresh Patel', otp: '123457', isVerified: true },
  { phone: '+919876543212', name: 'Mukesh Singh', otp: '123458', isVerified: true },
];

const sampleMerchants = [
  { phone: '+919876543220', name: 'Agri Traders Ltd', location: 'Mumbai Market' },
  { phone: '+919876543221', name: 'Fresh Produce Co', location: 'Pune APMC' },
  { phone: '+919876543222', name: 'Veggie Direct', location: 'Delhi Mandi' },
];

const seedData = async () => {
  try {
    // Clear existing data
    await Farmer.deleteMany({});
    await Merchant.deleteMany({});
    await Transaction.deleteMany({});

    // Insert farmers
    const farmers = await Farmer.insertMany(sampleFarmers);
    console.log('Farmers inserted:', farmers.length);

    // Insert merchants
    const merchants = await Merchant.insertMany(sampleMerchants);
    console.log('Merchants inserted:', merchants.length);

    // Create sample transactions for the last 7 days
    const transactions = [];
    const commodities = ['onion', 'tomato', 'potato', 'wheat', 'rice'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate 2-4 transactions per day
      const dailyTransactions = Math.floor(Math.random() * 3) + 2;
      
      for (let j = 0; j < dailyTransactions; j++) {
        const commodity = commodities[Math.floor(Math.random() * commodities.length)];
        const basePrice = {
          'onion': 25,
          'tomato': 30,
          'potato': 20,
          'wheat': 22,
          'rice': 35
        }[commodity];
        
        const priceVariation = (Math.random() - 0.5) * 10; // ±5 rupees variation
        const pricePerKg = Math.max(10, basePrice + priceVariation);
        
        transactions.push({
          merchantId: merchants[Math.floor(Math.random() * merchants.length)]._id,
          farmerId: farmers[Math.floor(Math.random() * farmers.length)]._id,
          commodity,
          quantity: Math.floor(Math.random() * 1000) + 100, // 100-1100 kg
          pricePerKg: Math.round(pricePerKg * 100) / 100,
          location: merchants[Math.floor(Math.random() * merchants.length)].location,
          status: 'approved',
          createdAt: date
        });
      }
    }

    const insertedTransactions = await Transaction.insertMany(transactions);
    console.log('Transactions inserted:', insertedTransactions.length);

    console.log('Sample data seeded successfully!');
    
    // Display some sample data
    console.log('\n--- Sample Farmers ---');
    farmers.forEach(farmer => {
      console.log(`${farmer.name} (${farmer.phone})`);
    });

    console.log('\n--- Sample Merchants ---');
    merchants.forEach(merchant => {
      console.log(`${merchant.name} at ${merchant.location} (${merchant.phone})`);
    });

    console.log('\n--- Sample Transactions (last 3) ---');
    const recentTransactions = await Transaction.find()
      .populate('merchantId', 'name')
      .populate('farmerId', 'name')
      .sort({ createdAt: -1 })
      .limit(3);

    recentTransactions.forEach(transaction => {
      console.log(`${transaction.commodity} - ${transaction.quantity}kg @ ₹${transaction.pricePerKg}/kg`);
      console.log(`  Merchant: ${transaction.merchantId.name}`);
      console.log(`  Farmer: ${transaction.farmerId.name}`);
      console.log(`  Date: ${transaction.createdAt.toLocaleDateString()}`);
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();