import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { criarDivida, atualizarDivida } from '../services/api'
import { Cartao } from '../types/Cartao'
import { Divida } from '../types/Divida'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  dividaEditando?: Divida | null
  cartoes: Cartao[]
}

export default function DividaModal({ isOpen, onClose, onSave, dividaEditando, cartoes }: Props) {
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [valorTotal, setValorTotal] = useState(0)
  const [numeroParcelas, setNumeroParcelas] = useState(1)
  const [dataCompra, setDataCompra] = useState('')
  const [situacao, setSituacao] = useState('pendente')
  const [cartaoId, setCartaoId] = useState<number | null>(null)

  useEffect(() => {
    if (dividaEditando) {
      setDescricao(dividaEditando.descricao)
      setCategoria(dividaEditando.categoria)
      setValorTotal(dividaEditando.valor_total)
      setNumeroParcelas(dividaEditando.numero_parcelas)
      setDataCompra(dividaEditando.data_compra)
      setSituacao(dividaEditando.situacao)
      setCartaoId(dividaEditando.cartao_id)
    } else {
      setDescricao('')
      setCategoria('')
      setValorTotal(0)
      setNumeroParcelas(1)
      setDataCompra('')
      setSituacao('pendente')
      setCartaoId(null)
    }
  }, [dividaEditando])

  const handleSubmit = async () => {
    try {
      const payload: Divida = {
        id: dividaEditando?.id ?? 0,
        descricao,
        categoria,
        valor_total: valorTotal,
        numero_parcelas: numeroParcelas,
        data_compra: dataCompra,
        situacao,
        cartao_id: cartaoId!,
        criado_em: '',
        atualizado_em: ''
      }

      if (dividaEditando) {
        await atualizarDivida(payload.id, payload)
        toast.success('Dívida atualizada com sucesso!')
      } else {
        await criarDivida(payload)
        toast.success('Dívida criada com sucesso!')
      }

      onSave()
      onClose()
    } catch (err) {
      console.error(err)
      toast.error('Erro ao salvar a dívida.')
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-xl font-bold">{
              dividaEditando ? 'Editar Dívida' : 'Nova Dívida'
            }</Dialog.Title>
            <button onClick={onClose}><X /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Descrição" className="input" value={descricao} onChange={e => setDescricao(e.target.value)} />
            <input type="text" placeholder="Categoria" className="input" value={categoria} onChange={e => setCategoria(e.target.value)} />
            <input type="number" placeholder="Valor Total" className="input" value={valorTotal} onChange={e => setValorTotal(+e.target.value)} />
            <input type="number" placeholder="Número de Parcelas" className="input" value={numeroParcelas} onChange={e => setNumeroParcelas(+e.target.value)} />
            <input type="date" className="input" value={dataCompra} onChange={e => setDataCompra(e.target.value)} />
            <select className="input" value={situacao} onChange={e => setSituacao(e.target.value)}>
              <option value="pendente">Pendente</option>
              <option value="paga">Paga</option>
            </select>
            <select className="input" value={cartaoId ?? ''} onChange={e => setCartaoId(+e.target.value)}>
              <option value="">Selecione o cartão</option>
              {cartoes.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button className="btn bg-blue-600 text-white rounded-xl px-4 py-2" onClick={handleSubmit}>
              {dividaEditando ? 'Salvar Alterações' : 'Criar Dívida'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
