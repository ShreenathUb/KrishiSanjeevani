// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/krishi-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// Routes
app.use('/api/farmer', require('./routes/farmer'));
app.use('/api/merchant', require('./routes/merchant'));
app.use('/api/deal', require('./routes/deal'));
app.use('/api/public', require('./routes/public'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});