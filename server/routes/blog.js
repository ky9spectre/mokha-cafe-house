import express from 'express'
import pool from '../db.js'

const router = express.Router()
const isDev = process.env.NODE_ENV !== 'production'

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, slug, excerpt, category, image, date FROM blog_posts ORDER BY date DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Fetch blog posts error:', err)
    if (isDev) res.status(500).json({ error: err.message })
    else res.status(500).json({ error: 'Failed to fetch blog posts' })
  }
})

// GET single post by id (or slug)
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE id = $1 OR slug = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('Fetch blog post error:', err)
    if (isDev) res.status(500).json({ error: err.message })
    else res.status(500).json({ error: 'Failed to fetch blog post' })
  }
})

export default router
