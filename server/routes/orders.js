import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { customer_name, email, phone, items, total } = req.body
  if (!customer_name || !email || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const user_id = req.user?.id || null
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
    res.status(500).json({ error: 'Failed to place order' })
  } finally {
    client.release()
  }
})

export default router
