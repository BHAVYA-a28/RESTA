import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const getMenu = () => api.get('/menu');
export const createReservation = (data: any) => api.post('/reservations', data);
export const createOrder = (data: any) => api.post('/orders', data);
export const sendMessage = (data: any) => api.post('/messages', data);

// Admin functions
export const addMenuItem = (data: any, token: string) => api.post('/menu', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateMenuItem = (id: string, data: any, token: string) => api.put(`/menu/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteMenuItem = (id: string, token: string) => api.delete(`/menu/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getReservationsList = (token: string) => api.get('/reservations', { headers: { Authorization: `Bearer ${token}` } });

export default api;
