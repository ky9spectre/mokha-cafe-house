import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pool from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function init() {
  const schemaSql = fs.readFileSync(path.join(__dirname, 'utils', 'schema.sql'), 'utf8')
  const seedSql = fs.readFileSync(path.join(__dirname, 'utils', 'seed.sql'), 'utf8')

  const client = await pool.connect()
  try {
    console.log('Creating tables...')
    await client.query(schemaSql)
    console.log('✅ Tables created (or already exist)')
    console.log('Seeding menu...')
    await client.query(seedSql)
    console.log('✅ Seed data inserted')
  } catch (err) {
    console.error('❌ Database init error:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

init()
