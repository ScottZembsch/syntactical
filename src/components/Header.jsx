import React from 'react'
import '../Styles/header.scss';
import syntacticalLogo from '../images/syntacticalLogoYellow.png';


function Header() {
  return (
    <div id='header'>   
      <img id='logo' src={syntacticalLogo} alt="logo" />
      <ul className='header-list'>
      <li><a href="">Stats</a></li>
        <li><a href="">My Account</a></li>
        <li><a href="">Sign In</a></li>
      </ul>

    </div>
  )
}

export default Header