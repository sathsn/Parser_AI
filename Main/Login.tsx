/*import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: (role: 'superadmin' | 'companyadmin' | 'user', email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    const blockedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const emailDomain = email.split('@')[1];
    if (blockedDomains.includes(emailDomain)) {
      setEmailError('Please fill the field with a valid domain.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email) || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    setPasswordError('');

    const emailDomain = email.split('@')[1];
    if (emailDomain === 'superadmin.com') {
      onLoginSuccess('superadmin', email);
    } else if (emailDomain === 'talenthive.net') {
      onLoginSuccess('companyadmin', email);
    } else {
      onLoginSuccess('user', email);
    }
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    // In a real application, you would make an API call here.
    alert('Password reset link sent to your email!');
    setIsLoginView(true);
  };

  const renderLoginForm = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm">
      <div className="flex flex-col items-center mb-6">
        <span className="mb-2 text-2xl">🔒 Login</span>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Resume Parser AI</h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 text-center">Please login to your account.</p>
      </div>
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            onBlur={() => validateEmail(email)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
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
          onClick={() => { setIsLoginView(false); setEmailError(''); setPasswordError(''); }}
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm">
      <div className="flex flex-col items-center mb-6">
        <span className="mb-2 text-2xl">🔑 Reset Password</span>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Resume Parser AI</h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 text-center">Please enter your new password.</p>
      </div>
      <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            onBlur={() => validateEmail(email)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md transform hover:scale-105"
        >
          Reset Password
        </button>
      </form>
      <div className="text-center mt-6">
        <button
          onClick={() => { setIsLoginView(true); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); }}
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          Back to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4 font-sans">
      {isLoginView ? renderLoginForm() : renderForgotPasswordForm()}
    </div>
  );
};

export default Login;*/

/*import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: (role: 'superadmin' | 'companyadmin' | 'user', email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [apiError, setApiError] = useState(''); // State for API errors

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(''); // Clear previous API errors
    if (!validateEmail(email)) return;
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    setPasswordError('');

    try {
      const response = await fetch('https://parserapp-htmlcssjs-fastapi-mongodb.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle HTTP errors like 401 Unauthorized
        setApiError(data.detail || 'Invalid email or password.');
        return;
      }
      
      // Assuming the API response includes the user's role and email
      // Adjust 'data.role' and 'data.email' if the API response structure is different
      if (data.role && data.email) {
        onLoginSuccess(data.role, data.email);
      } else {
        setApiError('Login failed: Invalid response from server.');
      }

    } catch (error) {
      setApiError('An error occurred. Please try again later.');
      console.error('Login API call failed:', error);
    }
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    alert('Password reset link sent to your email!');
    setIsLoginView(true);
  };

  const renderLoginForm = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm">
      <div className="flex flex-col items-center mb-6">
        <span className="mb-2 text-2xl">🔒 Login</span>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Resume Parser AI</h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 text-center">Please login to your account.</p>
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
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
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

  const renderForgotPasswordForm = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm">
      <div className="flex flex-col items-center mb-6">
        <span className="mb-2 text-2xl">🔑 Reset Password</span>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Resume Parser AI</h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 text-center">Please enter your new password.</p>
      </div>
      <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            onBlur={() => validateEmail(email)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md transform hover:scale-105"
        >
          Reset Password
        </button>
      </form>
      <div className="text-center mt-6">
        <button
          onClick={() => { setIsLoginView(true); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); }}
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          Back to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4 font-sans">
      {isLoginView ? renderLoginForm() : renderForgotPasswordForm()}
    </div>
  );
};

export default Login;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLoginSuccess: (role: 'superadmin' | 'companyadmin' | 'user', email: string) => void;
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
  const [apiError, setApiError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (!validateEmail(email)) return;
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    setPasswordError('');

    try {
      const response = await fetch('https://parserapp-htmlcssjs-fastapi-mongodb.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.detail || 'Invalid email or password.');
        return;
      }
      
      if (data.role && data.email) {
        onLoginSuccess(data.role, data.email);
        navigate('/'); // Redirect to the main dashboard route
      } else {
        setApiError('Login failed: Invalid response from server.');
      }

    } catch (error) {
      setApiError('An error occurred. Please try again later.');
      console.error('Login API call failed:', error);
    }
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    alert('Password reset link sent to your email!');
    setIsLoginView(true);
  };

  const renderLoginForm = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm">
      <div className="flex flex-col items-center mb-6">
        <span className="mb-2 text-2xl">🔒 Login</span>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Resume Parser AI</h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 text-center">Please login to your account.</p>
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
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
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

  const renderForgotPasswordForm = () => (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-sm">
      <div className="flex flex-col items-center mb-6">
        <span className="mb-2 text-2xl">🔑 Reset Password</span>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Resume Parser AI</h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 text-center">Please enter your new password.</p>
      </div>
      <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            onBlur={() => validateEmail(email)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
          />
          {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md transform hover:scale-105"
        >
          Reset Password
        </button>
      </form>
      <div className="text-center mt-6">
        <button
          onClick={() => { setIsLoginView(true); setEmailError(''); setPasswordError(''); setConfirmPasswordError(''); }}
          className="text-indigo-600 hover:underline text-sm font-medium"
        >
          Back to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4 font-sans">
      {isLoginView ? renderLoginForm() : renderForgotPasswordForm()}
    </div>
  );
};

export default Login;