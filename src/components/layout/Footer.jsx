import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#E6CCB2] border-t border-[#DDB892]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-[#7F5539] font-semibold">
              LiveLonger
            </p>
            <p className="text-sm text-[#9C6644]">
              Class Project
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-[#9C6644] hover:text-[#7F5539] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/sleep"
              className="text-sm text-[#9C6644] hover:text-[#7F5539] transition-colors"
            >
              Sleep
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-[#9C6644]/70 text-center md:text-right max-w-xs">
            Educational content only. Not medical advice. Always consult a healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  )
}
