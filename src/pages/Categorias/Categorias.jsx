/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import './categorias.css'
import { useContext } from 'react'
import { Context } from '../../Contexto/Context'
import { Loader2 } from '../../components/Loader2'

export default function Categorias({ keywords, handleClickElemList }) {
  const { loading } = useContext(Context)
  return (
    <>
      <div className='categorias sm:py-2 flex mb-10 justify-center sm:justify-center' id='headerCategorias'>
        <Link className='link-header' to={'/'}>
          Inicio
        </Link>

        <Link className='link-header' to={'/acierts'}>
          Aciertos
        </Link>
        <Link className="link-header" to={"/seleccion"}>
          Jugar
        </Link>
        <Link className="link-header" to={"/translations"}>
          Traducciones
        </Link>
      </div>

      <h1
        className='mb-5 text-3xl text-white'
      >Listado de categorias: </h1>
      <ul className='text-center  sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-1'
      >
        {loading &&
          <>
            <Loader2></Loader2>
          </>
        }
        {
          keywords && Object.keys(keywords).map(k => {
            const objetoKey = keywords[k]
            return (
              <li
                className={`
                   
                  sm:px-4 mb-1 sm:mb-0 
                bg-gray-200 
                  
                  ${objetoKey.terminado ? 'categoriaRealizada' : 'li-categorias'}`}

                key={k}
              >
                <Link
                  className='sm:p-6 w-full flex justify-center'
                  to={'/seleccion'}
                  onClick={() => handleClickElemList(k)}

                >{k.toUpperCase()}</Link>
              </li>
            )
          })
        }
      </ul>
      <p className='text-gray-400'>Se agregaran nuevas categorias</p>
    </>
  )
}
