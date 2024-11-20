import { Facebook, Instagram, Twitter } from "lucide-react"
import { FC } from "react"
import { Link } from "react-router-dom"

const Footer: FC = () => {

    return(
        <footer className="lg:px-36 bg-[#1a237e] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">DENTIFY</h3>
              <p className="text-sm">
                Leading the Way in Medical Excellence, Trusted Care.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Important Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/appointment">Appointment</Link>
                </li>
                <li>
                  <Link to="/doctors">Doctors</Link>
                </li>
                <li>
                  <Link to="/dich-vu">Services</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li>Call: (237) 681-812-255</li>
                <li>Email: dentify@gmail.com</li>
                <li>Address: 470 Trần Đại Nghĩa</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-md">
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2024 Dentify.com All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-6 w-6 hover:text-gray-300" />
              <Twitter className="h-6 w-6 hover:text-gray-300" />
              <Instagram className="h-6 w-6 hover:text-gray-300" />
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer
