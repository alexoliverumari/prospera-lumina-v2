import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DATABASE_URL || './database.sqlite';

// Verifica se o arquivo do banco já existe
const dbExists = fs.existsSync(dbPath);

// Conecta ao banco
const db = new Database(dbPath);

// Se o banco ainda não existir, aplica o schema
if (!dbExists) {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);
  console.log('📦 Banco de dados inicializado com sucesso!');
}

export default db;
