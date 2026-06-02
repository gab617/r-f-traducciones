import { useState, useEffect, useCallback } from "react";
import { fetchWordsData } from "../services/dataService";
import { fetchUsers } from "../services/userService";

export function useData() {
  const [data, setData] = useState({});
  const [staticData, setStaticData] = useState({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();
  const [conectBD, setConectBD] = useState(false);

  useEffect(() => {
    fetchWordsData()
      .then((json) => {
        setData(json);
        setStaticData({ ...json });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const refreshUsers = useCallback(() => {
    fetchUsers()
      .then((users) => {
        setUsers(users.sort((a, b) => b.points - a.points));
        setConectBD(true);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    refreshUsers();
  }, [data, refreshUsers]);

  const updateUserScore = useCallback((userHandle, scoreUpdates) => {
    setUsers((prev) => {
      if (!prev) return prev;
      return prev.map((u) =>
        u.user_handle === userHandle ? { ...u, ...scoreUpdates } : u
      );
    });
  }, []);

  return { data, staticData, loading, users, conectBD, refreshUsers, updateUserScore };
}
