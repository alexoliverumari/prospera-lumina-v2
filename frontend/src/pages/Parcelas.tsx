// frontend/src/pages/Parcelas.tsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

interface Parcela {
  id: number
  numero: number
  valor: number
  data_vencimento: string
  situacao: string
}

const Parcelas = () => {
  const { id } = useParams<{ id: string }>()
  const [parcelas, setParcelas] = useState<Parcela[]>([])

  useEffect(() => {
    axios.get(`http://localhost:3333/parcelas/${id}`)
      .then(res => setParcelas(res.data))
      .catch(() => toast.error('Erro ao carregar parcelas'))
  }, [id])

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Parcelas da Dívida #{id}</h2>
      <div className="space-y-2">
        {parcelas.map(parcela => (
          <div key={parcela.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">Parcela {parcela.numero}</p>
              <p>Valor: R$ {parcela.valor.toFixed(2)}</p>
              <p>Vencimento: {parcela.data_vencimento}</p>
              <p>Situação: {parcela.situacao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Parcelas
