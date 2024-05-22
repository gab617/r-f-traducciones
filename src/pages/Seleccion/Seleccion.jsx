/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import ImagenPrincipal from '../../components/ImagenPrincipal'
import BtnsOpciones from '../../components/BtnsOpciones'
import { useContext, useState } from 'react'
import { Context } from '../../Contexto/Context'

import './seleccion.css'

export default function Seleccion({
    handleClickVolverCategs, keyActual,
    handleImagePrincClick, urlRaizApi,
    objetoPrincipal, dataActual,
    ingTxts, /* espTxts ,*/
    resueltosObj,
}) {

    const [seleccionado, setSeleccionado] = useState('')
    const { handleClickVerificar, reloadCategoria } = useContext(Context)

    function handleChangeSeleccionado(nwSelect) {
        setSeleccionado(nwSelect)
    }

    function reload() {
        console.log('RELOAD A: ', dataActual, ingTxts)
        reloadCategoria()
    }


    return (
        <div className='seleccion mt-5'>
            <div className=' flex flex-col sm:flex-row items-center justify-between'>
                <div className='flex text-center items-center'>
                    <Link
                        className="
                            bg-blue-400
                            bg-opacity-35
                            hover:bg-blue-500 
                            text-white
                            text-opacity-80
                            font-semibold 
                            hover:text-white px-4 border 
                            border-blue-500 hover:border-transparent 
                            rounded ml-3
                            text-2xl
                            sm:text-3xl sm:py-2
                            "
                        to={'/categorias'}
                        onClick={handleClickVolverCategs}>
                        Categorias
                    </Link>
                    <h1 className='text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center ml-3'>
                        {keyActual.charAt(0).toUpperCase() + keyActual.slice(1)}
                    </h1>
                </div>
                <button
                    className='btn-reload'
                    onClick={reload}
                >
                    <span>REINICIAR</span>
                </button>
            </div>

            <div className=''>
                {
                    dataActual && (
                        <ImagenPrincipal
                            handleImagePrincClick={handleImagePrincClick}
                            urlRaizApi={urlRaizApi}
                            objetoPrincipal={objetoPrincipal}
                        />

                    )
                }
                {
                    dataActual && (
                        <BtnsOpciones
                            ingTxts={ingTxts}
                            idObjetoPrincipal={objetoPrincipal?.id}
                            handleChangeSeleccionado={handleChangeSeleccionado}
                            seleccionado={seleccionado}
                            objetoPrincipal={objetoPrincipal}
                            handleClickVerificar={handleClickVerificar}
                        />
                    )
                }
            </div>
            <div>Rengav</div>



{/*             <div>
                {resueltosObj && resueltosObj[keyActual]?.map(obj => {
                    return (
                        <div>
                            <h1>{obj.esp}</h1>
                        </div>
                    )
                })}
            </div> */}

        </div>
    )
}
