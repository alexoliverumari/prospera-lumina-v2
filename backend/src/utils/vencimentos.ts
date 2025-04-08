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
// import { addMonths, getDate, setDate, isAfter, isBefore } from 'date-fns';

// export function calcularVencimentos(
//   dataCompra: string,
//   diaFechamento: number,
//   diaVencimento: number
// ): Date {
//   const fechamento = setDate(new Date(dataCompra), diaFechamento);
//   const vencimentoBase = setDate(new Date(dataCompra), diaVencimento);

//   let dataVencimento: Date;

//   if (isBefore(dataCompra, fechamento) || getDate(dataCompra) === diaFechamento) {
//     // Compra antes ou no dia do fechamento → próxima fatura
//     dataVencimento = addMonths(vencimentoBase, 1);
//   } else {
//     // Compra após fechamento → fatura do mês seguinte
//     dataVencimento = addMonths(vencimentoBase, 2);
//   }

//   return dataVencimento;
// }
