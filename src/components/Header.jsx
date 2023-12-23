import React from 'react'
import '../Styles/header.scss';
import syntacticalLogo from '../images/syntacticalLogoYellow.png';


function Header() {

function getStats(){
  fetch('http://localhost:3000/stats')
}



  return (
    <div id='header'>
      <a href=""><img id='logo' src={syntacticalLogo} alt="logo" /></a>
      <ul className='header-list'>
        <button className='header-btn' onClick={() => getStats()}>Stats</button>
        <button className='header-btn'>My Account</button>
        <button className='header-btn'>Sign In</button>
      </ul>

    </div>
  )
}

export default Header