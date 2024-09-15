import { fetchUsers, uploadPointsService } from "../servicios/serviciosUsuario";

export const getUsers = async () => {
    try {
        const users = await fetchUsers();
        console.log(users); // Muestra los datos de los usuarios
        return users; // Puedes devolver los usuarios si lo necesitas
    } catch (error) {
        console.error('Hubo un problema obteniendo los usuarios:', error);
        throw error; // O manejar el error según lo que necesites
    }
};


export const putPoints = async (userData, newPoints, rachaSession)=>{
    try {
        const res = await uploadPointsService(userData,newPoints, rachaSession)
        return res
    } catch (error) {
        console.error('Hubo un actualizando los puntos CL:', error);
        
    }
}