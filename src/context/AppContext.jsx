import { createContext, useCallback, useEffect, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useData } from "../hooks/useData";
import { useGame } from "../hooks/useGame";
import { usePing } from "../hooks/usePing";

export const AppContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
  const auth = useAuth();
  const { data, staticData, loading, users, conectBD, refreshUsers, updateUserScore } = useData();

  useEffect(() => {
    if (!users || !auth.user) return;
    const username = auth.user.user_handle || auth.user.user;
    if (!username || username === "guest") return;
    const match = users.find((u) => u.user_handle === username);
    if (!match) return;
    auth.setPoints(match.points);
    auth.setRacha(match.best_racha ?? 0);
    auth.setPointsMath(match.points_math ?? 0);
    auth.setRachaMath(match.best_racha_math ?? 0);
  }, [users, auth.user?.user_handle, auth.user?.user]);

  const game = useGame({
    data,
    user: auth.user,
    setPoints: auth.setPoints,
    setRacha: auth.setRacha,
    updateUserOnSave: auth.updateUserOnSave,
    onSaveRefreshUsers: refreshUsers,
  });
  usePing();

  const { closeUser: authCloseUser } = auth;
  const { resetSession } = game;
  const closeUser = useCallback(() => {
    authCloseUser();
    resetSession();
  }, [authCloseUser, resetSession]);

  const value = useMemo(
    () => ({
      loading,
      conectBD,
      user: auth.user,
      users,
      racha: auth.racha,
      rachaMath: auth.rachaMath,
      defUser: auth.defUser,
      closeUser,
      points: auth.points,
      pointsMath: auth.pointsMath,
      setPoints: auth.setPoints,
      setPointsMath: auth.setPointsMath,
      setRachaMath: auth.setRachaMath,
      sessionPoints: game.sessionPoints,
      rachaSession: game.rachaSession,
      pointsManager: game.pointsManager,
      uploadPoints: game.uploadPoints,
      data,
      staticData,
      reloadCategoria: game.reloadCategoria,
      dataActual: game.dataActual,
      resueltosObj: game.resueltosObj,
      keyActual: game.keyActual,
      keywords: game.keywords,
      espTxts: game.espTxts,
      ingTxts: game.ingTxts,
      objetoPrincipal: game.objetoPrincipal,
      reloadApp: game.reloadApp,
      handleImagePrincClick: game.handleImagePrincClick,
      handleClickElemList: game.handleClickElemList,
      handleClickVolverCategs: game.handleClickVolverCategs,
      handleClickElimiarAciertos: game.handleClickElimiarAciertos,
      urlRaizApi: game.urlRaizApi,
      handleClickVerificar: game.handleClickVerificar,
      urlImgComplete: game.urlImgComplete,
      reloadPoints: game.reloadPoints,
      refreshUsers,
      updateUserScore,
      loginWithData: auth.loginWithData,
    }),
    [
      loading, conectBD, auth.user, auth.racha, auth.rachaMath,
      auth.defUser, auth.points, auth.pointsMath,
      auth.setPoints, auth.setPointsMath, auth.setRachaMath, auth.loginWithData,
      closeUser, users, refreshUsers, updateUserScore,
      game.sessionPoints, game.rachaSession, game.pointsManager,
      game.uploadPoints, data, staticData, game.reloadCategoria,
      game.dataActual, game.resueltosObj, game.keyActual, game.keywords,
      game.espTxts, game.ingTxts, game.objetoPrincipal, game.reloadApp,
      game.handleImagePrincClick, game.handleClickElemList,
      game.handleClickVolverCategs, game.handleClickElimiarAciertos,
      game.urlRaizApi, game.handleClickVerificar, game.urlImgComplete,
      game.reloadPoints,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
