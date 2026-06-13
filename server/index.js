import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import pool from './db.js'
import menuRouter from './routes/menu.js'
import ordersRouter from './routes/orders.js'
import reservationsRouter from './routes/reservations.js'
import reviewsRouter from './routes/reviews.js'
import blogRouter from './routes/blog.js'
import authRouter from './routes/auth.js'

dotenv.config()

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

// Development only: check DB connection and run schema if needed
if (process.env.NODE_ENV !== 'production') {
  ;(async () => {
    try {
      const client = await pool.connect()
      console.log('✅ Connected to PostgreSQL database')
      client.release()
    } catch (err) {
      console.error('❌ Database connection error:', err.message)
    }
  })()
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
