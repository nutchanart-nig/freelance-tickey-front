import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Ticket API functions
export const ticketAPI = {
  // Get all tickets
  getTickets: async () => {
    try {
      const response = await api.get('/api/tickets');
      return {
        success: true,
        data: response.data.tickets,
        message: 'Tickets fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch tickets',
        details: error.response?.data
      };
    }
  },

  // Create a new ticket
  createTicket: async (ticketData) => {
    try {
      const response = await api.post('/api/tickets', ticketData);
      return {
        success: true,
        data: response.data.ticket,
        message: response.data.message || 'Ticket created successfully'
      };
    } catch (error) {
      console.error('Error creating ticket:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create ticket',
        details: error.response?.data
      };
    }
  },

  // Get a specific ticket
  getTicket: async (id) => {
    try {
      const response = await api.get(`/api/tickets/${id}`);
      return {
        success: true,
        data: response.data.ticket,
        message: 'Ticket fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch ticket',
        details: error.response?.data
      };
    }
  },

  // Update a ticket
  updateTicket: async (id, ticketData) => {
    try {
      const response = await api.put(`/api/tickets/${id}`, ticketData);
      return {
        success: true,
        data: response.data.ticket,
        message: response.data.message || 'Ticket updated successfully'
      };
    } catch (error) {
      console.error('Error updating ticket:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update ticket',
        details: error.response?.data
      };
    }
  },

  // Delete a ticket
  deleteTicket: async (id) => {
    try {
      const response = await api.delete(`/api/tickets/${id}`);
      return {
        success: true,
        message: response.data.message || 'Ticket deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting ticket:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete ticket',
        details: error.response?.data
      };
    }
  },
};

export default api;
