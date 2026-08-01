import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, signupStart, signupFailure, logout as logoutAction } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    dispatch(loginStart());
    try {
      // Shimmer/Mock delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Dummy check
      if (email && password) {
        const dummyUser = {
          id: '1',
          name: 'Ayush Patel',
          email: email,
          role: email === 'admin@example.com' ? 'Admin' : 'User',
          avatar: `https://i.pravatar.cc/150?u=${email}`
        };
        const token = 'fake-jwt-token-' + Date.now();
        
        dispatch(loginSuccess({ user: dummyUser, token }));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
      return { success: false, error: err.message };
    }
  };

  const signup = async (name, email, password) => {
    dispatch(signupStart());
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (!name || !email || !password) throw new Error('Please complete all fields');

      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        role: 'User',
        avatar: `https://i.pravatar.cc/150?u=${email}`
      };
      dispatch(loginSuccess({ user: newUser, token: 'fake-jwt-token-' + Date.now() }));
      return { success: true };
    } catch (err) {
      dispatch(signupFailure(err.message));
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const isAdmin = user?.role === 'Admin';

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    isAdmin
  };
};
