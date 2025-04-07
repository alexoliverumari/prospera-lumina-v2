import db from '../database/connection';

import { calcularVencimentos } from '../utils/vencimentos'

interface Divida {
  descricao: string
  categoria: string
  valor_total: number
  numero_parcelas: number
  data_compra: string
  situacao: string
  cartao_id: number
}
export function atualizarDivida(id: number, dados: any) {
    const query = `
      UPDATE dividas
      SET descricao = ?, categoria = ?, valor_total = ?, numero_parcelas = ?,
          data_compra = ?, situacao = ?, cartao_id = ?, atualizado_em = datetime('now')
      WHERE id = ?
    `
  
    const { descricao, categoria, valor_total, numero_parcelas, data_compra, situacao, cartao_id } = dados
  
    const stmt = db.prepare(query)
    stmt.run(descricao, categoria, valor_total, numero_parcelas, data_compra, situacao, cartao_id, id)
  }


export function listarDividas() {
    const query = `
      SELECT d.*, c.nome AS nome_cartao
      FROM dividas d
      JOIN cartoes c ON c.id = d.cartao_id
      ORDER BY d.data_compra DESC
    `
    return db.prepare(query).all()
  }

export const criarDivida = (divida: Divida) => {
    const cartao = db.prepare('SELECT * FROM cartoes WHERE id = ?').get(divida.cartao_id) as {
        id: number
        nome: string
        limite: number
        fechamento: number
        vencimento: number
        criado_em: string
        atualizado_em: string
      }
  if (!cartao) throw new Error('Cartão não encontrado')

  const insert = db.prepare(`
    INSERT INTO dividas (descricao, categoria, valor_total, numero_parcelas, data_compra, situacao, cartao_id, criado_em, atualizado_em)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `)

  const result = insert.run(
    divida.descricao,
    divida.categoria,
    divida.valor_total,
    divida.numero_parcelas,
    divida.data_compra,
    divida.situacao,
    divida.cartao_id
  )

  const dividaId = result.lastInsertRowid as number

  // Cálculo e inserção das parcelas
  const valorParcela = divida.valor_total / divida.numero_parcelas
  const vencimentos = calcularVencimentos(divida.data_compra, divida.numero_parcelas, cartao.fechamento, cartao.vencimento)

  const insertParcela = db.prepare(`
    INSERT INTO parcelas (numero, valor, data_vencimento, situacao, divida_id, criado_em, atualizado_em)
    VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `)

  const insertMany = db.transaction((parcelas: any[]) => {
    for (const parcela of parcelas) {
      insertParcela.run(parcela.numero, parcela.valor, parcela.data, 'pendente', dividaId)
    }
  })

  const parcelasData = vencimentos.map((data, index) => ({
    numero: index + 1,
    valor: valorParcela,
    data
  }))

  insertMany(parcelasData)
}

// export function listar() {
//   return db.prepare('SELECT * FROM dividas').all()
// }

// export function criar(dados: any) {
//   const stmt = db.prepare(`
//     INSERT INTO dividas (descricao, categoria, valor_total, numero_parcelas, data_compra, situacao, cartao_id, criado_em, atualizado_em)
//     VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
//   `)

//   const result = stmt.run(
//     dados.descricao,
//     dados.categoria,
//     dados.valor_total,
//     dados.numero_parcelas,
//     dados.data_compra,
//     dados.situacao,
//     dados.cartao_id
//   )

//   return result.lastInsertRowid
// }

// export function atualizar(id: number, dados: any) {
//   const stmt = db.prepare(`
//     UPDATE dividas SET
//       descricao = ?,
//       categoria = ?,
//       valor_total = ?,
//       numero_parcelas = ?,
//       data_compra = ?,
//       situacao = ?,
//       cartao_id = ?,
//       atualizado_em = datetime('now')
//     WHERE id = ?
//   `)

//   stmt.run(
//     dados.descricao,
//     dados.categoria,
//     dados.valor_total,
//     dados.numero_parcelas,
//     dados.data_compra,
//     dados.situacao,
//     dados.cartao_id,
//     id
//   )
// }

export function excluirDivida(id: number) {
  const stmt = db.prepare('DELETE FROM dividas WHERE id = ?')
  stmt.run(id)
}
