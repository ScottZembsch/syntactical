import React from 'react'
import prompts from '../prompts'
import '../Styles/promptbox.scss';
import { useState, useRef, useEffect } from 'react';


function PromptBox() {

  const promptArr = prompts.javascript2;
  const prompt = useRef(promptArr);

  const [userInput, setUserInput] = useState('');
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [correct, setCorrect] = useState(Array(promptArr.length).fill(''));



  useEffect(() => {
    if (currWordIndex >= promptArr.length){
      setCurrCharIndex(0);
      setCurrWordIndex(0)
      return alert('game over')
    }
  },[currWordIndex, promptArr.length])


  // check each char function
  function processInput(value) {
    // check to see if the input is correct
    if (value === promptArr[currWordIndex][currCharIndex]){
      console.log('correct');
      const newCorrect = [...correct];
      newCorrect[currWordIndex] += value;
      setCorrect(newCorrect);
      setCurrCharIndex(index => index+1);
      if (promptArr[currWordIndex].length -1 === currCharIndex){
      console.log('end word')
      setCurrWordIndex(index => index+1)
      setCurrCharIndex(0)
    } 
    } else {
      console.log('wrong')
      }
      // check if we are finished with all words
    
  }

  return (
    <div className='promptbox'>
      <div id="code-text">
        {prompt.current.map((word, wordIndex) => (
          <div className='word' key={wordIndex}>
            {word.split('').map((char, charIndex) => (
               <span
               key={charIndex}
               className={
                 correct[wordIndex]?.charAt(charIndex) === char
                   ? 'correctChar'
                   : 'char'
               }
             >
               {char}
             </span>
            ))}
          </div>
        ))}
      </div>
  
      <input
        id='input-field'
        type="text"
        value={userInput}
        placeholder=''
        onChange={(e) => processInput(e.target.value)}
      />
    </div>
  );
}

export default PromptBox