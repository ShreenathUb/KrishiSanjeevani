// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard  from './ui/GlassCard';
import NeonButton from './ui/NeonButton';
import { farmerAPI, merchantAPI } from '../utils/api';

/**
 * Props:
 *   userType: "farmer" | "merchant"  (default = "farmer")
 */
const Login = ({ userType = 'farmer' }) => {
  /* ───────── state ───────── */
  const [phone, setPhone]   = useState('');
  const [otp,   setOtp]     = useState('');
  const [step,  setStep]    = useState(1);   // 1 = phone, 2 = OTP
  const [msg,   setMsg]     = useState('');
  const [loading, setLoading] = useState(false);
  const navigate            = useNavigate();

  /* choose correct API wrapper & redirect */
  const api     = userType === 'merchant' ? merchantAPI : farmerAPI;
  const landing = userType === 'merchant' ? '/createdeal' : '/deals';

  /* ───────── helpers ───────── */
  const validPhone = /^[6-9]\d{9}$/;

  const sendOtp = async () => {
    if (!validPhone.test(phone))
      return setMsg('Enter a valid 10‑digit mobile');

    setLoading(true);
    setMsg('Sending OTP …');

    try {
      await api.requestOtp({ phone });  // POST /resend-otp
      setMsg('OTP sent ✔️');
      setStep(2);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) return setMsg('Enter the 6‑digit OTP');

    setLoading(true);
    setMsg('Verifying …');

    try {
      const res = await api.verify({ phone, otp });  // POST /verify
      const { token }  = res.data;
      const userObject = res.data[userType];         // farmer or merchant

      /* persist */
      localStorage.setItem('token',    token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userId',   userObject.id);
      localStorage.setItem('userName', userObject.name);

      navigate(landing);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const enterKey = (e, fn) => {
    if (e.key === 'Enter') fn();
  };

  /* ───────── UI ───────── */
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <GlassCard className="p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {userType === 'merchant' ? 'Merchant' : 'Farmer'} Login
        </h2>

        {/* Step 1: enter phone */}
        {step === 1 && (
          <>
            <input
              className="w-full mb-6 px-4 py-3 border rounded-xl"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => enterKey(e, sendOtp)}
              maxLength={10}
            />
            <NeonButton
              className="w-full"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading ? 'Sending…' : 'Send OTP'}
            </NeonButton>
          </>
        )}

        {/* Step 2: verify OTP */}
        {step === 2 && (
          <>
            <input
              className="w-full mb-6 px-4 py-3 border rounded-xl text-center"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => enterKey(e, verifyOtp)}
              maxLength={6}
            />
            <NeonButton
              className="w-full"
              disabled={loading}
              onClick={verifyOtp}
            >
              {loading ? 'Verifying…' : 'Verify 🔒'}
            </NeonButton>

            <button
              className="mt-3 text-sm text-emerald-600 hover:underline"
              onClick={sendOtp}
              disabled={loading}
            >
              Resend OTP
            </button>
          </>
        )}

        {msg && (
          <p className="mt-6 text-center text-gray-600 whitespace-pre-wrap">
            {msg}
          </p>
        )}
      </GlassCard>
    </div>
  );
};

export default Login;
