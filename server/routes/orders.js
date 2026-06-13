import express from 'express'
import pool from '../db.js'
import { authenticate } from '../middleware/auth.js'
import jwt from 'jsonwebtoken'

const router = express.Router()
const isDev = process.env.NODE_ENV !== 'production'

// GET all orders for a user (authenticated) - optional
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Fetch orders error:', err)
    if (isDev) res.status(500).json({ error: err.message })
    else res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// GET single order by id (authenticated, user-specific)
router.get('/:id', authenticate, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found or access denied' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('Fetch order error:', err)
    if (isDev) res.status(500).json({ error: err.message })
    else res.status(500).json({ error: 'Failed to fetch order' })
  }
})

// POST create order (guest allowed, user linked if logged in)
router.post('/', async (req, res) => {
  const { customer_name, email, phone, items, total } = req.body
  if (!customer_name || !email || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Optional Authentication for logging orders
  let user_id = null
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    try {
      const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'
      const verified = jwt.verify(token, JWT_SECRET)
      user_id = verified.id
    } catch (err) {
      console.warn('Invalid token provided for guest checkout:', err.message)
    }
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const orderRes = await client.query(
      'INSERT INTO orders (customer_name, email, phone, total, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [customer_name, email, phone || null, total, user_id]
    )
    const order_id = orderRes.rows[0].id

    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order_id, item.menu_item_id, item.quantity, item.price]
      )
    }

    await client.query('COMMIT')
    res.status(201).json({ order_id, message: 'Order placed successfully' })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Order error:', err)
    if (isDev) res.status(500).json({ error: err.message })
    else res.status(500).json({ error: 'Failed to place order' })
  } finally {
    client.release()
  }
})

export default router
