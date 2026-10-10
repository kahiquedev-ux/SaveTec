import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

export async function initializeDatabase() {
    db = await open({
        filename: join(__dirname, '../database/savetec.sqlite'),
        driver: sqlite3.Database
    });

    // Criar tabela de downloads
    await db.exec(`
        CREATE TABLE IF NOT EXISTS downloads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            titulo TEXT NOT NULL,
            formato TEXT NOT NULL,
            qualidade TEXT NOT NULL,
            ip TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Criar tabela de analytics
    await db.exec(`
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data DATE UNIQUE NOT NULL,
            total_downloads INTEGER DEFAULT 0,
            downloads_mp4 INTEGER DEFAULT 0,
            downloads_mp3 INTEGER DEFAULT 0
        )
    `);

    console.log('✅ Banco de dados SQLite inicializado');
    return db;
}

export function getDb() {
    return db;
}
