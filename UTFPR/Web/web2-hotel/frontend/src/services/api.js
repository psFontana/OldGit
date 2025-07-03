import axios from "axios";

// Crie uma instância do Axios
const api = axios.create({
  baseURL: "http://localhost:8081/api", // **Ajuste esta URL para a URL do seu backend!**
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Interceptor de requisições: Adiciona o token JWT a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Pega o token do localStorage
    if (token) {
      // Se houver um token, adicione-o ao cabeçalho Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
