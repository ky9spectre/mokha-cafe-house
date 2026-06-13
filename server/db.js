import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction && (!process.env.DATABASE_URL || !process.env.DATABASE_URL.includes('localhost'))
    ? { rejectUnauthorized: false }
    : false,
})

pool.on('error', (err) => {
  console.error('Unexpected database error:', err)
})

export default pool
