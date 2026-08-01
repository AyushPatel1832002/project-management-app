import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [
    { id: '1', name: 'Ayush Patel', email: 'ayush@example.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=ayush' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'User', avatar: 'https://i.pravatar.cc/150?u=john' }
  ],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, email, role = 'User' } = action.payload;
      state.items.push({ id: uuidv4(), name, email, role, avatar: `https://i.pravatar.cc/150?u=${email}` });
    },
    removeUser: (state, action) => {
      state.items = state.items.filter((user) => user.id !== action.payload);
    },
    updateUserRole: (state, action) => {
      const { id, role } = action.payload;
      const user = state.items.find((u) => u.id === id);
      if (user) {
        user.role = role;
      }
    }
  }
});

export const { addUser, removeUser, updateUserRole } = userSlice.actions;
export default userSlice.reducer;
