import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLoginSuccess: (role: 'super_admin' | 'company_admin' | 'user', email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [apiError, setApiError] = useState(''); // State for displaying API errors

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  /**
   * Handles the login form submission by calling the authentication API.
   */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(''); // Clear previous errors

    // Basic frontend validation
    if (!validateEmail(email)) return;
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    setPasswordError('');

    try {
      // API call to the provided endpoint
      const response = await fetch('https://parserapp-htmlcssjs-fastapi-mongodb.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Handle failed login attempts (e.g., wrong password)
      if (!response.ok) {
        setApiError(data.detail || 'Invalid email or password.');
        return;
      }
      
      // On successful login, update the app's state and redirect
      if (data.role && data.email) {
        onLoginSuccess(data.role, data.email);
        navigate('/'); // Redirect to the main dashboard
      } else {
        setApiError('Login failed: Invalid response from server.');
      }

    } catch (error) {
      // Handle network or other unexpected errors
      setApiError('An error occurred. Please try again later.');
      console.error('Login API call failed:', error);
    }
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend validation for password reset
    if (!validateEmail(email) || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }
    setPasswordError('');
    setConfirmPasswordError('');
    // NOTE: This part should also be an API call in a real application.
    alert('Password reset link sent to your email!');
    setIsLoginView(true);
  };

  // --- JSX for Login Form ---
  const renderLoginForm = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Resume Parser AI Login</h1>
        <p className="text-base text-gray-500 mt-2 text-center">Please login to your account.</p>
      </div>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        {apiError && <p className="text-red-500 text-xs text-center font-bold">{apiError}</p>}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            onBlur={() => validateEmail(email)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md transform hover:scale-105"
        >
          Login
        </button>
      </form>
      <div className="text-center mt-6">
        <button
          onClick={() => { setIsLoginView(false); setEmailError(''); setPasswordError(''); setApiError(''); }}
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
  
  // --- JSX for Forgot Password Form ---
  const renderForgotPasswordForm = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm">
        {/* ... Forgot password form remains the same ... */}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4 font-sans">
      {isLoginView ? renderLoginForm() : renderForgotPasswordForm()}
    </div>
  );
};

export default Login;

