import { useEffect, useState } from "react";
import axios from "axios";
import  CartaoForm  from "../components/CartaoForm";
import  { EditCardModal } from "../components/EditCardModal";
import { useCardContext } from "../context/CardContext";
import { toast } from 'sonner'  


interface Card {
  id: number;
  nome: string;
  limite: number;
  fechamento: number;
  vencimento: number;
}

export default function Cartoes() {
  const [cards, setCards] = useState<Card[]>([]);
  const { setEditingCard } = useCardContext();

  const fetchCards = async () => {
    const res = await axios.get("http://localhost:3333/cartoes");
    setCards(res.data);
  };

  const deleteCard = async (id: number) => {
    try
    {
        await axios.delete(`http://localhost:3333/cartoes/${id}`);
        fetchCards();
        toast.success('Cartão excluído com sucesso!')
    } catch (error) {
        toast.error('Erro ao excluir cartão')
    }
    };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cartões</h1>
      <CartaoForm onSuccess={fetchCards} />
      <div className="mt-6 space-y-4">
        {cards.map((card) => (
          <div key={card.id} className="p-4 bg-white shadow rounded-xl flex justify-between items-center">
            <div>
              <p className="font-semibold">{card.nome}</p>
              <p className="text-sm text-gray-600">Limite: R$ {card.limite.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Fechamento: {card.fechamento} | Vencimento: {card.vencimento}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(card)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => deleteCard(card.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      <EditCardModal onUpdated={fetchCards} />
    </div>
  );
}
