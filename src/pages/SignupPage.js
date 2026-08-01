import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [validationError, setValidationError] = useState('');
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setValidationError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    const result = await signup(form.name, form.email, form.password);
    if (result.success) navigate('/');
  };

  return (
    <div className="login-page">
      <div className="auth-background">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="auth-card glass glass-shadow signup-card">
        <div className="auth-header">
          <div className="auth-mark"><UserPlus size={22} /></div>
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">Start organizing your projects with FlowTask</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-group">
            <label>Full Name</label>
            <div className="input-with-icon"><User size={18} /><input type="text" className="input-field" placeholder="Ayush Patel" value={form.name} onChange={updateField('name')} required /></div>
          </div>
          <div className="auth-group">
            <label>Email Address</label>
            <div className="input-with-icon"><Mail size={18} /><input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={updateField('email')} required /></div>
          </div>
          <div className="auth-group">
            <label>Password</label>
            <div className="input-with-icon"><Lock size={18} /><input type="password" className="input-field" placeholder="At least 6 characters" value={form.password} onChange={updateField('password')} required /></div>
          </div>
          <div className="auth-group">
            <label>Confirm Password</label>
            <div className="input-with-icon"><Lock size={18} /><input type="password" className="input-field" placeholder="Repeat your password" value={form.confirmPassword} onChange={updateField('confirmPassword')} required /></div>
          </div>

          {(validationError || error) && <div className="auth-error">{validationError || error}</div>}
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : <><span>Create Account</span><UserPlus size={18} /></>}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
          <Link className="back-link" to="/login"><ArrowLeft size={14} /> Back to login</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
