import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarCollapsed: false,
  modals: {
    active: null, // modal name
    data: null,   // data to pass to modal
  },
  filters: {
    priority: [], // ['High', 'Medium', 'Low']
    assignee: null,
    search: '',
    sortBy: 'dueDate', // 'priority', 'dueDate', 'createdAt'
    sortOrder: 'asc', // 'asc', 'desc'
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.isSidebarCollapsed = action.payload;
    },
    openModal: (state, action) => {
      const { name, data } = action.payload;
      state.modals.active = name;
      state.modals.data = data || null;
    },
    closeModal: (state) => {
      state.modals.active = null;
      state.modals.data = null;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, openModal, closeModal, setFilter, resetFilters } = uiSlice.actions;

export default uiSlice.reducer;
