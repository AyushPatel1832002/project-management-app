import { createSlice } from '@reduxjs/toolkit';

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialState = [];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { message, type = 'info', duration = 3000 } = action.payload;
      const id = createId();
      state.push({ id, message, type, duration });
    },
    removeNotification: (state, action) => {
      return state.filter((notif) => notif.id !== action.payload);
    },
    clearNotifications: () => {
      return [];
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
  
