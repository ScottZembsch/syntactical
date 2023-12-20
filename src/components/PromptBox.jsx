import React, { useState, useRef, useEffect } from 'react';
import prompts from '../prompts';
import '../Styles/promptbox.scss';

function PromptBox({ timeSelect, langSelect }) {
  // const promptArrRef = useRef(prompts[langSelect]);
  // const prompt = promptArrRef.current;

  //---------------------- STATE MANAGEMENT ---------------------- //
  // LANG //
  const promptArrRef = useRef(prompts[langSelect]);
  const [prompt, setPrompt] = useState([])
  // USER INPUT //
  const [userInput, setUserInput] = useState('');
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [correct, setCorrect] = useState(Array(promptArrRef.current.length).fill(''));
  // SET CORRECT AND INCORRECT KEY PRESSES //
  const [incorrectKeyPress, setIncorrectKeyPress] = useState([]);
  const [correctKeyPress, setCorrectKeyPress] = useState(1);
  // TIMER //
  const [time, setTime] = React.useState(timeSelect);
  const [timeStart, setTimeStart] = useState(false);
  const [timeEnd, setTimeEnd] = useState(false);

  // ---------------- UPDATES CLOCK TO CHOSEN TIME IN GAME MENU ---------------- //
  useEffect(() => {
    setTime(timeSelect);
  }, [timeSelect]);

  // ------------------- UPDATES PROMPT TEXT TO NEW LANG ------------------------ //
  useEffect(() => {
    console.log('change');
    promptArrRef.current = prompts[langSelect];
    setPrompt(promptArrRef.current); // Set the prompt when the language changes
    setCorrect(Array(promptArrRef.current.length).fill('')); // Initialize with the correct length
  }, [langSelect]);


  // ------------ CHECKS IF PROMPT HAS ENDED AND RESETS GAME STATE ------------- //
  useEffect(() => {
    if (currWordIndex >= promptArrRef.current.length) {
      gameRecap();
      fullReset();
    }
  }, [currWordIndex, promptArrRef.current.length]);

  // -------------------------- CHECKS FOR TIMER UP ----------------------- //
  useEffect(() => {
    if (timeEnd === true) {
      gameRecap();
      fullReset();
    }
  }, [timeEnd]);

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
  function gameRecap() {
    console.log('words per min: ', getWPM(correct));
  }

  // ------------------------- GET WPM FUNCTION -------------------------- //
  function getWPM(arr) {
    const result = [];

    const wpmArr = arr.filter((el) => el !== '');

    wpmArr.map((el) => {
      if (el.includes('.')) {
        const newArr = el.split('.');
        newArr.forEach((el) => result.push(el));
      } else {
        result.push(el);
      }
    });
    return result.length / 0.5;
  }

  // -------------------------- FUNCTION TO RESET GAMESTATE ------------------ //
  function fullReset() {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTimeStart(false);
    setTimeEnd(false);
    setTime(timeSelect);
    setCorrect([]);
    setCorrectKeyPress(1);
    setIncorrectKeyPress([]);
    setUserInput('');
  }

  // ----------------------- MAIN CHAR PROCESSING FUNCTION -------------------- //
  function processInput(value) {
    // check to see if the input is correct
    if (value === promptArrRef.current[currWordIndex][currCharIndex]) {
      const newCorrect = [...correct];
      newCorrect[currWordIndex] += value;
      setCorrectKeyPress(correctKeyPress + 1);
      setCorrect(newCorrect);

      // Update the character index for the current word
      setCurrCharIndex((index) => index + 1);

      if (prompt[currWordIndex].length - 1 === currCharIndex) {
        setCurrWordIndex((index) => index + 1);
        // Reset the character index for the next word
        setCurrCharIndex(0);
      }
    } else {
      // IF WRONG CHAR PRESSED AND ALSO NOT HITTING SAME WRONG KEY AGAIN //
      if (
        incorrectKeyPress.length === 0 ||
        value !== incorrectKeyPress[incorrectKeyPress.length - 1]
      ) {
        setIncorrectKeyPress([...incorrectKeyPress, value]);
        console.log('errors : ', incorrectKeyPress.length + 1);
      }
    }
  }

  // ------------------------ RETURN MODULE ---------------------- //
  return (
    <div className='promptbox'>
      {/* TIMER */}
      <div className='game-menu'>
        <span className='timer'>{time}</span>
        <button id='newGame' onClick={() => fullReset()}>
          New Game
        </button>
      </div>

      {/* TEXT PROMPT */}
      <div id='code-text'>
        {prompt.map((word, wordIndex) => (
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
          processInput(e.target.value);
          setTimeStart(true);
        }}
      />
    </div>
  );
}

export default PromptBox;
