import { useState, useEffect, useCallback } from "react";
import { login as loginService } from "../services/authService";

const GUEST_USER = { user: "guest", points: 0, points_math: 0 };

export function useAuth() {
  const [user, setUser] = useState(GUEST_USER);
  const [points, setPoints] = useState(0);
  const [racha, setRacha] = useState(0);
  const [pointsMath, setPointsMath] = useState(0);
  const [rachaMath, setRachaMath] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setPoints(parsed.points ?? 0);
      setRacha(parsed.best_racha ?? 0);
      setPointsMath(parsed.points_math ?? 0);
      setRachaMath(parsed.best_racha_math ?? 0);
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const defUser = useCallback((userData) => {
    setUser(userData);
    setPoints(userData.points ?? 0);
    setRacha(userData.best_racha ?? 0);
    setPointsMath(userData.points_math ?? 0);
    setRachaMath(userData.best_racha_math ?? 0);
  }, []);

  const closeUser = useCallback(() => {
    localStorage.setItem("user", JSON.stringify(GUEST_USER));
    setUser(GUEST_USER);
    setPoints(0);
    setRacha(0);
    setPointsMath(0);
    setRachaMath(0);
  }, []);

  const loginWithData = useCallback(async (dataToSend) => {
    const data = await loginService(dataToSend);
    localStorage.setItem("user", JSON.stringify(data));
    defUser(data);
    return data;
  }, [defUser]);

  const updateUserOnSave = useCallback((newPoints, newBestRacha, isMath) => {
    setUser((prev) => {
      if (isMath) {
        const updated = {
          ...prev,
          points_math: newPoints,
          best_racha_math: Math.max(prev.best_racha_math || 0, newBestRacha),
        };
        localStorage.setItem("user", JSON.stringify(updated));
        return updated;
      }
      const updated = {
        ...prev,
        points: newPoints,
        best_racha: Math.max(prev.best_racha || 0, newBestRacha),
      };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    user, points, racha, pointsMath, rachaMath,
    setPoints, setRacha, setPointsMath, setRachaMath,
    defUser, closeUser, loginWithData, updateUserOnSave,
  };
}
