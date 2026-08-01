import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="auth-background">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card glass glass-shadow"
      >
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to manage your projects</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input 
                type="email" 
                className="input-field" 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input 
                type="password" 
                className="input-field" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button 
            type="submit" 
            className="btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : (
              <>
                <span>Login</span>
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <button type="button">Sign Up</button></p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
