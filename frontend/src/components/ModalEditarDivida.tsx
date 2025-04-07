import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  aberto: boolean;
  aoFechar: () => void;
  aoSalvar: (divida: any) => void;
  divida: any;
}

export default function ModalEditarDivida({ aberto, aoFechar, aoSalvar, divida }: Props) {
  const [form, setForm] = useState(divida);

  const salvar = () => {
    aoSalvar(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <button onClick={aoFechar} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Editar Dívida</h2>

        <input className="input" placeholder="Descrição" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
        <input className="input" placeholder="Categoria" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
        <input className="input" type="number" placeholder="Valor Total" value={form.valor_total} onChange={(e) => setForm({ ...form, valor_total: parseFloat(e.target.value) })} />
        <input className="input" type="number" placeholder="Parcelas" value={form.numero_parcelas} onChange={(e) => setForm({ ...form, numero_parcelas: parseInt(e.target.value) })} />
        <input className="input" type="date" placeholder="Data Compra" value={form.data_compra} onChange={(e) => setForm({ ...form, data_compra: e.target.value })} />
        <button onClick={salvar} className="bg-green-600 hover:bg-green-700 text-white py-2 mt-4 w-full rounded">Salvar Alterações</button>
      </div>
    </motion.div>
  );
}
