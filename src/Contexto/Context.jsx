import { createContext, useEffect, useState } from 'react'
import { elegirAleatorio, elegirObjetoEnArray, textosTraducidos, objKeysVacio } from '../funciones'

export const Context = createContext({})
/* const urlRaizApi = "http://localhost:3000" */
const urlRaizApi = "https://e-b-js-traduciones.onrender.com"
const urlImgComplete = '/completed'


// eslint-disable-next-line react/prop-types
export function ContextProvider({ children }) {
    const [data, setData] = useState({})
    const [dataActual, setDataActual] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(loading)


    const [resueltosObj, setResueltosObj] = useState({})
    const [noResueltosObj, setNoResueltosObj] = useState({})
    const [keyActual, setKeyActual] = useState('')
    const [objetoPrincipal, setObjetoPrincipal] = useState()
    const [keywords, setKeywords] = useState({})

    const [espTxts, setEsTxts] = useState([])
    const [ingTxts, setInTxts] = useState([])


    function handleImagePrincClick() {
        console.log(objetoPrincipal)
    }

    /* Seleccion Context */

    function handleClickVerificar(obj, verificar, ingTxtsEstado) {
        console.log(keyActual, ': ', obj, verificar)
        if (obj.ing != verificar) return false
        console.log('Acierto')
        let objetoEnData = dataActual.find(elem => elem.id == obj.id)
        objetoEnData.activo = true

        let objetoSoloTexto = ingTxtsEstado.find(object => object.id == obj.id)
        objetoSoloTexto.activo = true

        let resueltosHastaElMomento = resueltosObj[keyActual]
        let arraySinResoluciones = noResueltosObj[keyActual]


        if (resueltosHastaElMomento.length == 0) {
            resueltosObj[keyActual].push(objetoPrincipal)
            resueltosHastaElMomento = resueltosObj[keyActual]
            console.log('Primer Acierto:', resueltosObj)
            noResueltosObj[keyActual] = arraySinResoluciones.filter(elem => elem.id != obj.id)
        } else {
            if (resueltosHastaElMomento.includes(objetoPrincipal)) {
                console.log('YA ESTA EN LA LISTA DE ACIERTOS')
                return
            } else {
                resueltosObj[keyActual]?.push(objetoPrincipal)
                noResueltosObj[keyActual] = arraySinResoluciones.filter(elem => elem.id != obj.id)
            }
        }

        setObjetoPrincipal(elegirObjetoEnArray(noResueltosObj[keyActual]))
        console.log(resueltosObj[keyActual], noResueltosObj[keyActual])
        if (noResueltosObj[keyActual].length == 0) {
            console.log('NO HAY MAS ELEMENTOS PARA RESOLVER')
            setObjetoPrincipal({
                id: 0,
                url: urlImgComplete
            })
            keywords[keyActual].terminado = true
        }
        return true
    }

    /* La funcion eligira un elemento que ya este resuelto, por ende, la imagen cambiara, por ende, se re-renderizara todo el componente con los nuevos valores. */
    function reloadCategoria() {
        let objRandom = {}
        dataActual?.map(obj => {
            obj.activo = false
        })
        ingTxts?.map(obj => {
            obj.activo = false
        })
        if (noResueltosObj[keyActual].length != 0) {
            console.log('aun quedan')
            objRandom = elegirObjetoEnArray(resueltosObj[keyActual])
        } else {
            console.log('vacio')
            objRandom = elegirObjetoEnArray(dataActual)
        }

        console.log(dataActual, ingTxts)
        noResueltosObj[keyActual] = dataActual
        resueltosObj[keyActual] = []
        setObjetoPrincipal(objRandom)
    }

    function handleClickElemList(key) {
        /*         if (keywords[key].terminado == true) {
                    setObjetoPrincipal({
                        id: 0,
                        url: urlImgComplete
                    })
                    return
                } */

        let arrayConcatenado = resueltosObj[key].concat(noResueltosObj[key])
        arrayConcatenado.sort((a, b) => a.id - b.id)
        let objRandom = elegirObjetoEnArray(noResueltosObj[key])
        setDataActual(arrayConcatenado)
        setKeyActual(key)
        setObjetoPrincipal(objRandom)
    }

    function handleClickVolverCategs() {
        /*         let dataAleatoria = elegirAleatorio(data)
                setKeyActual(dataAleatoria[0])
                setDataActual(dataAleatoria[1]) */
    }

    function handleClickElimiarAciertos(k) {
        console.log('Se quiere eliminar: ', resueltosObj[k])
        let nwObj = resueltosObj
        delete nwObj[k]
        console.log(nwObj, 'DELETE ', k)
        setResueltosObj(nwObj)
    }

    function reloadApp() { /* Buscar manera de hacer esto desde el cliente para usar datos originales que se supone que ya estan cargados */
        console.log('RELOAD JEJE')
    }

    useEffect(() => {
        setLoading(true)

        fetch(urlRaizApi + "/data-elements")
            .then(response => response.json())
            .then(json => {

                
                setTimeout(() => {
                    // Código que deseas ejecutar después del retardo
                    setData(json)

                    let kwords = Object.keys(json)
                    let objKeys = {}
                    kwords.forEach(k => {
                        objKeys[k] = { key: k, terminado: false }
                    })
                    /* console.log(objKeys) */
                    setKeywords(objKeys)
    
                    let primerCargaRandom = elegirAleatorio(json)
                    setKeyActual(primerCargaRandom[0])
                    setDataActual(primerCargaRandom[1])
    
                    let arrayTraducciones = textosTraducidos(primerCargaRandom[1])
                    setInTxts(textosTraducidos(arrayTraducciones[0]))
                    setEsTxts(textosTraducidos(arrayTraducciones[1]))
    
                    let objPrinc = elegirObjetoEnArray(primerCargaRandom[1])
                    setObjetoPrincipal(objPrinc)
                    setResueltosObj(objKeysVacio(kwords))
                    setNoResueltosObj(json)
                    console.log('Carga desde servidor exitosa: ', json)
                    setLoading(false)

                  }, 4000); 


            })
    }, [])

    useEffect(() => {
        /* console.log('cambio data actual') */
        let traducciones = textosTraducidos(dataActual)

        setInTxts(traducciones[0])
        setEsTxts(traducciones[1])
        let auxArray = noResueltosObj[keyActual]
        let objPrinc = elegirObjetoEnArray(auxArray)
        setObjetoPrincipal(objPrinc)
    }, [dataActual, keyActual, noResueltosObj])


    return (
        <Context.Provider
            value={{
                loading,
                data, reloadCategoria, dataActual, resueltosObj, keyActual, keywords,
                espTxts, ingTxts, objetoPrincipal,
                reloadApp,
                handleImagePrincClick,
                handleClickElemList, handleClickVolverCategs,
                handleClickElimiarAciertos, urlRaizApi, handleClickVerificar,
                urlImgComplete
            }}

        >
            {children}
        </Context.Provider>
    )
}
