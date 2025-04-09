// src/hooks/useWordleGame.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../../firebase/FireBase';

const fetchSecretWord = async () => {
  const wordsCollection = await getDocs(collection(db, 'words'));
  const wordsArray = wordsCollection.docs.map((doc) => doc.data().word);
  return wordsArray.length > 0
    ? wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase()
    : 'apple';
};

function GameProvider(){
  const [secretWord, setSecretWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [gameState, setGameState] = useState('playing');
  const [keyColors, setKeyColors] = useState({});

  useEffect(() => {
    fetchSecretWord().then(setSecretWord);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      handleKeyPress(key);
      console.log(secretWord);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const evaluateGuess = () => {
    if (currentGuess.length !== 5 || gameState !== 'playing') return;

    const result = Array(5).fill({ letter: '', status: undefined });
    const letterCount = {};
    secretWord.split('').forEach((l) => {
      letterCount[l] = (letterCount[l] || 0) + 1;
    });

    currentGuess.split('').forEach((l, i) => {
      if (l === secretWord[i]) {
        result[i] = { letter: l, status: 'correct' };
        letterCount[l]--;
      }
    });

    currentGuess.split('').forEach((l, i) => {
      if (!result[i].status && letterCount[l] > 0) {
        result[i] = { letter: l, status: 'present' };
        letterCount[l]--;
      } else if (!result[i].status) {
        result[i] = { letter: l, status: 'absent' };
      }
    });

    const updatedColors = { ...keyColors };
    result.forEach(({ letter, status }) => {
      const current = updatedColors[letter] || '';
      if (status === 'correct' || (status === 'present' && current !== 'green')) {
        updatedColors[letter] = status === 'correct' ? 'green' : 'yellow';
      } else if (!current) {
        updatedColors[letter] = 'gray';
      }
    });

    setKeyColors(updatedColors);
    setAttempts([...attempts, { word: currentGuess, result }]);
    setCurrentGuess('');

    if (currentGuess === secretWord) setGameState('won');
    else if (attempts.length + 1 >= 6) setGameState('lost');
  };

  const handleKeyPress = (key) => {
    if (gameState !== 'playing') return;

    if (key === 'ENTER' && currentGuess.length === 5) evaluateGuess();
    else if (key === 'BACKSPACE') setCurrentGuess(currentGuess.slice(0, -1));
    else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key.toLowerCase());
    }

  };

  return {
    currentGuess,
    attempts,
    keyColors,
    gameState,
    secretWord,
    handleKeyPress,
  };
};

export default GameProvider;
