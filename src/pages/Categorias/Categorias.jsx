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
      <div className='categorias mb-10' id='headerCategorias'>
        {/*         <button
          onClick={reloadApp}
        >Reload</button> */}
        <Link className='link-header' to={'/'}>
          Menu
        </Link>

        <Link
          className="link-header"
          to={'/seleccion'}
        >Eleccion Aleatoria
        </Link>
      </div>

      <h1
        className='mb-5 text-3xl text-white'
      >Listado de categorias: </h1>
      <ul className='text-center sm:flex'
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
                  li-categorias 
                  sm:px-4 py-4
                bg-gray-200 
                  
                  ${objetoKey.terminado ? 'text-white bg-green-700' : 'text-red-500'}`}

                key={k}
              >
                <Link
                  className='sm:p-6'
                  to={'/seleccion'}
                  onClick={() => handleClickElemList(k)}

                >{k.toUpperCase()}</Link>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}
