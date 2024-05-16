/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Contexto/Context'


export function BtnOpc({ txtIng, idObjetoPrincipal,
      handleChangeSeleccionado }) {


    

    function handleClick() {
        handleChangeSeleccionado(txtIng?.palabra)
    }


    return (
        <div className='w-1/3'>
            <button
                className={
                    txtIng.activo ? `btn-opciones btn-opciones-true` : `btn-opciones` 
                }
                /* className={`bg-gray-200 ${txtIng.activo ? 'text-white bg-green-700' : 'text-red-500'}`} */
                onClick={handleClick}
            >{txtIng?.palabra}</button>
        </div>
    )
}

