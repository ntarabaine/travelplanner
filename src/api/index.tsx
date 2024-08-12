export const api = async (url: number|string|undefined, method: string, body: object|string) => {
  try {
    const response = await fetch(`http://localhost:3000/viagens/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error("Erro ao conectar com a API");
    }

    return response.json(); 
    
  } catch (error) {
    console.error("Erro ao conectar com a API", error);
    throw error; 
  }
};
