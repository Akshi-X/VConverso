import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-min-h-screen tw-bg-v-bg tw-flex tw-items-center tw-justify-center tw-px-4">
      <div className="tw-max-w-md tw-w-full tw-bg-v-card tw-border tw-border-v-brown-med/20 tw-rounded-3xl tw-p-8 tw-shadow-md">
        <Link to="/login" className="tw-text-v-text-sec hover:tw-text-v-brown-dark tw-flex tw-items-center tw-gap-2 tw-text-sm tw-mb-6 tw-transition-all">
          <ArrowLeft className="tw-w-4 tw-h-4" /> Back to login
        </Link>
        
        <h2 className="tw-text-2xl tw-font-bold tw-text-v-brown-dark tw-mb-2">New Password</h2>
        <p className="tw-text-v-text-sec tw-text-sm tw-mb-6">
          Please enter your new password below.
        </p>

        {success ? (
          <div className="tw-text-center tw-py-6">
            <CheckCircle className="tw-w-16 tw-h-16 tw-text-green-600 tw-mx-auto tw-mb-4" />
            <h3 className="tw-text-lg tw-font-bold tw-text-v-brown-dark tw-mb-2">Password Reset</h3>
            <p className="tw-text-sm tw-text-v-text-sec">You can now login with your new password. Redirecting...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="tw-space-y-4">
            {error && (
              <div className="tw-p-3 tw-bg-red-500/10 tw-border tw-border-red-500/20 tw-rounded-xl tw-text-red-600 tw-text-sm tw-font-semibold">
                {error}
              </div>
            )}
            
            <div className="tw-relative">
              <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-4 tw-flex tw-items-center tw-pointer-events-none">
                <Lock className="tw-w-5 tw-h-5 tw-text-[#8B5A3C]" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="tw-w-full tw-pl-12 tw-pr-4 tw-py-3 tw-rounded-xl tw-bg-[#F5EFE6] tw-border tw-border-[#C7B299]/50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#6B3E2E]/20 focus:tw-border-[#6B3E2E] tw-text-[#2D1F18] placeholder-[#8B5A3C]/70 tw-transition-all tw-font-medium"
                placeholder="New Password"
              />
            </div>

            <div className="tw-relative">
              <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-4 tw-flex tw-items-center tw-pointer-events-none">
                <Lock className="tw-w-5 tw-h-5 tw-text-[#8B5A3C]" />
              </div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="tw-w-full tw-pl-12 tw-pr-4 tw-py-3 tw-rounded-xl tw-bg-[#F5EFE6] tw-border tw-border-[#C7B299]/50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#6B3E2E]/20 focus:tw-border-[#6B3E2E] tw-text-[#2D1F18] placeholder-[#8B5A3C]/70 tw-transition-all tw-font-medium"
                placeholder="Confirm New Password"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="tw-w-full tw-bg-gradient-to-r tw-from-[#6B3E2E] tw-to-[#8B5A3C] hover:tw-from-[#5C3528] hover:tw-to-[#6B3E2E] tw-text-white tw-py-3 tw-rounded-xl tw-font-bold tw-transition-all tw-shadow-sm disabled:tw-opacity-70"
            >
              {loading ? 'Saving...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
