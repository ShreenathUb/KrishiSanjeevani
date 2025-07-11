// frontend/src/utils/api.js
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const API_BASE_URL ='http://localhost:5000/api';
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


/* ─────────────────────────────────────────  FARMER  ─── */
export const farmerAPI = {
  /* registration */
  register   : (data) => api.post('/farmer/register', data),
  verify     : (data) => api.post('/farmer/verify',   data),

  /* login / resend‑OTP */
  requestOtp : (data) => api.post('/farmer/resend-otp', data),
  //  ^— make sure you have (or create) this route on the backend
};

/* ─────────────────────────────────────────  MERCHANT  ─ */
export const merchantAPI = {
  /* registration */
  register: (data) => api.post('/merchant/register', data),

  /* login / resend‑OTP */
  requestOtp: (data) => api.post('/merchant/resend-otp', data),
  verify:     (data) => api.post('/merchant/verify', data),

  /* login helper to fetch by phone */
  login:     (phone) => api.get(`/merchant/by-phone/${phone}`), // GET not POST

  /* get merchant details by ID */
  getById:   (id) => api.get(`/merchant/${id}`)
};

/* ─────────────────────────────────────────  DEALS  ─── */
export const dealAPI = {
  // Get pending deals
  getPending: () => api.get('/deal'),
  
  // Get deals for farmer
  getForFarmer: (farmerId) => api.get(`/deal/farmer/${farmerId}`),
  
  // Get deals for merchant
  getForMerchant: (merchantId) => api.get(`/deal/merchant/${merchantId}`),
  
  // Get deal details
  getDetail: (dealId) => api.get(`/deal/${dealId}`),
  
  // Create deal - FIXED
  create: (dealData) => api.post('/deal/create', dealData),
  
  // Approve deal
  approve: (dealId, farmerId, otp) =>
  api.post(`/deal/${dealId}/approve`, { farmerId, otp }),

  
  // Reject deal
  reject: (dealId, farmerId, reason) => api.post(`/deal/${dealId}/reject`, { farmerId, reason }),
};
/* ───────────────────────────────────────  PUBLIC ENDPOINTS  ─ */
export const publicAPI = {
  getPrices: () => api.get('/public/prices'),
};
