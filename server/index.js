import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import pool from './db.js'
import menuRouter from './routes/menu.js'
import ordersRouter from './routes/orders.js'
import reservationsRouter from './routes/reservations.js'
import reviewsRouter from './routes/reviews.js'
import blogRouter from './routes/blog.js'
import authRouter from './routes/auth.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(helmet())
app.use(express.json())

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/menu', menuRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/reservations', reservationsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/blog', blogRouter)
app.use('/api/auth', authRouter)

// Auto-initialize database if needed
;(async () => {
  try {
    const client = await pool.connect()
    // Check if menu_items exists
    const res = await client.query("SELECT to_regclass('public.menu_items')")
    const initialized = res.rows[0].to_regclass
    if (!initialized) {
      console.log('Initializing database...')
      const schemaSql = fs.readFileSync(path.join(__dirname, 'utils', 'schema.sql'), 'utf8')
      const seedSql = fs.readFileSync(path.join(__dirname, 'utils', 'seed.sql'), 'utf8')
      await client.query(schemaSql)
      await client.query(seedSql)
      console.log('✅ Database initialized')
    } else {
      console.log('✅ Database already initialized')
    }
    client.release()
  } catch (err) {
    console.error('❌ Database init error:', err.message)
  }

  // Check DB connection
  try {
    const client = await pool.connect()
    console.log('✅ Connected to PostgreSQL database')
    client.release()
  } catch (err) {
    console.error('❌ Database connection error:', err.message)
  }
})()

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
