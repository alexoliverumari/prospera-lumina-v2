import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useCardContext } from "../context/CardContext";
import { toast } from "sonner";

interface Props {
  onUpdated: () => void;
}

export function EditCardModal({ onUpdated }: Props) {
  const { editingCard, setEditingCard } = useCardContext();
  const [form, setForm] = useState({ nome: "", limite: 0, fechamento: 1, vencimento: 1 });

  useEffect(() => {
    if (editingCard) {
      setForm({
        nome: editingCard.nome,
        limite: editingCard.limite,
        fechamento: editingCard.fechamento,
        vencimento: editingCard.vencimento,
      });
    }
  }, [editingCard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;
    try {
        await axios.put(`http://localhost:3333/cartoes/${editingCard.id}`, form);
        onUpdated();
        setEditingCard(null);
        toast.success('Cartão editado com sucesso!')
    } catch (error) {
        toast.error('Erro ao editar cartão')
    }
  };

  return (
    <AnimatePresence>
      {editingCard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Editar Cartão</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="Nome do cartão"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                value={form.limite}
                onChange={(e) => setForm({ ...form, limite: Number(e.target.value) })}
                placeholder="Limite"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                value={form.fechamento}
                onChange={(e) => setForm({ ...form, fechamento: Number(e.target.value) })}
                placeholder="Dia de fechamento"
                className="w-full p-2 border rounded"
                min={1} max={31}
              />
              <input
                type="number"
                value={form.vencimento}
                onChange={(e) => setForm({ ...form, vencimento: Number(e.target.value) })}
                placeholder="Dia de vencimento"
                className="w-full p-2 border rounded"
                min={1} max={31}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Salvar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
