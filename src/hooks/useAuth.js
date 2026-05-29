import { useState, useEffect, useCallback } from "react";
import { login as loginService } from "../services/authService";

const GUEST_USER = { user: "guest", points: 0 };

export function useAuth() {
  const [user, setUser] = useState(GUEST_USER);
  const [points, setPoints] = useState(0);
  const [racha, setRacha] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setPoints(parsed.points ?? 0);
      setRacha(parsed.best_racha ?? 0);
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const defUser = useCallback((userData) => {
    setUser(userData);
    setPoints(userData.points ?? 0);
    setRacha(userData.best_racha ?? 0);
  }, []);

  const closeUser = useCallback(() => {
    localStorage.setItem("user", JSON.stringify(GUEST_USER));
    setUser(GUEST_USER);
    setPoints(0);
    setRacha(0);
  }, []);

  const loginWithData = useCallback(async (dataToSend) => {
    const data = await loginService(dataToSend);
    localStorage.setItem("user", JSON.stringify(data));
    defUser(data);
    return data;
  }, [defUser]);

  const updateUserOnSave = useCallback((newPoints, newBestRacha) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        points: newPoints,
        best_racha: Math.max(prev.best_racha || 0, newBestRacha),
      };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { user, points, racha, setPoints, setRacha, defUser, closeUser, loginWithData, updateUserOnSave };
}
