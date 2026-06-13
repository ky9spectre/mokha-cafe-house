import { Coffee, Camera, Users, MessageSquare, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-coffee-900 text-coffee-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <Coffee className="w-6 h-6" />
              <span className="text-xl font-bold">Mokha Coffee House</span>
            </div>
            <p className="text-sm text-coffee-200">Where every cup tells a story. Experience the perfect blend of quality, atmosphere, and community.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Hours</h4>
            <p className="text-sm text-coffee-200">Mon-Fri: 6am - 8pm</p>
            <p className="text-sm text-coffee-200">Sat-Sun: 7am - 9pm</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex items-center gap-2 text-sm mb-2"><Phone className="w-4 h-4" /> (555) 123-4567</div>
            <div className="flex items-center gap-2 text-sm mb-2"><Mail className="w-4 h-4" /> hello@mokha.coffee</div>
            <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" /> 123 Coffee Lane, City</div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
<a href="#" aria-label="Instagram" className="hover:text-gold"><Camera className="w-5 h-5" /></a>
<a href="#" aria-label="Facebook" className="hover:text-gold"><Users className="w-5 h-5" /></a>
<a href="#" aria-label="Twitter" className="hover:text-gold"><MessageSquare className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-coffee-700 mt-8 pt-8 text-center text-sm text-coffee-300">
          <p>&copy; 2024 Mokha Coffee House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
