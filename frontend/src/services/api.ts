import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // ajuste se necessário
});

export default api;

export async function getDividas() {
    const res = await api.get("/dividas");
    return res.data;
  }
  
  export async function criarDivida(data: any) {
    const res = await api.post("/dividas", data);
    return res.data;
  }
  
  export async function atualizarDivida(id: number, data: any) {
    const res = await api.put(`/dividas/${id}`, data);
    return res.data;
  }
  
  export async function deleteDivida(id: number) {
    const res = await api.delete(`/dividas/${id}`);
    return res.data;
  }