import { addMonths, setDate, isAfter, parseISO } from 'date-fns'

export function calcularVencimentos(dataCompraStr: string, qtdParcelas: number, diaFechamento: number, diaVencimento: number): string[] {
  const dataCompra = parseISO(dataCompraStr)
  const vencimentos: string[] = []

  for (let i = 0; i < qtdParcelas; i++) {
    let dataReferencia = addMonths(dataCompra, i)

    const dataFechamento = setDate(dataReferencia, diaFechamento)
    const dataVencimento = setDate(addMonths(dataReferencia, isAfter(dataCompra, dataFechamento) ? 1 : 0), diaVencimento)

    vencimentos.push(dataVencimento.toISOString().split('T')[0])
  }

  return vencimentos
}
