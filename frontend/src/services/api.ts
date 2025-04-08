import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // ajuste se necessário
});



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

  export async function fetchCards () {
    try {
      const res = await api.get('/cartoes');
      console.log('Cartões recebidos:', res.data); // ✅ Verifica o formato
      return res.data;
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      return [];
    }
  };
  
export default api;