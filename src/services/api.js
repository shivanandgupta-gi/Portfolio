import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export function submitContact(data) {
  return api.post('/api/contact', data);
}

export function getContacts() {
  return api.get('/api/contact');
}

export function markContactAsRead(id) {
  return api.patch(`/api/contact/${id}/read`);
}

export function healthCheck() {
  return api.get('/api/health');
}

export default api;
