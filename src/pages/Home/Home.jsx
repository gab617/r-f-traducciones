import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderHamster } from "../../components/LoaderHamster";
import { FormRegister } from "./FormRegister";
import { FormLogin } from "./FormLogin";
import { Context } from "../../Contexto/Context";
import { CardUser } from "./CardUser";
import { useEffect } from "react";
import { BntRankingChange } from "./BntRankingChange";
import "./btn-home.css"

const Ranking = ({ users, loading }) => {
  const [rachasManager, setRachasManager] = useState(false);
  const [usersOrderRacha, setUsersOrderRacha] = useState();
  let counter = 0;

  function changeRachas() {
    setRachasManager((prevState) => !prevState);
    counter = 0;
  }

  useEffect(() => {
    if (!users) return;
    setUsersOrderRacha([...users]?.sort((a, b) => b.best_racha - a.best_racha));
  }, [users]);

  return (
    <div
      className={` w-72 h-50 p-4 border rounded-xl border-gray-300 overflow-auto ${
        loading ? "hidden" : ""
      }`}
      style={{
        background:
          "linear-gradient(15deg, rgba(242,156,80,1) 0%, rgba(126,0,222,1) 100%)",
        boxShadow: "0px 0px 12px 10px rgba(80,207,156,1)",
      }}
    >
      {" "}
      <div className="flex justify-between transition-all duration-300 ease-in-out">
        <h1 className="mb-4 lg:text-2xl text-yellow-400 font-bold">Ranking</h1>
        <BntRankingChange changeRachas={changeRachas}></BntRankingChange>
      </div>
      {/* -------- */}
      {!rachasManager ? (
        <>
          <h2 className="font-bold text-lg text-red-200">Puntuación Global</h2>
          {users &&
            users?.map((user) => {
              counter++;
              return (
                <div
                  className="flex justify-between text-xl font-semibold"
                  key={user?.user_handle}
                >
                  <div className="flex gap-2">
                    <p className="text-sm mt-2">{counter}</p>
                    <p className="">{user?.user_handle}</p>
                  </div>
                  <div>
                    <p>{user?.points}</p>
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <>
          <h2 className="font-bold text-lg text-red-200">Mayor Racha</h2>
          {usersOrderRacha &&
            usersOrderRacha?.map((user) => {
              counter++;
              return (
                <div
                  className="flex justify-between text-xl font-semibold"
                  key={user?.user_handle}
                >
                  <div className="flex gap-2">
                    <p className="text-sm mt-2">{counter}</p>
                    <p className="">{user?.user_handle}</p>
                  </div>
                  <div>
                    <p>{user?.best_racha}</p>
                  </div>
                </div>
              );
            })}
        </>
      )}
      {/* -------- */}
    </div>
  );
};

const Formularios = ({ actionUserLogin, defUser, loading, user, login }) => {
  return (
    <div
      className={`flex justify-start ${
        loading || user.user !== "guest" ? "hidden" : ""
      }`}
    >
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
    </div>
  );
};

const Profile = ({ user, closeUser, points }) => {
  return (
    <div
      className={`w-80 flex flex-col ${user?.user !== "guest" ? "" : "hidden"}`}
    >
      <h1 className="text-white text-center font-bold">PERFIL</h1>
      <CardUser closeUser={closeUser} points={points} />
      <Link to={"/categorias"} className="mt-16 mx-auto ">
        <button
          className="px-8 py-2 text-white font-bold text-lg rounded-full shadow-lg transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-green-600 hover:shadow-green-500/50 hover:shadow-2xl focus:outline-none"
          id="startButton"
        >
          Volver a Categorias
        </button>
      </Link>
    </div>
  );
};

export function Home({ loading }) {
  const [login, setLogin] = useState(true);
  const { defUser, user, closeUser, points, users, conectBD } =
    useContext(Context);

  function actionUserLogin() {
    setLogin(!login);
  }
  return (
    <div
      className={` ${
        loading || user.user !== "guest"
          ? "items-center text-wrap"
          : "items-center"
      }  flex flex-col mt-5 lg:mt-20`}
    >
      <div className="lg:flex ">
        <h1
          className={` w-[90%] m-auto mb-6 lg:text-2xl lg:w-[80%] lg:mx-auto text-white`}
        >
          Enfocado en el aprendizaje de vocabulario básico en inglés, organizado
          por categorías y acompañado de imágenes ilustrativas que facilitan la
          memorización y el entendimiento.
        </h1>
      </div>
      {loading && (
        <>
          {/* <Comp1></Comp1> */}
          <LoaderHamster></LoaderHamster>
          <h1 className="text-3xl">Cargando datos...</h1>
        </>
      )}
      <div
        className={`flex flex-col items-center sm:items-stretch sm:flex-row w-full justify-center gap-5 ${
          conectBD ? "block" : "hidden"
        }`}
      >
        <Formularios
          actionUserLogin={actionUserLogin}
          defUser={defUser}
          loading={loading}
          user={user}
          login={login}
        />
        <Ranking users={users} loading={loading} />
        <Profile user={user} closeUser={closeUser} points={points}></Profile>
      </div>

      <Link
        className={`mt-5 ${
          loading || user.user !== "guest" ? "hidden" : ""
        }`}
        to={"/categorias"}
      >
        <div className="btn-home lg:text-2xl">
          <button className="">
            <span></span>
            <p
              data-start="good luck!"
              data-text="start!"
              data-title="Continuar Como Invitado"
            ></p>
          </button>
        </div>
      </Link>
    </div>
  );
}
