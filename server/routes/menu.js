import express from 'express'
import pool from '../db.js'
import { menuItems } from '../utils/mockData.js'

const router = express.Router()

// GET /api/menu - optionally filter by category, dietary, priceMax, search
router.get('/', async (req, res) => {
  const { category, dietary, priceMax, search } = req.query
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured')
    }
    let query = 'SELECT * FROM menu_items WHERE TRUE'
    const params = []
    let idx = 1

    if (category && category !== 'all') {
      query += ` AND category = $${idx}`
      params.push(category)
      idx++
    }

    if (dietary && dietary !== 'all') {
      query += ` AND dietary @> $${idx}::jsonb`
      params.push(JSON.stringify([dietary]))
      idx++
    }

    if (priceMax) {
      query += ` AND price <= $${idx}`
      params.push(priceMax)
      idx++
    }

    if (search) {
      query += ` AND (LOWER(name) LIKE LOWER($${idx}) OR LOWER(description) LIKE LOWER($${idx}))`
      params.push(`%${search}%`)
      idx++
    }

    query += ' ORDER BY id ASC'

    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) {
    console.warn('PostgreSQL query failed, falling back to mock data:', err.message)
    let items = menuItems.map(item => ({ ...item, price: Number(item.price) }))
    if (category && category !== 'all') {
      items = items.filter(i => i.category === category)
    }
    if (dietary && dietary !== 'all') {
      items = items.filter(i => i.dietary.includes(dietary))
    }
    if (priceMax) {
      items = items.filter(i => i.price <= Number(priceMax))
    }
    if (search) {
      const s = search.toLowerCase()
      items = items.filter(i => i.name.toLowerCase().includes(s) || i.description.toLowerCase().includes(s))
    }
    res.json(items)
  }
})

export default router
