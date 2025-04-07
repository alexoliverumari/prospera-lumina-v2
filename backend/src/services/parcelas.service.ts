import db from '../database/connection';

export function listarParcelas() {
  return db.prepare('SELECT * FROM parcelas').all()
}
export const listarPorDivida = (dividaId: number) => {
    const stmt = db.prepare('SELECT * FROM parcelas WHERE divida_id = ? ORDER BY numero')
    return stmt.all(dividaId)
  }
  
export function criarParcela(data: any) {
  const stmt = db.prepare(`
    INSERT INTO parcelas (numero, valor, data_vencimento, situacao, divida_id, criado_em, atualizado_em)
    VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `)
  const result = stmt.run(
    data.numero,
    data.valor,
    data.data_vencimento,
    data.situacao,
    data.divida_id
  )
  return { id: result.lastInsertRowid, ...data }
}

export function atualizarParcela(id: number, data: any) {
  const stmt = db.prepare(`
    UPDATE parcelas
    SET numero = ?, valor = ?, data_vencimento = ?, situacao = ?, atualizado_em = datetime('now')
    WHERE id = ?
  `)
  stmt.run(
    data.numero,
    data.valor,
    data.data_vencimento,
    data.situacao,
    id
  )
  return { id, ...data }
}

export function deletarParcela(id: number) {
  db.prepare('DELETE FROM parcelas WHERE id = ?').run(id)
}
