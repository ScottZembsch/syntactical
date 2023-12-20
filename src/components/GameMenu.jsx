import React, { useState } from 'react';
import PromptBox from './PromptBox';
import '../Styles/gamemenu.scss';

function GameMenu() {

const [timeSelect, setTimeSelect] = useState(60);
const [langSelect, setLangSelect] = useState('javascript');

  return (
    <>
      <div className='menu-container'>
        <div className='menu-items'>
          <div className='lang-container'>
            <button className='lang-btn' onClick={() => setLangSelect('javascript')}>Javascript</button>
            <button className='lang-btn' onClick={() => setLangSelect('python')}>Python</button>
            <button className='lang-btn' onClick={() => setLangSelect('rust')}>Rust</button>
          </div>
          <div className='btn-container'>
            <button className='time-btn' onClick={()=> setTimeSelect(15)}>15</button>
            <button className='time-btn' onClick={()=> setTimeSelect(30)}>30</button>
            <button className='time-btn' onClick={()=> setTimeSelect(60)}>60</button>
          </div>
        </div>
      </div>
      <PromptBox timeSelect={timeSelect} langSelect={langSelect} />
    </>
  )
}

export default GameMenu;