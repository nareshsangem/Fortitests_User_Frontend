// utils/checkUserSession.js
import api from './api'; // Axios instance

export const checkUserSession = async () => {
  try {
    const res = await api.get('/protected/profile', { withCredentials: true });
    
    return res.data.user; // or res.data based on your backend response
  } catch (err) {
    console.error('Error checking user session:', err);
    return null;
  }
};
