import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../helpers/FireBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Choose your color theme here:
const swalTheme = {
  background: "#f3e8ff", // Lavender Dream
  color: "#4b0082",
  iconColor: "#c084fc",
  confirmButtonColor: "#d946ef",
  cancelButtonColor: "#a78bfa"
};

const fetchSecretWord = async () => {
  const wordsCollection = await getDocs(collection(db, "words"));
  const wordsArray = wordsCollection.docs.map((doc) => doc.data().word);
  return wordsArray.length > 0
    ? wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase()
    : "apple";
};

const calculateScore = (timeInSeconds, attemptsUsed, won) => {
  if (!won) return 0;
  const scoreMap = { 1: 200, 2: 180, 3: 160, 4: 140, 5: 120 };
  const baseScore = scoreMap[attemptsUsed] ?? 100;
  return Math.max(baseScore - timeInSeconds, 0);
};

function useGameProvider() {
  const [secretWord, setSecretWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [gameState, setGameState] = useState("loading");
  const [keyColors, setKeyColors] = useState({});
  const [user, setUser] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (!loggedInUser) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Please log in to play Wordle!",
          confirmButtonText: "OK",
          ...swalTheme,
          allowOutsideClick: false,
        });
        return;
      }
      setUser(loggedInUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSecretWord().then((word) => {
        setSecretWord(word);
        Swal.fire({
          title: "😎 Ready to Play?",
          text: "Your Wordle adventure starts now!",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Let's Go!",
          cancelButtonText: "Cancel",
          ...swalTheme,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setStartTime(Date.now());
            setGameState("playing");
          } else {
            navigate("/games");
          }
        });
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => handleKeyPress(e.key.toUpperCase());
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const evaluateGuess = async () => {
    if (currentGuess.length !== 5 || gameState !== "playing") return;

    const result = Array(5).fill({ letter: "", status: undefined });
    const letterCount = {};
    secretWord.split("").forEach((l) => {
      letterCount[l] = (letterCount[l] || 0) + 1;
    });

    currentGuess.split("").forEach((l, i) => {
      if (l === secretWord[i]) {
        result[i] = { letter: l, status: "correct" };
        letterCount[l]--;
      }
    });

    currentGuess.split("").forEach((l, i) => {
      if (!result[i].status && letterCount[l] > 0) {
        result[i] = { letter: l, status: "present" };
        letterCount[l]--;
      } else if (!result[i].status) {
        result[i] = { letter: l, status: "absent" };
      }
    });

    const updatedColors = { ...keyColors };
    result.forEach(({ letter, status }) => {
      const current = updatedColors[letter] || "";
      if (status === "correct" || (status === "present" && current !== "green")) {
        updatedColors[letter] = status === "correct" ? "green" : "yellow";
      } else if (!current) {
        updatedColors[letter] = "gray";
      }
    });

    setKeyColors(updatedColors);
    const newAttempts = [...attempts, { word: currentGuess, result }];
    setAttempts(newAttempts);
    setCurrentGuess("");

    const hasWon = currentGuess === secretWord;
    const hasLost = newAttempts.length >= 6 && !hasWon;

    if (hasWon || hasLost) {
      setGameState(hasWon ? "won" : "lost");
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      const finalScore = calculateScore(timeInSeconds, newAttempts.length, hasWon);
      setScore(finalScore);

      const alertOptions = {
        icon: hasWon ? "success" : "error",
        title: hasWon ? "🎉 You Won!" : "❌ You Lost!",
        html: hasWon
          ? `Time: <b>${timeInSeconds}</b> sec<br>Score: <b>${finalScore}</b>`
          : `The correct word was <b>${secretWord}</b>`,
        showCancelButton: true,
        confirmButtonText: hasWon ? "Play Again" : "Try Again",
        cancelButtonText: "Go Home",
        ...swalTheme,
        allowOutsideClick: false,
      };

      if (hasWon) await saveScore(finalScore);

      setTimeout(() => {
        Swal.fire(alertOptions).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else {
            navigate("/games");
          }
        });
      }, 100);
    }
  };

  const saveScore = async (score) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "scores"), {
        game: "wordle",
        userId: user.uid,
        score,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error("Failed to save score:", err);
    }
  };

  const handleKeyPress = (key) => {
    if (gameState !== "playing") return;
    if (key === "ENTER" && currentGuess.length === 5) evaluateGuess();
    else if (key === "BACKSPACE") setCurrentGuess(currentGuess.slice(0, -1));
    else if (/^[A-Z]$/.test(key) && currentGuess.length < 5)
      setCurrentGuess(currentGuess + key.toLowerCase());
  };

  return {
    currentGuess,
    attempts,
    keyColors,
    gameState,
    secretWord,
    handleKeyPress,
    evaluateGuess,
    score,
  };
}

export default useGameProvider;
