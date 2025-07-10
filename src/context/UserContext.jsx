import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkUserSession } from '../CheckSession';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Try to load from localStorage immediately
    const storedUser = localStorage.getItem('fortitests_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 2. Also verify session with backend
    checkUserSession()
      .then((data) => {
        if (data) {
          setUser(data);
          localStorage.setItem('fortitests_user', JSON.stringify(data));
        } else {
          setUser(null);
          localStorage.removeItem('fortitests_user');
        }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem('fortitests_user');
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
