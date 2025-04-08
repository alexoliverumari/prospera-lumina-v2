import { useEffect, useState } from "react";
import { getDividas, criarDivida, atualizarDivida, deleteDivida } from "../services/api";
import { toast } from 'sonner'
import { Plus, Pencil, Trash2 } from "lucide-react";
import ModalEditarDivida from "../components/ModalEditarDivida";
import { fetchCards } from "../services/api";

interface Divida {
  id: number;
  descricao: string;
  categoria: string;
  valor_total: number;
  numero_parcelas: number;
  data_compra: string;
  situacao: string;
  cartao_id: number;
}

export default function Dividas() {
  const [dividas, setDividas] = useState<Divida[]>([]);
  const [novaDivida, setNovaDivida] = useState<Omit<Divida, "id">>({
    descricao: "",
    categoria: "",
    valor_total: 0,
    numero_parcelas: 1,
    data_compra: "",
    situacao: "pendente",
    cartao_id: 1,
  });
  const [modalAberto, setModalAberto] = useState(false);
  const [dividaEditando, setDividaEditando] = useState<Divida | null>(null);

  const carregarDividas = async () => {
    const dados = await getDividas();
    setDividas(dados);
  };

  useEffect(() => {
    carregarDividas();
  }, []);

  const handleCriar = async () => {
    await criarDivida(novaDivida);
    toast.success("Dívida cadastrada com sucesso!");
    setNovaDivida({ descricao: "", categoria: "", valor_total: 0, numero_parcelas: 1, data_compra: "", situacao: "pendente", cartao_id: 1 });
    carregarDividas();
  };

  const handleExcluir = async (id: number) => {
    await deleteDivida(id);
    toast.success("Dívida excluída!");
    carregarDividas();
  };

  const handleSalvarEdicao = async (dados: Divida) => {
    await atualizarDivida(dados.id, dados);
    toast.success("Dívida atualizada!");
    setModalAberto(false);
    carregarDividas();
  };


  const [cards, setCards] = useState<{ id: number; nome: string }[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | ''>('');

  useEffect(() => {
    const loadCards = async () => {
      const fetchedCards = await fetchCards();
      setCards(fetchedCards);
    };
    loadCards();
  }, []);

  const handleCardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCardId(Number(event.target.value));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dívidas</h1>
      <label htmlFor="card">Selecione um cartão: </label>
      <select
        id="card"
        value={selectedCardId}
        onChange={handleCardChange}
        required
      >
        <option value="" disabled>
          Escolha um cartão
        </option>
        {cards.map((card) => (
          <option key={card.id} value={card.id}>
            {card.nome}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input className="input" placeholder="Cartão" value={selectedCardId} readOnly onChange={(e) => setNovaDivida({ ...novaDivida, cartao_id: Number(e.target.value)})}/>
        <input className="input" placeholder="Descrição" value={novaDivida.descricao} onChange={(e) => setNovaDivida({ ...novaDivida, descricao: e.target.value })} />
        <input className="input" placeholder="Categoria" value={novaDivida.categoria} onChange={(e) => setNovaDivida({ ...novaDivida, categoria: e.target.value })} />
        <input className="input" type="number" placeholder="Valor Total" value={novaDivida.valor_total} onChange={(e) => setNovaDivida({ ...novaDivida, valor_total: parseFloat(e.target.value) })} />
        <input className="input" type="number" placeholder="Número de Parcelas" value={novaDivida.numero_parcelas} onChange={(e) => setNovaDivida({ ...novaDivida, numero_parcelas: parseInt(e.target.value) })} />
        <input className="input" type="date" placeholder="Data da Compra" value={novaDivida.data_compra} onChange={(e) => setNovaDivida({ ...novaDivida, data_compra: e.target.value })} />
        <button onClick={handleCriar} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">Cadastrar Dívida</button>
      </div>

      <ul className="space-y-4">
        {dividas.map((divida) => (
          <li key={divida.id} className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold">{divida.descricao}</p>
              <p className="text-sm text-gray-500">R$ {divida.valor_total.toFixed(2)} - {divida.categoria}</p>
              <p className="text-sm text-gray-500">Parcelas: {divida.numero_parcelas} - Situação: {divida.situacao}</p>
              <p className="text-sm text-gray-500">Data da Compra: {new Date(divida.data_compra).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Cartão: {cards.find(card => card.id === divida.cartao_id)?.nome}</p>
              
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setDividaEditando(divida); setModalAberto(true); }} className="text-blue-600 hover:text-blue-800"><Pencil size={18} /></button>
              <button onClick={() => handleExcluir(divida.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
              <button onClick={() => window.location.href = `/parcelas/${divida.id}`} className="text-blue-600 hover:underline mt-2">Ver Parcelas</button>
            </div>
          </li>
        ))}
      </ul>

      {modalAberto && dividaEditando && (
        <ModalEditarDivida
          aberto={modalAberto}
          aoFechar={() => setModalAberto(false)}
          divida={dividaEditando}
          aoSalvar={handleSalvarEdicao}
        />
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <Plus />
      </button>
    </div>
  );
}
