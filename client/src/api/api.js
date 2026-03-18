import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const getMenu = () => api.get('/menu');
export const createReservation = (data) => api.post('/reservations', data);
export const sendMessage = (data) => api.post('/messages', data);

// Admin functions (could be secured later)
export const addMenuItem = (data) => api.post('/menu', data);
export const updateMenuItem = (id, data) => api.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);
export const getReservationsList = () => api.get('/reservations');

export default api;
