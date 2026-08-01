import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { message, type = 'info', duration = 3000 } = action.payload;
      const id = uuidv4();
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
