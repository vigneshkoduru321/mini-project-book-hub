import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="logo-container">
    <div className="logo-con">
      <FaGoogle className="logos" />
      <FaTwitter className="logos" />
      <FaInstagram className="logos" />
      <FaYoutube className="logos" />
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
