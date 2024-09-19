const URLAPI = import.meta.env.VITE_URL_API;

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${URLAPI}/db/users-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    // Parsear la respuesta JSON
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


export const uploadPointsService = async (userData, points, rachaSession) => {
  const newPunt = points;
  try {
    const response = await fetch(`${URLAPI}/db/upl-points`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData, newPunt, rachaSession }),
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    // Parsear la respuesta JSON
    const resp = await response.json();
    return resp;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
