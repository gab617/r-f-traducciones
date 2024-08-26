import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderHamster } from "../../components/LoaderHamster";
import { FormRegister } from "./FormRegister";
import { FormLogin } from "./FormLogin";
import { Context } from "../../Contexto/Context";
import { CardUser } from "./CardUser";

export function Home({ loading }) {
  const [login, setLogin] = useState(true);
  const { defUser, user, closeUser,points } = useContext(Context);

  function actionUserLogin() {
    setLogin(!login);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading && (
        <>
          {/* <Comp1></Comp1> */}
          <LoaderHamster></LoaderHamster>
          <h1 className="text-3xl">Cargando datos...</h1>
        </>
      )}
{/* 
      <div className={`${loading || user !== "guest" ? "hidden" : ""}`}>
        {login && (
          <div className={`${login ? "" : "hidden"}`}>
            <FormLogin
              actionUserLogin={actionUserLogin}
              defUser={defUser}
            ></FormLogin>
          </div>
        )}
        <div className={`${login ? "hidden" : ""}`}>
          <FormRegister
            actionUserLogin={actionUserLogin}
            defUser={defUser}
          ></FormRegister>
        </div>
      </div> */}
      <Link
        className={`mt-5 link-menu sm:w-1/2 ${
          loading || user !== "guest" ? "hidden" : ""
        }`}
        to={"/categorias"}
      >
        Continuar Invitado
      </Link>
{/*       <div className={`w-80 h-80 ${user !== "guest" ? "" : "hidden"}`}>
        <CardUser
          user={user}
          closeUser={closeUser}
          points={points}
        />
      </div> */}
    </div>
  );
}
