/* eslint-disable react/prop-types */
import './BtnsOpciones.css'
import { Link } from "react-router-dom"
import { BtnOpc } from "./BtnOpc"
import { useEffect, useState } from 'react';

export default function BtnsOpciones({
    ingTxts,
    seleccionado, handleChangeSeleccionado, objetoPrincipal, handleClickVerificar
}) {

    function handleClickVerif(objetoPrinc, selecc, iTxts) {
        /* FUNCION DESDE CONTEXTO */
        let acierto = handleClickVerificar(objetoPrinc, selecc, iTxts)
        if (acierto) {
            setStyleVerificar('correcto')
            setTimeout(() => {
                setStyleVerificar('')
            }, 1000);
        } else {
            setStyleVerificar('incorrecto')
            setTimeout(() => {
                setStyleVerificar('')
            }, 1000);
        }
    }

    const [styleVerificar, setStyleVerificar] = useState('')


    return (
        <>
            <div className='
                flex text-center flex-wrap mt-5 
                sm:mt-5 
                sm:m-auto sm:w-1/2 
                sm:justify-center sm:text-center
            '>
                {
                    ingTxts && ingTxts.map(txtIng => {
                        return (
                            <BtnOpc
                                key={txtIng.id}
                                txtIng={txtIng}
                                handleChangeSeleccionado={handleChangeSeleccionado}
                                seleccionado={seleccionado}

                            />
                        )
                    })
                }
            </div>

            <div>
                <div className='flex flex-col sm:flex-row justify-center space-around w-full items-center mb-5'>

                    {
                        seleccionado && (
                            <>
                                <h1 className='
                                    text-6xl
                                    mt-5
                                    sm:mr-9 
                                    sm:text-8xl 
                                    sm:mb-10
                                    mb-5
                                    text-blue-500'>
                                    {seleccionado}</h1>
                            </>
                        )
                    }

                    <div className="flex items-center">

                        <div className={styleVerificar}>
                            <button
                                className='btn-verificar'
                                onClick={
                                    () => handleClickVerif(objetoPrincipal, seleccionado, ingTxts)
                                }>

                            </button>
                        </div>

                    </div>

                </div>
                <Link
                    className='btn-aciertos'
                    /* className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" */
                    to={'/acierts'}>
                    ACIERTOS
                </Link>
            </div>
        </>
    )
}
