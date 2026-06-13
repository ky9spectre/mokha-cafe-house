import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Plus, Minus } from 'lucide-react'
import { menuItems, categories, dietaryOptions } from '../data/mokha'

export default function Menu() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [dietary, setDietary] = useState('all')
  const [priceRange, setPriceRange] = useState(20)
  const [cart, setCart] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderInfo, setOrderInfo] = useState({ name: '', email: '' })
  const [orderSuccess, setOrderSuccess] = useState(false)

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'all' || item.category === category
      const matchDiet = dietary === 'all' || item.dietary.includes(dietary)
      const matchPrice = item.price <= priceRange
      return matchSearch && matchCat && matchDiet && matchPrice
    })
  }, [search, category, dietary, priceRange])

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const removeFromCart = (id) => {
    setCart(prev => {
      const next = { ...prev }
      if (next[id] <= 1) delete next[id]
      else next[id] -= 1
      return next
    })
  }

  const cartItems = Object.keys(cart).map(id => ({
    ...menuItems.find(i => i.id === parseInt(id)),
    qty: cart[id]
  }))

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative h-64 flex items-center justify-center bg-coffee-800">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-coffee-100">Crafted with passion, served with love</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-coffee-200 bg-white focus:outline-none focus:ring-2 focus:ring-coffee-400"
              aria-label="Search menu"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 bg-coffee-700 text-white px-4 py-3 rounded-lg"
            aria-expanded={showFilters}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className={`${showFilters ? 'block' : 'hidden'} md:block bg-white p-4 rounded-xl shadow-sm border border-coffee-100 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 rounded border border-coffee-200 focus:outline-none">
                {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">Dietary</label>
              <select value={dietary} onChange={e => setDietary(e.target.value)} className="w-full p-2 rounded border border-coffee-200 focus:outline-none">
                <option value="all">All</option>
                {dietaryOptions.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1">Max Price: ${priceRange}</label>
              <input type="range" min="3" max="20" value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))} className="w-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-coffee-100 flex flex-col"
            >
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-coffee-800">{item.name}</h3>
                  <span className="text-lg font-bold text-gold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-coffee-500 mb-3 flex-1">{item.description}</p>
                <div className="flex gap-1 mb-3 flex-wrap">
                  {item.dietary.map(d => (
                    <span key={d} className="text-xs bg-coffee-100 text-coffee-600 px-2 py-1 rounded-full">{d}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {cart[item.id] ? (
                      <>
                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full bg-coffee-100 hover:bg-coffee-200 flex items-center justify-center" aria-label="Remove one"><Minus className="w-4 h-4" /></button>
                        <span className="w-6 text-center text-sm font-medium">{cart[item.id]}</span>
                      </>
                    ) : null}
                    <button onClick={() => addToCart(item.id)} className="w-8 h-8 rounded-full bg-coffee-700 text-white hover:bg-coffee-600 flex items-center justify-center" aria-label="Add one"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center gap-1 text-gold text-sm">
                    <Star className="w-4 h-4 fill-current" /> 4.{5 + (item.id % 5)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-coffee-500">No items match your filters. Try adjusting your criteria.</div>
        )}
      </section>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-coffee-800 text-white p-4 rounded-xl shadow-2xl max-w-sm">
          <h3 className="font-semibold mb-2">Your Order</h3>
          <div className="max-h-40 overflow-y-auto mb-2 space-y-1 text-sm">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.qty}x {item.name}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-coffee-600 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-gold">${total.toFixed(2)}</span>
          </div>
          <button onClick={() => setCheckoutOpen(true)} className="w-full mt-3 bg-gold text-coffee-900 font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors">Checkout</button>
        </div>
      )}
      {checkoutOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setCheckoutOpen(false)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-coffee-800 mb-4">Checkout</h2>
            {!orderSuccess ? (
              <form onSubmit={e => { e.preventDefault(); setOrderSuccess(true); setTimeout(() => { setCheckoutOpen(false); setCart({}); setOrderSuccess(false); setOrderInfo({ name: '', email: '' }) }, 2000) }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">Name</label>
                  <input type="text" required value={orderInfo.name} onChange={e => setOrderInfo({ ...orderInfo, name: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">Email</label>
                  <input type="email" required value={orderInfo.email} onChange={e => setOrderInfo({ ...orderInfo, email: e.target.value })} className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-1">Card Details (demo)</label>
                  <input type="text" placeholder="4242 4242 4242 4242" className="w-full p-2 rounded border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400" required />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setCheckoutOpen(false)} className="flex-1 bg-coffee-100 text-coffee-700 font-semibold py-2 rounded-lg hover:bg-coffee-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-gold text-coffee-900 font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors">Pay ${total.toFixed(2)}</button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-coffee-800 mb-2">Order Placed!</h3>
                <p className="text-coffee-600">Thank you, {orderInfo.name}! Your order is being prepared.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
