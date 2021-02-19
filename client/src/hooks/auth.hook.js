import { useState, useCallback, useEffect } from 'react';

const storage = 'userData';

export const useAuth = () => {

  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUsedId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUsedId(id);

    localStorage.setItem(storage, JSON.stringify({
      userId: id, 
      token: jwtToken
    }))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUsedId(null);
    localStorage.removeItem(storage);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storage));

    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true);
  }, [login])

  return { login, logout, token, userId, ready };
}