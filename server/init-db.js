import pool from './db.js'
import { schemaSql, seedSql } from './utils/sqlContent.js'

async function init() {
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
