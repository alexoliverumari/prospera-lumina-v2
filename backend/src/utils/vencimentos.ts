import { addMonths, setDate, isAfter, parseISO } from 'date-fns'

export function calcularVencimentos(
  dataCompraStr: string,
  qtdParcelas: number,
  diaFechamento: number,
  diaVencimento: number
): string[] {
  const dataCompra = parseISO(dataCompraStr)
  const vencimentos: string[] = []

  // Define o primeiro mês de vencimento
  const dataFechamento = setDate(new Date(dataCompra), diaFechamento)

  let mesBase = isAfter(dataCompra, dataFechamento)
    ? addMonths(dataCompra, 1)
    : dataCompra

  // Parcela 1 → mesBase, Parcela 2 → mesBase+1, etc.
  for (let i = 0; i < qtdParcelas; i++) {
    const vencimento = setDate(addMonths(mesBase, i), diaVencimento)
    vencimentos.push(vencimento.toISOString().split('T')[0])
  }

  return vencimentos
}
