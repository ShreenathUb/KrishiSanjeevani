import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [userType, setUserType] = useState('farmer')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    // Make a call to backend to fetch the user by phone
    const response = await fetch(`http://krishisanjeevani.onrender.com/api/${userType}/by-phone/${phone}`);
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || 'Login failed')
      return
    }

    // Save correct ObjectId and info
    localStorage.setItem('userType', userType)
    localStorage.setItem('userName', data.name || 'Demo User')
    localStorage.setItem('userPhone', data.phone)
    localStorage.setItem('userId', data._id)  // ✅ This is the fix

    setMessage('Login successful! Redirecting...')
    setTimeout(() => navigate('/dashboard'), 1500)

  } catch (err) {
    setMessage('❌ Login failed.')
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="phone" className="sr-only">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
              />
            </div>

            <div>
              <label htmlFor="userType" className="sr-only">User Type</label>
              <select
                id="userType"
                name="userType"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="farmer">Farmer</option>
                <option value="merchant">Merchant</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-center ${
                message.includes('✅')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
