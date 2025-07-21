import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkUserSession } from '../CheckSession';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  // ✅ Initialize directly from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('fortitests_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Also confirm session validity with backend
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
