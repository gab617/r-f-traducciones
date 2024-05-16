
/* Recibe array de objetos y retorna uno al azar */
export function elegirObjetoEnArray(categArray) {
    // Obtener un objeto aleatorio de la categoría seleccionada
    if (!categArray) return
   /*  console.log(categArray) */
    let indiceAleatorio = Math.floor(Math.random() * categArray.length);
    return categArray[indiceAleatorio];
}

/* Recibe array de objetos y retorna las traducciones, ingles en pos0, español en pos1 */
export function textosTraducidos(categArray) {
    /* console.log('cargando traducciones de:', categArray) */
    let ingles = [];
    let espanol = [];
    categArray.forEach(item => {
        ingles.push({ id: item.id, palabra: item.ing, activo: item.activo });
        espanol.push({ id: item.id, palabra: item.esp, activo: item.activo });
    })
    /* console.log(categArray) */
    return [ingles, espanol]
}

export function objKeysVacio(keywords) {
    let objeto = {}
    keywords?.forEach(key => {
        objeto[key] = []
    })
    /* console.log(objeto) */

    return objeto
}

/* Recibe un json entero, del cual retorna un array de objetos correspondiente a la clave aleatoria*/
export function elegirAleatorio(json) {
    let keys = Object.keys(json);
    let claveAleatoria = keys[Math.floor(Math.random() * keys.length)];
    /* console.log(claveAleatoria) */
    return [claveAleatoria, json[claveAleatoria]]
}
