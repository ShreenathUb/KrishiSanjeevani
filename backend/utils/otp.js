// backend/utils/otp.js
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (phone, otp) => {
  // Mock SMS service - in production, integrate with SMS provider
  console.log(`Sending OTP ${otp} to ${phone}`);
  return { success: true, message: 'OTP sent successfully' };
};

module.exports = { generateOTP, sendOTP };