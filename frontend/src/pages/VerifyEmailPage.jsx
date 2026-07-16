import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CheckCircle, XCircle } from 'lucide-react';

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No token provided.');
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(res.data.message);
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed.');
      }
    };
    verify();
  }, [location]);

  return (
    <div className="tw-min-h-screen tw-bg-v-bg tw-flex tw-items-center tw-justify-center tw-px-4">
      <div className="tw-max-w-md tw-w-full tw-bg-v-card tw-border tw-border-v-brown-med/20 tw-rounded-3xl tw-p-8 tw-text-center tw-shadow-md">
        {status === 'loading' && <p className="tw-font-bold tw-text-v-brown-dark">Verifying...</p>}
        {status === 'success' && (
          <>
            <CheckCircle className="tw-w-16 tw-h-16 tw-text-green-600 tw-mx-auto tw-mb-4" />
            <h2 className="tw-text-xl tw-font-bold tw-mb-2 tw-text-v-brown-dark">Email Verified!</h2>
            <p className="tw-text-v-text-sec tw-mb-6">{message}</p>
            <Link to="/login" className="tw-inline-block tw-bg-[#6B3E2E] tw-text-white tw-px-6 tw-py-3 tw-rounded-xl tw-font-bold">
              Return to Login
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="tw-w-16 tw-h-16 tw-text-red-500 tw-mx-auto tw-mb-4" />
            <h2 className="tw-text-xl tw-font-bold tw-mb-2 tw-text-v-brown-dark">Verification Failed</h2>
            <p className="tw-text-v-text-sec tw-mb-6">{message}</p>
            <Link to="/login" className="tw-inline-block tw-bg-transparent tw-border tw-border-v-brown-med tw-text-v-brown-dark tw-px-6 tw-py-3 tw-rounded-xl tw-font-bold">
              Go Back
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
