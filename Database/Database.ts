import * as SQLite from "expo-sqlite";

export async function initializeDatabase() {
  // Abrir/criar o banco de dados
  const db = await SQLite.openDatabaseAsync("mydatabase.db");

  // Criar a tabela se não existir
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
  `);

  console.log("Base de dados e tabela inicializados!");
  return db;
}

export async function addUser(db: SQLite.SQLiteDatabase, name: string, email: string) {
  try {
    const result = await db.runAsync("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    console.log("Utilizador inserido, ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
  }
}

export async function getAllUsers(db: SQLite.SQLiteDatabase) {
  try {
    const users = await db.getAllAsync("SELECT * FROM users");
    return users;
  } catch (error) {
    console.error("Erro ao buscar utilizador:", error);
    return [];
  }
}

export async function updateUser(db: SQLite.SQLiteDatabase, id: number, newName: string, newEmail: string) {
  try {
    await db.runAsync("UPDATE users SET name = ?, email = ? WHERE id = ?", [newName, newEmail, id]);
    console.log("Utilizador atualizado!");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
}

export async function deleteUser(db: SQLite.SQLiteDatabase, id: number) {
  try {
    await db.runAsync("DELETE FROM users WHERE id = ?", [id]);
    console.log("utilizador eliminado!");
  } catch (error) {
    console.error("Erro ao deletar utilizador:", error);
  }
}
