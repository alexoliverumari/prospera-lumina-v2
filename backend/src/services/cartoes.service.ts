import db from '../database/connection';

export const CartoesService = {
  listar: () => {
    return db.prepare('SELECT * FROM cartoes').all();
  },

  buscarPorId: (id: number) => {
    return db.prepare('SELECT * FROM cartoes WHERE id = ?').get(id);
  },

  criar: (data: {
    nome: string;
    limite: number;
    fechamento: number;
    vencimento: number;
  }) => {
    const stmt = db.prepare(`
      INSERT INTO cartoes (nome, limite, fechamento, vencimento)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(data.nome, data.limite, data.fechamento, data.vencimento);
    return { id: result.lastInsertRowid, ...data };
  },

  atualizar: (
    id: number,
    data: { nome: string; limite: number; fechamento: number; vencimento: number }
  ) => {
    const stmt = db.prepare(`
      UPDATE cartoes
      SET nome = ?, limite = ?, fechamento = ?, vencimento = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(data.nome, data.limite, data.fechamento, data.vencimento, id);
    return { id, ...data };
  },

  deletar: (id: number) => {
    const stmt = db.prepare('DELETE FROM cartoes WHERE id = ?');
    stmt.run(id);
    return { id };
  },
};
