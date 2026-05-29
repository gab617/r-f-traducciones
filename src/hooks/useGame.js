import { useState, useEffect, useCallback, useRef } from "react";
import {
  elegirAleatorio,
  elegirObjetoEnArray,
  textosTraducidos,
  objKeysVacio,
} from "../funciones";
import { uploadPoints as uploadPointsService } from "../services/userService";

const urlRaizApi = "https://serviciosunificados.onrender.com";
const urlImgComplete = "https://serviciosunificados.onrender.com/bw/completed";
const URL_BASE = import.meta.env.VITE_URL_API;

const MIN_SAVE_INTERVAL = 30000;

export function useGame({ data, user, setPoints, setRacha, updateUserOnSave, onSaveRefreshUsers }) {
  const [dataActual, setDataActual] = useState([]);
  const [resueltosObj, setResueltosObj] = useState({});
  const [noResueltosObj, setNoResueltosObj] = useState({});
  const [keyActual, setKeyActual] = useState("");
  const [objetoPrincipal, setObjetoPrincipal] = useState();
  const [keywords, setKeywords] = useState({});
  const [sessionPoints, setSessionPoints] = useState(0);
  const [rachaSession, setRachaSession] = useState(0);
  const [ingTxts, setInTxts] = useState([]);
  const [espTxts, setEsTxts] = useState([]);

  const sessionPointsRef = useRef(sessionPoints);
  useEffect(() => { sessionPointsRef.current = sessionPoints; }, [sessionPoints]);
  const rachaSessionRef = useRef(rachaSession);
  useEffect(() => { rachaSessionRef.current = rachaSession; }, [rachaSession]);
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);
  const lastSaveRef = useRef(0);
  const lastSavedPointsRef = useRef(0);
  const lastSavedRachaRef = useRef(0);

  useEffect(() => {
    const keys = Object.keys(data);
    if (keys.length === 0) return;

    const kwords = {};
    keys.forEach((k) => {
      kwords[k] = { key: k, terminado: false };
    });
    setKeywords(kwords);

    const primerCargaRandom = elegirAleatorio(data);
    setKeyActual(primerCargaRandom[0]);
    setDataActual(primerCargaRandom[1]);

    const traducciones = textosTraducidos(primerCargaRandom[1]);
    setInTxts(traducciones[0]);
    setEsTxts(traducciones[1]);

    setObjetoPrincipal(elegirObjetoEnArray(primerCargaRandom[1]));
    setResueltosObj(objKeysVacio(keys));
    setNoResueltosObj(data);
  }, [data]);

  useEffect(() => {
    if (Object.keys(data).length === 0 || dataActual.length === 0) return;
    const traducciones = textosTraducidos(dataActual);
    setInTxts(traducciones[0]);
    setEsTxts(traducciones[1]);
  }, [data, dataActual]);

  const handleImagePrincClick = useCallback(() => {
    console.log(objetoPrincipal);
  }, [objetoPrincipal]);

  const pointsManager = useCallback(() => {
    setSessionPoints((prev) => prev + 1);
  }, []);

  const saveProgress = useCallback(() => {
    const sp = sessionPointsRef.current;
    const rs = rachaSessionRef.current;
    const lp = lastSavedPointsRef.current;
    const lr = lastSavedRachaRef.current;
    const u = userRef.current;

    const deltaPuntos = sp - lp;
    const rachaMejoro = rs > lr;

    if (u.user === "guest") return;
    if (deltaPuntos <= 0 && !rachaMejoro) return;

    const now = Date.now();
    if (now - lastSaveRef.current < MIN_SAVE_INTERVAL) return;
    lastSaveRef.current = now;

    uploadPointsService(u, Math.max(deltaPuntos, 0), rs)
      .then(() => {
        lastSavedPointsRef.current = sp;
        lastSavedRachaRef.current = rs;
        const newTotal = (u.points || 0) + Math.max(deltaPuntos, 0);
        updateUserOnSave(newTotal, rs);
        setPoints((prev) => prev + Math.max(deltaPuntos, 0));
        setRacha((prev) => (rs > prev ? rs : prev));
        if (onSaveRefreshUsers) onSaveRefreshUsers();
      })
      .catch(console.error);
  }, [updateUserOnSave, setPoints, setRacha, onSaveRefreshUsers]);

  const uploadPoints = useCallback(() => {
    if (userRef.current.user === "guest") {
      alert(
        'Para guardar un progreso debes registrarte e ingresar. Actualmente estas en modo invitado "guest"'
      );
      return;
    }
    saveProgress();
  }, [saveProgress]);

  const saveOnExit = useCallback(() => {
    const sp = sessionPointsRef.current;
    const rs = rachaSessionRef.current;
    const u = userRef.current;

    const deltaPuntos = sp - lastSavedPointsRef.current;
    if (u.user === "guest") return;
    if (deltaPuntos <= 0 && rs <= lastSavedRachaRef.current) return;

    lastSavedPointsRef.current = sp;
    lastSavedRachaRef.current = rs;

    fetch(`${URL_BASE}/db/upl-points`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData: u,
        newPunt: Math.max(deltaPuntos, 0),
        rachaSession: rs,
      }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") saveOnExit();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleBeforeUnload = () => saveOnExit();
    window.addEventListener("beforeunload", handleBeforeUnload);

    const intervalId = setInterval(() => saveProgress(), 180000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(intervalId);
    };
  }, [saveProgress, saveOnExit]);

  const handleClickVerificar = useCallback(
    (obj, verificar, ingTxtsEstado) => {
      if (obj.ing !== verificar) {
        if (rachaSession !== 0) {
          setRachaSession(0);
          setRacha((prev) => (rachaSession > prev ? rachaSession : prev));
        }
        return false;
      }

      setRachaSession((prev) => prev + 1);
      setSessionPoints((prev) => prev + 1);

      const currentResolved = resueltosObj[keyActual] || [];
      if (currentResolved.some((item) => item.id === objetoPrincipal.id)) {
        console.log("YA ESTA EN LA LISTA DE ACIERTOS");
        return;
      }

      const currentUnresolved = noResueltosObj[keyActual] || [];
      const updatedResolved = [...currentResolved, objetoPrincipal];
      const updatedUnresolved = currentUnresolved.filter(
        (elem) => elem.id !== obj.id
      );

      setInTxts(
        ingTxtsEstado.map((txt) =>
          txt.id === obj.id ? { ...txt, activo: true } : txt
        )
      );
      setResueltosObj((prev) => ({ ...prev, [keyActual]: updatedResolved }));
      setNoResueltosObj((prev) => ({ ...prev, [keyActual]: updatedUnresolved }));

      setTimeout(() => {
        const nextObj = elegirObjetoEnArray(updatedUnresolved);
        if (nextObj) {
          setObjetoPrincipal(nextObj);
        } else {
          setObjetoPrincipal({ id: 0, url: urlImgComplete });
          setKeywords((prev) => ({
            ...prev,
            [keyActual]: { ...prev[keyActual], terminado: true },
          }));
          setTimeout(() => saveProgress(), 200);
        }
      }, 500);

      return true;
    },
    [
      rachaSession,
      resueltosObj,
      noResueltosObj,
      keyActual,
      objetoPrincipal,
      setRacha,
    ]
  );

  const reloadCategoria = useCallback(() => {
    const freshData = dataActual.map((obj) => ({ ...obj, activo: false }));
    setDataActual(freshData);
    setInTxts((prev) =>
      prev.map((obj) => ({ ...obj, activo: false }))
    );
    setEsTxts((prev) =>
      prev.map((obj) => ({ ...obj, activo: false }))
    );

    setNoResueltosObj((prev) => ({
      ...prev,
      [keyActual]: freshData,
    }));
    setResueltosObj((prev) => ({
      ...prev,
      [keyActual]: [],
    }));

    const objRandom = elegirObjetoEnArray(freshData);
    if (objRandom) setObjetoPrincipal(objRandom);
  }, [keyActual, dataActual]);

  const handleClickElemList = useCallback(
    (key) => {
      saveProgress();
      const resolved = (resueltosObj[key] || []).map((item) => ({
        ...item,
        activo: true,
      }));
      const unresolved = noResueltosObj[key] || [];
      const arrayConcatenado = [...resolved, ...unresolved].sort(
        (a, b) => a.id - b.id
      );
      setDataActual(arrayConcatenado);
      setKeyActual(key);
      setObjetoPrincipal(elegirObjetoEnArray(unresolved));
    },
    [resueltosObj, noResueltosObj, saveProgress]
  );

  const handleClickVolverCategs = useCallback(() => {}, []);

  const handleClickElimiarAciertos = useCallback((k) => {
    setResueltosObj((prev) => {
      const nw = { ...prev };
      delete nw[k];
      return nw;
    });
  }, []);

  const reloadPoints = useCallback(() => {
    setPoints(0);
  }, [setPoints]);

  const reloadApp = useCallback(() => {
    console.log("RELOAD JEJE");
  }, []);

  const resetSession = useCallback(() => {
    setSessionPoints(0);
    setRachaSession(0);
    lastSavedPointsRef.current = 0;
    lastSavedRachaRef.current = 0;
    setResueltosObj((prev) => {
      const nw = {};
      Object.keys(prev).forEach((key) => {
        nw[key] = [];
      });
      return nw;
    });
  }, []);

  return {
    dataActual,
    resueltosObj,
    noResueltosObj,
    keyActual,
    objetoPrincipal,
    keywords,
    sessionPoints,
    rachaSession,
    ingTxts,
    espTxts,
    urlRaizApi,
    urlImgComplete,
    handleImagePrincClick,
    pointsManager,
    handleClickVerificar,
    reloadCategoria,
    handleClickElemList,
    handleClickVolverCategs,
    handleClickElimiarAciertos,
    reloadPoints,
    uploadPoints,
    reloadApp,
    resetSession,
  };
}
