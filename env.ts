// Ficheiro env para colocar variáveis sensiveis 

// IP e Porta 
const LOCAL_IP = "192.168.1.83";
const PORT = "8000";

// Construção do URL com o IP e a Porta
export const BASE_URL = `http://${LOCAL_IP}:${PORT}`;

// Rotas necessárias para o projeto
export const API_ROUTES = {
  IMAGES: `${BASE_URL}/api/images`,
  LOGIN: `${BASE_URL}/api/customerLogin`,
  SIGNIN: `${BASE_URL}/api/register`,
  VEHICLES: `${BASE_URL}/api/vehicles`,
  CUSTOMER_NAME: `${BASE_URL}/api/customer/{id}`,
  CATEGORIES: `${BASE_URL}/api/categories`,
  RESERVATIONS: `${BASE_URL}/api/reserves`,
  RESERVATIONSUPDATE: `${BASE_URL}/api/reserves/{id}`,
  RESERVATIONSUPDATESTATUS: `${BASE_URL}/api/reservesConfirm/{id}`,
  FEATURES: `${BASE_URL}/api/features`,
  INSURANCES: `${BASE_URL}/api/insurances`,
  STANDS: `${BASE_URL}/api/stands`,
  RESERVE_POST: `${BASE_URL}/api/reservespost`,
  ANOMALIESTYPES: `${BASE_URL}/api/anomaliesTypes`,
  ANOMALIES: `${BASE_URL}/api/anomaliespost`,
  CUSTOMER_DETAILS: `${BASE_URL}/api/customer/{id}`,

};

