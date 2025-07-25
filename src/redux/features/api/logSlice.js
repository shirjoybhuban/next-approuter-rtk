import { createSlice } from '@reduxjs/toolkit';
import logger from '@/utils/logger';

const initialState = {
  logs: [],
  isLoading: false,
  error: null
};

export const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    // Load logs from localStorage
    loadLogs: (state) => {
      state.logs = logger.getLogs();
    },
    
    // Add a new log entry
    addLog: (state, action) => {
      const { level, message, data } = action.payload;
      logger.log(level, message, data);
      state.logs = logger.getLogs();
    },
    
    // Log successful login
    logLoginSuccess: (state, action) => {
      logger.loginSuccess(action.payload);
      state.logs = logger.getLogs();
    },
    
    // Log failed login
    logLoginFailed: (state, action) => {
      const { email, reason } = action.payload;
      logger.loginFailed(email, reason);
      state.logs = logger.getLogs();
    },
    
    // Log logout
    logLogout: (state, action) => {
      logger.logout(action.payload);
      state.logs = logger.getLogs();
    },
    
    // Log registration
    logRegistration: (state, action) => {
      logger.registrationSuccess(action.payload);
      state.logs = logger.getLogs();
    },
    
    // Clear all logs
    clearLogs: (state) => {
      logger.clearLogs();
      state.logs = [];
    },
    
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  loadLogs,
  addLog,
  logLoginSuccess,
  logLoginFailed,
  logLogout,
  logRegistration,
  clearLogs,
  setLoading,
  setError
} = logSlice.actions;

// Selectors
export const selectAllLogs = (state) => state.logs.logs;
export const selectRecentLogs = (state, count = 10) => state.logs.logs.slice(-count);
export const selectLogsByLevel = (state, level) => state.logs.logs.filter(log => log.level === level);
export const selectLoginLogs = (state) => state.logs.logs.filter(log => 
  log.message.includes('login') || log.message.includes('logout')
);
export const selectIsLoading = (state) => state.logs.isLoading;
export const selectError = (state) => state.logs.error;

export default logSlice.reducer; 