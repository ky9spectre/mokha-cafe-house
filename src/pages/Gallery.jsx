import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../data/mokha'

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const open = (i) => setSelected(i)
  const close = () => setSelected(null)
  const prev = () => setSelected(i => (i - 1 + galleryImages.length) % galleryImages.length)
  const next = () => setSelected(i => (i + 1) % galleryImages.length)

  return (
    <div className="bg-cream min-h-screen">
      <section className="relative h-64 flex items-center justify-center bg-coffee-800">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-coffee-100">Moments captured at Mokha</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => open(i)}
              className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden shadow-md"
            >
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full hover:opacity-90 transition-opacity" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={close}
        >
          <button onClick={close} className="absolute top-4 right-4 text-white hover:text-gold" aria-label="Close"><X className="w-8 h-8" /></button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-white hover:text-gold" aria-label="Previous"><ChevronLeft className="w-10 h-10" /></button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-white hover:text-gold" aria-label="Next"><ChevronRight className="w-10 h-10" /></button>
          <img src={galleryImages[selected]} alt={`Gallery ${selected + 1}`} className="max-h-[85vh] max-w-full object-contain rounded-lg" />
        </motion.div>
      )}
    </div>
  )
}
