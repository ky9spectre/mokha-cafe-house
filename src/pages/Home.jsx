import { Link } from 'react-router-dom'
import { ArrowRight, Coffee, Award, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { galleryImages } from '../data/mokha'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600"
            alt="Mokha Coffee House interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-gold">Mokha</span> Coffee House
          </h1>
          <p className="text-lg md:text-xl mb-8 text-coffee-100">
            Where every cup tells a story. Discover handcrafted coffee, fresh pastries, and a warm atmosphere that feels like home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="bg-gold hover:bg-yellow-600 text-coffee-900 font-semibold px-8 py-3 rounded-full transition-colors inline-flex items-center justify-center gap-2">
              Explore Menu <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors">
              Reserve a Table
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Coffee, title: 'Premium Beans', desc: 'Ethically sourced from the finest growers around the world.' },
              { icon: Award, title: 'Expert Baristas', desc: 'Trained to craft the perfect cup every single time.' },
              { icon: Heart, title: 'Cozy Atmosphere', desc: 'A warm and inviting space to relax, work, or gather.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-coffee-100 text-coffee-600 rounded-full mb-4">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-coffee-800 mb-2">{f.title}</h3>
                <p className="text-coffee-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-coffee-800 mb-6">Our Story</h2>
              <p className="text-coffee-600 mb-4 leading-relaxed">
                Founded in 2015, Mokha Coffee House began with a simple mission: to create a space where exceptional coffee meets genuine connection. We source our beans directly from small farms in Ethiopia, Colombia, and Guatemala.
              </p>
              <p className="text-coffee-600 mb-6 leading-relaxed">
                Every drink is crafted with care by our passionate baristas, and every pastry is baked fresh in-house daily. Whether you are grabbing a quick espresso or settling in for the afternoon, we are here to make your day better.
              </p>
              <Link to="/menu" className="text-coffee-600 font-semibold hover:text-gold inline-flex items-center gap-2">
                See our menu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800" alt="Barista pouring latte art" className="rounded-2xl shadow-2xl w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-coffee-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-10">A Glimpse Inside</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 4).map((img, i) => (
              <motion.img
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                src={img}
                alt={`Gallery ${i + 1}`}
                className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="bg-gold hover:bg-yellow-600 text-coffee-900 font-semibold px-8 py-3 rounded-full transition-colors inline-flex items-center gap-2">
              View Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-coffee-800 text-center mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: 'The best coffee experience I have ever had. The baristas really know their craft.', author: 'Sarah M.' },
              { text: 'Perfect spot for remote work. Great Wi-Fi, excellent coffee, and a welcoming atmosphere.', author: 'James K.' },
              { text: 'I drive 30 minutes just for their croissants. Totally worth it!', author: 'Emily R.' },
            ].map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-coffee-100"
              >
                <p className="text-coffee-600 italic mb-4">"{t.text}"</p>
                <p className="text-coffee-800 font-semibold text-sm">- {t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-coffee-700 to-coffee-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Mokha?</h2>
          <p className="text-coffee-100 mb-8 text-lg">Stop by today and discover why our guests keep coming back. Or order online for delivery.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="bg-gold hover:bg-yellow-600 text-coffee-900 font-semibold px-8 py-3 rounded-full transition-colors">
              Order Online
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors">
              Make a Reservation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
