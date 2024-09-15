import { createContext, useEffect, useState } from "react";
import {
  elegirAleatorio,
  elegirObjetoEnArray,
  textosTraducidos,
  objKeysVacio,
} from "../funciones";
import { getUsers, putPoints } from "./usersActions";

export const Context = createContext({});
/* const urlRaizApi = "http://localhost:3000" */
const urlRaizApi = "https://serviciosunificados.onrender.com";
const urlImgComplete = "https://serviciosunificados.onrender.com/bw/completed";

// eslint-disable-next-line react/prop-types
export function ContextProvider({ children }) {
  const [data, setData] = useState({});
  const [dataActual, setDataActual] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conectBD, setConectBD] = useState(false);

  /* Usuario/s */
  const [users, setUsers] = useState();
  const [user, setUser] = useState({ user: "guest", points: 0 });
  const [points, setPoints] = useState(0);
  const [racha, setRacha] = useState(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [rachaSession, setRachaSession] = useState(0);

  /* Estados de la aplicacion */
  const [resueltosObj, setResueltosObj] = useState({});
  const [noResueltosObj, setNoResueltosObj] = useState({});
  const [keyActual, setKeyActual] = useState("");
  const [objetoPrincipal, setObjetoPrincipal] = useState();
  const [keywords, setKeywords] = useState({});

  const [espTxts, setEsTxts] = useState([]);
  const [ingTxts, setInTxts] = useState([]);

  function reloadPoints() {
    setPoints(0);
  }

  function uploadPoints() {
    if (user.user === "guest") {
      alert(
        'Para guardar un progreso debes registrarte e ingresar. Actualmente estas en modo invitado "guest"'
      );
      return;
    }
    console.log("upload", user, sessionPoints, rachaSession);
    putPoints(user, sessionPoints, rachaSession).then((res) => {
      console.log(res);
      setPoints(points + sessionPoints);
      if (rachaSession > racha) {
        setRacha(rachaSession);
      }
    });
  }

  function handleImagePrincClick() {
    console.log(objetoPrincipal);
  }

  function defUser(user) {
    setUser(user);
    setPoints(user.points);
    setRacha(user.best_racha);
  }

  function closeUser() {
    setUser({ user: "guest", points: 0 });
    setPoints(0);
    setSessionPoints(0);
    setRachaSession(0);
    setRacha(0);
    for (const key in resueltosObj) {
      if (Array.isArray(resueltosObj[key])) { 
        resueltosObj[key].forEach((obj) => {
          resueltosObj[key] = []
        });
      }
    }


  }

  function pointsManager() {
    setSessionPoints(sessionPoints + 1);
  }

  /* Seleccion Context */
  function handleClickVerificar(obj, verificar, ingTxtsEstado) {
    console.log(keyActual, ": ", obj, verificar);
    if (obj.ing != verificar) {
      if (rachaSession !== 0) {
        setRachaSession(0);
        if (rachaSession > racha) {
          console.log("Nueva racha ", rachaSession);
          setRacha(rachaSession);
        }
      }
      return false;
    }
    console.log("Acierto");
    setRachaSession(rachaSession + 1);
    pointsManager();
    let objetoEnData = dataActual.find((elem) => elem.id == obj.id);
    objetoEnData.activo = true;

    let objetoSoloTexto = ingTxtsEstado.find((object) => object.id == obj.id);
    objetoSoloTexto.activo = true;

    let resueltosHastaElMomento = resueltosObj[keyActual];
    let arraySinResoluciones = noResueltosObj[keyActual];

    if (resueltosHastaElMomento.length == 0) {
      resueltosObj[keyActual].push(objetoPrincipal);
      resueltosHastaElMomento = resueltosObj[keyActual];
      console.log("Primer Acierto:", resueltosObj);
      noResueltosObj[keyActual] = arraySinResoluciones.filter(
        (elem) => elem.id != obj.id
      );
    } else {
      if (resueltosHastaElMomento.includes(objetoPrincipal)) {
        console.log("YA ESTA EN LA LISTA DE ACIERTOS");
        return;
      } else {
        resueltosObj[keyActual]?.push(objetoPrincipal);
        noResueltosObj[keyActual] = arraySinResoluciones.filter(
          (elem) => elem.id != obj.id
        );
      }
    }
    /* TIEMPO PAUSA AGREGADO PARA NO SOBREPISAR PARPADEO DE CORRECTO EN COMPONENTE SELECCION.JSX */
    setTimeout(() => {
      setObjetoPrincipal(elegirObjetoEnArray(noResueltosObj[keyActual]));
    }, 500);
    console.log(resueltosObj[keyActual], noResueltosObj[keyActual]);
    if (noResueltosObj[keyActual].length == 0) {
      console.log("NO HAY MAS ELEMENTOS PARA RESOLVER");
      setObjetoPrincipal({
        id: 0,
        url: urlImgComplete,
      });
      keywords[keyActual].terminado = true;
    }
    return true;
  }

  /* La funcion eligira un elemento que ya este resuelto, por ende, la imagen cambiara, por ende, se re-renderizara todo el componente con los nuevos valores. */
  function reloadCategoria() {
    let objRandom = {};

    if (resueltosObj[keyActual].length == 0) {
      console.log("ESTA SIN ACIERTOS ESTA CATEGORIA");
      return;
    }
    dataActual?.map((obj) => {
      obj.activo = false;
    });
    ingTxts?.map((obj) => {
      obj.activo = false;
    });
    if (noResueltosObj[keyActual].length != 0) {
      console.log("aun quedan");
      objRandom = elegirObjetoEnArray(resueltosObj[keyActual]);
    } else {
      console.log("vacio");
      objRandom = elegirObjetoEnArray(dataActual);
    }

    console.log(dataActual, ingTxts);
    noResueltosObj[keyActual] = dataActual;
    resueltosObj[keyActual] = [];
    setObjetoPrincipal(objRandom);
  }

  function handleClickElemList(key) {
    /*         if (keywords[key].terminado == true) {
                    setObjetoPrincipal({
                        id: 0,
                        url: urlImgComplete
                    })
                    return
                } */

    let arrayConcatenado = resueltosObj[key].concat(noResueltosObj[key]);
    arrayConcatenado.sort((a, b) => a.id - b.id);
    let objRandom = elegirObjetoEnArray(noResueltosObj[key]);
    setDataActual(arrayConcatenado);
    setKeyActual(key);
    setObjetoPrincipal(objRandom);
  }

  function handleClickVolverCategs() {
    /*         let dataAleatoria = elegirAleatorio(data)
                setKeyActual(dataAleatoria[0])
                setDataActual(dataAleatoria[1]) */
  }

  function handleClickElimiarAciertos(k) {
    console.log("Se quiere eliminar: ", resueltosObj[k]);
    let nwObj = resueltosObj;
    delete nwObj[k];
    console.log(nwObj, "DELETE ", k);
    setResueltosObj(nwObj);
  }

  function reloadApp() {
    /* Buscar manera de hacer esto desde el cliente para usar datos originales que se supone que ya estan cargados */
    console.log("RELOAD JEJE");
  }

  useEffect(() => {
    setLoading(true);

    fetch(urlRaizApi + "/bw/databw")
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          // Código que deseas ejecutar después del retardo
          setData(json);

          let kwords = Object.keys(json);
          let objKeys = {};
          kwords.forEach((k) => {
            objKeys[k] = { key: k, terminado: false };
          });
          /* console.log(objKeys) */
          setKeywords(objKeys);

          let primerCargaRandom = elegirAleatorio(json);
          setKeyActual(primerCargaRandom[0]);
          setDataActual(primerCargaRandom[1]);

          let arrayTraducciones = textosTraducidos(primerCargaRandom[1]);
          setInTxts(textosTraducidos(arrayTraducciones[0]));
          setEsTxts(textosTraducidos(arrayTraducciones[1]));

          let objPrinc = elegirObjetoEnArray(primerCargaRandom[1]);
          setObjetoPrincipal(objPrinc);
          setResueltosObj(objKeysVacio(kwords));
          setNoResueltosObj(json);
          console.log("Carga desde servidor exitosa: ", json);
          setLoading(false);
        }, 200);
      })
      .then(() => {
        getUsers().then((users) => {
          console.log(users, "Datos users");
          setConectBD(true)
          setUsers(users.sort((a, b) => b.points - a.points));
        }).catch((error)=>{
          console.error(error)
        })
      });
  }, []);

  useEffect(() => {
    /* console.log('cambio data actual') */
    let traducciones = textosTraducidos(dataActual);

    setInTxts(traducciones[0]);
    setEsTxts(traducciones[1]);
    let auxArray = noResueltosObj[keyActual];
    let objPrinc = elegirObjetoEnArray(auxArray);
    setObjetoPrincipal(objPrinc);
  }, [dataActual, keyActual, noResueltosObj]);

  return (
    <Context.Provider
      value={{
        loading,
        conectBD,
        user,
        users,
        racha,
        defUser,
        closeUser,
        points,
        sessionPoints,
        rachaSession,
        pointsManager,
        uploadPoints,
        data,
        reloadCategoria,
        dataActual,
        resueltosObj,
        keyActual,
        keywords,
        espTxts,
        ingTxts,
        objetoPrincipal,
        reloadApp,
        handleImagePrincClick,
        handleClickElemList,
        handleClickVolverCategs,
        handleClickElimiarAciertos,
        urlRaizApi,
        handleClickVerificar,
        urlImgComplete,
        reloadPoints,
      }}
    >
      {children}
    </Context.Provider>
  );
}
