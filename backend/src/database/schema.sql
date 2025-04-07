-- Tabela: Cartões
CREATE TABLE IF NOT EXISTS cartoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  limite REAL NOT NULL,
  fechamento INTEGER NOT NULL CHECK (fechamento BETWEEN 1 AND 31),
  vencimento INTEGER NOT NULL CHECK (vencimento BETWEEN 1 AND 31),
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Dívidas
CREATE TABLE IF NOT EXISTS dividas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao TEXT NOT NULL,
  categoria TEXT NOT NULL,
  valor_total REAL NOT NULL,
  numero_parcelas INTEGER NOT NULL,
  data_compra TEXT NOT NULL,
  situacao TEXT NOT NULL CHECK (situacao IN ('pendente', 'paga', 'atrasada')),
  cartao_id INTEGER NOT NULL,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cartao_id) REFERENCES cartoes(id) ON DELETE CASCADE
);

-- Tabela: Parcelas
CREATE TABLE IF NOT EXISTS parcelas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero INTEGER NOT NULL,
  valor REAL NOT NULL,
  data_vencimento TEXT NOT NULL,
  situacao TEXT NOT NULL CHECK (situacao IN ('pendente', 'paga', 'atrasada')),
  divida_id INTEGER NOT NULL,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (divida_id) REFERENCES dividas(id) ON DELETE CASCADE
);
