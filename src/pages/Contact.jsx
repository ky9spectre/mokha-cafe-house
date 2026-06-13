import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: 2, message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        reservation_date: form.date,
        reservation_time: form.time,
        guests: form.guests,
        special_requests: form.message
      }
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to complete reservation')

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', email: '', phone: '', date: '', time: '', guests: 2, message: '' })
      }, 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  const timeSlots = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative h-64 flex items-center justify-center bg-coffee-800">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact & Reservations</h1>
          <p className="text-coffee-100">We would love to hear from you</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!submitted ? (
              <motion.form onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-xl shadow-md border border-coffee-100 space-y-5">
                <h2 className="text-2xl font-bold text-coffee-800 mb-2">Make a Reservation</h2>
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Full Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Number of Guests</label>
                    <select value={form.guests} onChange={e => setForm({ ...form, guests: parseInt(e.target.value) })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none">
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Date</label>
                    <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} min={new Date().toISOString().split('T')[0]} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-1">Time</label>
                    <select required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none">
                      <option value="">Select time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">Special Requests</label>
                  <textarea rows="3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                </div>
                <button type="submit" className="w-full bg-coffee-700 text-white font-semibold py-3 rounded-lg hover:bg-coffee-600 transition-colors inline-flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Book Table
                </button>
              </motion.form>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-xl shadow-md border border-coffee-100 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-coffee-800 mb-2">Reservation Confirmed!</h2>
                <p className="text-coffee-600">We will send you a confirmation email shortly. See you at Mokha!</p>
              </motion.div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-coffee-100">
              <h3 className="text-lg font-bold text-coffee-800 mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-coffee-500" /> <span className="text-coffee-700">(555) 123-4567</span></div>
                <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-coffee-500" /> <span className="text-coffee-700">hello@mokha.coffee</span></div>
                <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-coffee-500" /> <span className="text-coffee-700">123 Coffee Lane, Downtown</span></div>
                <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-coffee-500" /> <span className="text-coffee-700">Mon-Fri: 6am-8pm | Sat-Sun: 7am-9pm</span></div>
              </div>
            </div>

            <div className="bg-coffee-800 text-white p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">Quick Message</h3>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Message sent!') }}>
                <input type="text" placeholder="Your name" className="w-full p-2 rounded bg-coffee-700 border border-coffee-600 text-white placeholder-coffee-300 focus:outline-none" />
                <textarea placeholder="Your message" rows="3" className="w-full p-2 rounded bg-coffee-700 border border-coffee-600 text-white placeholder-coffee-300 focus:outline-none" />
                <button type="submit" className="w-full bg-gold text-coffee-900 font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
