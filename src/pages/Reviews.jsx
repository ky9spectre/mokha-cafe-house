import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send } from 'lucide-react'
import { reviews } from '../data/mokha'

export default function Reviews() {
  const [newReview, setNewReview] = useState({ author: '', text: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)
  const [allReviews, setAllReviews] = useState(reviews)

  const submitReview = (e) => {
    e.preventDefault()
    setAllReviews([{ id: Date.now(), ...newReview, date: new Date().toISOString().split('T')[0] }, ...allReviews])
    setNewReview({ author: '', text: '', rating: 5 })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative h-64 flex items-center justify-center bg-coffee-800">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Reviews & Ratings</h1>
          <p className="text-coffee-100">See what our guests are saying</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Reviews List */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-coffee-100">
              <div className="text-4xl font-bold text-gold">{avgRating}</div>
              <div>
                <div className="flex gap-1 text-gold">{[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5" fill={s <= Math.round(avgRating) ? 'currentColor' : 'none'} />)}</div>
                <p className="text-sm text-coffee-600">{allReviews.length} reviews</p>
              </div>
            </div>

            <div className="space-y-6">
              {allReviews.map(review => (
                <motion.div key={review.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl shadow-sm border border-coffee-100">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={review.image} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-coffee-800">{review.author}</p>
                      <p className="text-xs text-coffee-400">{review.date}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5 text-gold">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4" fill={s <= review.rating ? 'currentColor' : 'none'} />)}
                    </div>
                  </div>
                  <p className="text-coffee-600 italic">"{review.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submit Review */}
          <div className="md:w-96">
            <div className="bg-white p-6 rounded-xl shadow-md border border-coffee-100 sticky top-24">
              <h3 className="text-xl font-bold text-coffee-800 mb-4">Leave a Review</h3>
              {submitted && <p className="text-green-600 text-sm mb-3">Thank you for your review!</p>}
              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">Your Name</label>
                  <input type="text" required value={newReview.author} onChange={e => setNewReview({ ...newReview, author: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" onClick={() => setNewReview({ ...newReview, rating: s })} className="text-gold hover:scale-110 transition-transform" aria-label={`Rate ${s} stars`}>
                        <Star className={`w-6 h-6 ${s <= newReview.rating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">Your Review</label>
                  <textarea required rows="4" value={newReview.text} onChange={e => setNewReview({ ...newReview, text: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                </div>
                <button type="submit" className="w-full bg-coffee-700 text-white font-semibold py-2 rounded-lg hover:bg-coffee-600 transition-colors inline-flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
