/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Loader } from "./Loader";

export default function ImagenPrincipal({ handleImagePrincClick, urlRaizApi, objetoPrincipal }) {
    const [loading, setLoading] = useState(false)
    const [actualImgUrl, setActualImgUrl] = useState(null);



    const handleImageLoad = () => {
        setLoading(false); // Cuando la nueva imagen se carga, establece el estado de carga como falso
    };

    useEffect(()=>{
        if(objetoPrincipal){
            setActualImgUrl(urlRaizApi + objetoPrincipal.url);
            setLoading(true); // Muestra el estado de carga mientras se carga la nueva imagen

        }
    },[objetoPrincipal,urlRaizApi])

    return (
        <div className="mb-1 mt-2 w-full">
            {loading && <Loader/>}
            <img
                onClick={handleImagePrincClick} 
                src={actualImgUrl} alt=""
                onLoad={handleImageLoad}
                className={`w-full sm:w-1/5 mx-auto ${loading ? 'hidden' : ''}`} 
            />


        </div>
    )
}
