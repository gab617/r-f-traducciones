/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import './App.css'
import Categorias from './pages/Categorias/Categorias'
import Seleccion from './pages/Seleccion/Seleccion'
import { Aciertos } from './pages/Aciertos/Aciertos'
import { Context } from './Contexto/Context'
import { LoaderHamster } from './components/LoaderHamster'
import { Comp1 } from './Comp1'


function App() {
  const {
    loading,
    data, dataActual, resueltos, resueltosObj, keyActual, keywords,
    espTxts, ingTxts,
    reloadApp,
    handleImagePrincClick,
    handleClickElemList, handleClickVolverCategs,
    handleClickElimiarAciertos, urlRaizApi, objetoPrincipal
  }

    = useContext(Context)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    console.log(event)
    setMousePosition({ x: event.clientX, y: event.clientY });
  };



  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className='sm:w-90 m-auto'>

      <Router>
        <Routes>

          <Route
            path='/'
            element={
              <div className='flex flex-col items-center justify-center h-screen'>


                <div
                  className="dot"
                  style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                  }}
                ></div>
                {
                  loading &&

                  <>
                    {/* <Comp1></Comp1> */}
                    <LoaderHamster></LoaderHamster>
                    <h1 className='text-3xl'>Cargando datos...</h1>
                  </>
                }
                <Link className={`link-menu sm:w-1/2 ${loading ? 'hidden' : ''}`}
                  to={'/categorias'}

                >
                  Empezar!
                </Link>

                {/*                 <Link className='link-menu  sm:w-1/2' to={'/api'}>
                  Api
                </Link>
                <Link className='link-menu  sm:w-1/2' to={'/hi'}>
                  Hi!
                </Link> */}
              </div>

            }
          >
          </Route>

          <Route
            path='/categorias'
            element={
              <>
                {
                  data && (
                    <Categorias
                      keywords={keywords}
                      handleClickElemList={handleClickElemList}
                      reloadApp={reloadApp}
                    />
                  )
                }
              </>
            }>
          </Route>

          <Route
            path='/seleccion'
            element={
              <>
                {
                  data && (
                    <Seleccion
                      handleClickVolverCategs={handleClickVolverCategs}
                      keyActual={keyActual}
                      handleImagePrincClick={handleImagePrincClick}
                      urlRaizApi={urlRaizApi}
                      objetoPrincipal={objetoPrincipal}
                      dataActual={dataActual}
                      ingTxts={ingTxts}
                      espTxts={espTxts}
                      resueltos={resueltos}
                      resueltosObj={resueltosObj}
                      handleClickElimiarAciertos={handleClickElimiarAciertos}
                    />
                  )
                }
              </>
            }
          >
          </Route>

          <Route
            path='/acierts'
            element={
              <Aciertos
                resueltosObj={resueltosObj}
                handleClickElimiarAciertos={handleClickElimiarAciertos}
                urlRaizApi={urlRaizApi}
              />
            }
          >
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
