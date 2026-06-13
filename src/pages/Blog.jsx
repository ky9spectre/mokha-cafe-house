import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch blog posts:', err)
        setError('Failed to load posts')
        setLoading(false)
      })
  }, [])

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative h-64 flex items-center justify-center bg-coffee-800">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-coffee-100">Stories, news, and updates from Mokha</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <p className="text-center text-coffee-600">Loading posts...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-coffee-100"
              >
                <img src={post.image} alt={post.title} className="w-full h-52 object-cover" />
                <div className="p-6">
                  <div className="flex gap-3 text-xs text-coffee-500 mb-3">
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> 4 min read</span>
                  </div>
                  <span className="text-xs font-semibold text-gold bg-coffee-100 px-2 py-1 rounded-full">{post.category}</span>
                  <h2 className="text-xl font-bold text-coffee-800 mt-2 mb-3">{post.title}</h2>
                  <p className="text-coffee-600 text-sm mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="text-coffee-700 font-semibold hover:text-gold inline-flex items-center gap-1">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
