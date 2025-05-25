// Ficheiro env para colocar variáveis sensiveis 

// IP e Porta 
const LOCAL_IP = "192.168.1.117";
const PORT = "8000";

// Construção do URL com o IP e a Porta
export const BASE_URL = `http://${LOCAL_IP}:${PORT}`;

// Rotas necessárias para o projeto
export const API_ROUTES = {
  IMAGES: `${BASE_URL}/api/images`,
  LOGIN: `${BASE_URL}/api/CustomerLogin`,
  SIGNIN: `${BASE_URL}/api/register`,
};
