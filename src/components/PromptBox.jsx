import React, { useState, useRef, useEffect } from 'react';
import prompts from '../prompts';
import '../Styles/promptbox.scss';

function PromptBox() {

  const promptArr = prompts.javascript2;
  const prompt = useRef(promptArr);

  //---------------------- STATE MANAGEMENT ---------------------- //
  const [userInput, setUserInput] = useState('');
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [correct, setCorrect] = useState(Array(promptArr.length).fill(''));
  // SET CORRECT AND INCORRECT KEY PRESSES // 
  const [incorrectKeyPress, setIncorrectKeyPress] = useState([]);
  const [correctKeyPress, setCorrectKeyPress] = useState(1);
  // TIMER // 
  const [time, setTime] = useState(30)
  const [timeStart, setTimeStart] = useState(false);
  const [timeEnd, setTimeEnd] = useState(false);



  // ------------ CHECKS IF PROMPT HAS ENDED AND RESETS GAME STATE ------------- //
  useEffect(() => {
    if (currWordIndex >= promptArr.length) {
      gameRecap()
      fullReset()
      return;
    } 
  }, [currWordIndex, promptArr.length]);

  // -------------------------- CHECKS FOR TIMER UP ----------------------- // 
  useEffect(()=>{
    if (timeEnd === true){
      gameRecap();
      fullReset();
    }
  }, [timeEnd])

  // --------------------- TIMER FUNCTIONALITY TO COUNTDOWN ------------------- // 
  useEffect(() => {
    let timeInt;

    if (timeStart && time > 0) {
      timeInt = setInterval(() => {
        setTime((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (time === 0) {
      setTimeEnd(true);
    }
    return () => clearInterval(timeInt);
  }, [timeStart, time]);



  // -------------------------- GAME RECAP FUNCTION ---------------------- // 
  function gameRecap(){
    console.log('words per min: ',getWPM(correct) )
  }


  // ------------------------- GET WPM FUNCTION -------------------------- // 
  function getWPM(arr){
    const result = [];
    
    const wpmArr = arr.filter(el => el !== '')
  
    wpmArr.map(el => {
      if (el.includes('.')){
        const newArr = el.split('.')
        newArr.forEach(el => result.push(el));
      } else {
        result.push(el)
      }
    })
    return result.length / .5;
  }


  // -------------------------- FUNCTION TO RESET GAMESTATE ------------------ //
  function fullReset(){
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTimeStart(false);
    setTimeEnd(false);
    setTime(30);
    setCorrect(Array(promptArr.length).fill(''));
    setCorrectKeyPress(1);
    setIncorrectKeyPress([]);
    setUserInput('Start Typing Here')
  }


  // ----------------------- MAIN CHAR PROCESSING FUNCTION -------------------- //
  function processInput(value) {

    // check to see if the input is correct
    if (value === promptArr[currWordIndex][currCharIndex]) {
      const newCorrect = [...correct];
      newCorrect[currWordIndex] += value;
      setCorrectKeyPress(correctKeyPress + 1)
      setCorrect(newCorrect);
      // console.log('correct: ', correctKeyPress);

      // Update the character index for the current word
      setCurrCharIndex((index) => index + 1);

      if (promptArr[currWordIndex].length - 1 === currCharIndex) {
        // console.log('end word');
        setCurrWordIndex((index) => index + 1);
        // Reset the character index for the next word
        setCurrCharIndex(0);
      }
    } else {
      // IF WRONG CHAR PRESSED AND ALSO NOT HITTING SAME WRONG KEY AGAIN // 
      if (incorrectKeyPress.length === 0 || value !== incorrectKeyPress[incorrectKeyPress.length - 1]){
        setIncorrectKeyPress([...incorrectKeyPress, value])
        // add one at end of length because it doesnt register the first error cuz nothing to check back on
        console.log('errors : ', incorrectKeyPress.length + 1)
      }
    }
  }


 // ------------------------ RETURN MODULE ---------------------- //
  return (
    <div className='promptbox'>
      {/* TIMER */}
      <div className='game-menu'>
        <span className='timer'>{time}</span>
        <button id='newGame' onClick={()=> fullReset()}>New Game</button>
      </div>

      {/* TEXT PROMPT */}
      <div id='code-text'>
        {prompt.current.map((word, wordIndex) => (
          <div className='word' key={wordIndex}>
            {word.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className={
                  correct[wordIndex]?.charAt(charIndex) === char
                    ? 'correctChar'
                    : charIndex === currCharIndex && wordIndex === currWordIndex
                    ? 'currChar'
                    : 'char'
                }
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* INPUT FEILD */}
      <input
        id='input-field'
        type='text'
        value={userInput}
        placeholder=''
        onChange={(e) => {
          processInput(e.target.value)
          setTimeStart(true)
        }
      }
      />
    </div>
  );
}

export default PromptBox;
