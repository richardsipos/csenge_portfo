import React from 'react'
import './Footer.scss'
import logo from '../../img/randomlogo.svg'

const Footer = () => {
  return (
    <footer className = 'footer'>
      <div className = 'footerLeft'>
        
      </div>
      <div className = 'footerRight'>
        <img className = 'logo' src={ logo }></img>
        <p className='copyrightText'> © All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer