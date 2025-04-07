import { useState } from 'react';
import api from '../services/api';
import React from 'react';
import { toast } from 'sonner'

type Props = {
  onSuccess: () => void;
};

export default function CartaoForm({ onSuccess }: Props) {
  const [nome, setNome] = useState('');
  const [limite, setLimite] = useState('');
  const [fechamento, setFechamento] = useState('');
  const [vencimento, setVencimento] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await api.post('/cartoes', {
        nome,
        limite: parseFloat(limite),
        fechamento: parseInt(fechamento),
        vencimento: parseInt(vencimento),
        });
        setNome('');
        setLimite('');
        setFechamento('');
        setVencimento('');
        onSuccess();
        toast.success('Cartão cadastrado com sucesso!')
  } catch (error) {
    toast.error('Erro ao cadastrar cartão')
  }
    }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-2xl space-y-3">
      <input className="input" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input className="input" placeholder="Limite" value={limite} onChange={e => setLimite(e.target.value)} />
      <input className="input" placeholder="Fechamento (1-31)" value={fechamento} onChange={e => setFechamento(e.target.value)} />
      <input className="input" placeholder="Vencimento (1-31)" value={vencimento} onChange={e => setVencimento(e.target.value)} />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">Salvar</button>
    </form>
  );
}
