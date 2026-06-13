import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/mokha'

export default function BlogPost() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) return <div className="text-center py-20 text-coffee-600">Post not found.</div>

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative h-72 flex items-center justify-center bg-coffee-800">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex justify-center gap-4 text-sm text-coffee-100">
            <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />4 min read</span>
          </div>
        </motion.div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-1 text-coffee-700 font-semibold hover:text-gold mb-8"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
        <article className="bg-white p-8 md:p-12 rounded-xl shadow-md border border-coffee-100">
          <img src={post.image} alt={post.title} className="rounded-xl mb-6 w-full h-64 object-cover" />
          <span className="text-xs font-semibold text-gold bg-coffee-100 px-3 py-1 rounded-full">{post.category}</span>
          <p className="text-coffee-600 mt-4 leading-relaxed text-lg">{post.excerpt}</p>
          <p className="text-coffee-600 mt-4 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </article>
      </section>
    </div>
  )
}
