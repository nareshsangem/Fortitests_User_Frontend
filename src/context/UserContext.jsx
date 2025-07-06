// Context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkUserSession } from '../CheckSession';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);
console.log("UserContext", UserContext);
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserSession()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
