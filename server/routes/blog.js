import express from 'express'
import pool from '../db.js'
import { blogPosts } from '../utils/mockData.js'

const router = express.Router()

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured')
    }
    const result = await pool.query(
      'SELECT id, title, slug, excerpt, category, image, date FROM blog_posts ORDER BY date DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.warn('PostgreSQL query failed, falling back to mock data:', err.message)
    res.json(blogPosts)
  }
})

// GET single post by id (or slug)
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured')
    }
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE id = $1 OR slug = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.warn('PostgreSQL query failed, falling back to mock data:', err.message)
    const post = blogPosts.find(p => p.id === parseInt(id) || p.slug === id)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json(post)
  }
})

export default router
