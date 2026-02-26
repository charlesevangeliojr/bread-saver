"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get('user');
        const token = urlParams.get('token');
        const action = urlParams.get('action');
        const errorMessage = urlParams.get('error');

        if (errorMessage) {
          setError(errorMessage);
          setLoading(false);
          return;
        }

        if (userParam && token) {
          const user = JSON.parse(userParam);
          
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          
          // Redirect to dashboard
          router.push('/dashboard');
        } else {
          setError('Authentication failed');
        }
      } catch (err) {
        setError('Error processing authentication');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [router]);

  const handleRetrySignup = () => {
    router.push('/?signup=true');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={handleRetrySignup}
              className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Sign Up First
            </button>
            <button 
              onClick={() => router.push('/')}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
