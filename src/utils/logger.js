// Basic logging utility for login activities
class Logger {
  constructor() {
    this.logs = this.loadLogs();
    this.maxLogs = 100; // Keep only last 100 logs
  }

  // Load logs from localStorage
  loadLogs() {
    try {
      const stored = localStorage.getItem('loginLogs');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading logs:', error);
      return [];
    }
  }

  // Save logs to localStorage
  saveLogs() {
    try {
      localStorage.setItem('loginLogs', JSON.stringify(this.logs));
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  }

  // Add a new log entry
  log(level, message, data = {}) {
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.logs.push(logEntry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    this.saveLogs();

    // Also log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}] ${message}`, data);
    }
  }

  // Log successful login
  loginSuccess(userData) {
    this.log('info', 'User login successful', {
      userId: userData.user_id,
      email: userData.email,
      role: userData.role,
      name: userData.name
    });
  }

  // Log failed login attempt
  loginFailed(email, reason) {
    this.log('warn', 'User login failed', {
      email,
      reason
    });
  }

  // Log logout
  logout(userData) {
    this.log('info', 'User logout', {
      userId: userData?.user_id,
      email: userData?.email,
      role: userData?.role
    });
  }

  // Log registration
  registrationSuccess(userData) {
    this.log('info', 'User registration successful', {
      userId: userData.user_id,
      email: userData.email,
      role: userData.role,
      name: userData.name
    });
  }

  // Get all logs
  getLogs() {
    return [...this.logs];
  }

  // Get logs by level
  getLogsByLevel(level) {
    return this.logs.filter(log => log.level === level);
  }

  // Get recent logs (last n entries)
  getRecentLogs(count = 10) {
    return this.logs.slice(-count);
  }

  // Clear all logs
  clearLogs() {
    this.logs = [];
    this.saveLogs();
  }

  // Export logs as JSON
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Create a singleton instance
const logger = new Logger();

export default logger; 