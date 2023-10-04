import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import Character from "../app/components/Character";
import Button from "../app/components/Button"
import { useGameMode } from "../app/contexts/gameModeContext";
import jsonData from "../resources/quotes.json";
import TopMenu from "../app/components/TopMenu";
import '../app/styles/typing-game.css'
import '../app/globals.css'


interface Quote {
  quotes: string[];
  description: string;
}

interface QuotesData {
  quotelist: Quote[];
}

interface TypingState {
  textToType: string;
  userInput: string;
  wordsPerMinute: number;
  startTime: number;
  elapsedTime: number;
}

const DEFAULT_STATE = {
  textToType: "",
  userInput: "",
  wordsPerMinute: 0,
  startTime: 0,
  elapsedTime: 0,
};

const TypingGame: React.FC = () => {
  const { gameMode } = useGameMode();
  const [ts, setTypingState] = useState(DEFAULT_STATE);
  const {elapsedTime, startTime, textToType,userInput, wordsPerMinute} = ts;
  const [wordsPerMinuteFinal, setWordsPerMinuteFinal] = useState<number>();
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [highestWPM, setHighestWPM] = useState<number>(0);
  const data: QuotesData = jsonData[0];
  const creepyQuotes = data.quotelist[0];
  const despairQuotes = data.quotelist[1];
  const lotrStarWarsQuotes = data.quotelist[2];
  const inputRef = useRef<HTMLInputElement>(null);
  let currentQuotes = gameMode === "creepyMode" ? creepyQuotes : despairQuotes;
  let charGlobalIndex = 0;
    const onKeyChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Tab' && event.key !== 'Enter') {
            inputRef.current?.focus();
        }
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTypingState((prevState) => ({ ...prevState,  userInput: (e.target.value)}));
        if (!startTime) {
          setTypingState((prevState) => ({ ...prevState, startTime: Date.now()}));
        }
      }

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    <div onKeyDown={onKeyChange} onClick={() => inputRef.current?.focus()}></div>

  useEffect(() => {
    if (gameMode === "creepyMode") {
      currentQuotes = creepyQuotes;
    } else if (gameMode === "despairMode") {
      currentQuotes = despairQuotes;
    } else if (gameMode === "lotrStarwarsMode") {
      currentQuotes = lotrStarWarsQuotes;
    }
    !!inputRef?.current && inputRef.current.focus();
  });

  useEffect(() => {
    NewGame();
  }, [gameMode]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if ( 
      userInput.length === textToType.length &&
      userInput === textToType &&
      startTime) {
      setGameFinished(true);
      setWordsPerMinuteFinal(wordsPerMinute);
      if (wordsPerMinute > highestWPM) {
        setHighestWPM(wordsPerMinute);
      }
      if (!gameFinished) {
        setTypingState((prevState) => ({...prevState,
          elapsedTime: Date.now() - startTime,
      }));
        clearInterval(intervalId);
      }
    } else if (startTime && !gameFinished) {
      intervalId = setInterval(() => {
        setTypingState((prevState) => ({
          ...prevState,
          elapsedTime: Date.now() - startTime,
        }));
      }, 50);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [startTime, userInput, textToType]);


  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (startTime && !gameFinished) {
      let currentWpm = Math.round(
        (userInput.length / 5) * (60 / (elapsedTime / 1000))
      );
      setTypingState((prevState) => ({...prevState, wordsPerMinute: currentWpm, }));
    } else if (!startTime) {
      setTypingState((prevState) => ({ ...prevState, wordsPerMinute: 0 }));
      intervalId = setInterval(() => {
        setTypingState((prevState) => ({
          ...prevState,
          elapsedTime: Date.now() - startTime,
        }));
      }, 50);
    }
    inputRef.current?.focus()
    return () => {
      if (intervalId) clearInterval(intervalId);
    }; 
  }, [startTime, gameFinished, userInput.length, elapsedTime]);

  useEffect(() => {
    if (startTime && !gameFinished) {
      let currentWpm = Math.round(
        (userInput.length / 5) * (60 / (elapsedTime / 1000))
      );
      setTypingState((prevState) => ({
        ...prevState,
        wordsPerMinute: currentWpm,
      }));
    } else if (!startTime) {
      setTypingState((prevState) => ({ ...prevState, wordsPerMinute: 0 }));
    }
  }, [userInput]);

  const NewGame = () => {
    const randomQuote =
      currentQuotes.quotes[
        Math.floor(Math.random() * currentQuotes.quotes.length)
      ];
      setGameFinished(false);
      setTypingState((prevState) => ({
        ...prevState,
        textToType: randomQuote,
        userInput: "",
        wordsPerMinute: 0,
        startTime: 0,
    }));
  };

  const ReplayGame = () => {
    setTypingState((prevState) => ({...prevState,
      userInput: "",
      wordsPerMinute: 0,
      startTime: 0,
    }));
    setGameFinished(false);
  };

  return (
    <div>
      <div  className="flex min-h-screen flex-col items-center  font-semibold">
        <TopMenu />
        <h2 className={`fixed items-centered bottom-10 font-mono`}>
          <span className="text">Top WPM </span>
          <span className="variable" >{highestWPM.toFixed(0)}</span>
        </h2>
        <div className="mt-40 items-center">
        <p className="description">"{currentQuotes.description}"</p>
        {
          <Character
            textToType={textToType}
            userInput={userInput}
            charGlobalIndex={charGlobalIndex}
          />
        }
        </div>
        <div>
          <input
            className="typingInput"
            type="text"
            value={userInput}
            ref={inputRef}
            onChange={handleInputChange}
            autoComplete="off"
          />
          </div>
          <div className="fixed bottom-10">
            <Button></Button>
          </div>

          <button className="" onClick={ReplayGame}>Replay</button>
          <h2 className="live-wpm">
            <span style={{ color: (!gameFinished ? wordsPerMinute : wordsPerMinuteFinal) === 0 ? 'transparent' : 'inherit' }}>
              {!gameFinished ? wordsPerMinute : wordsPerMinuteFinal}
            </span>
          </h2>
        </div>
      </div>
  );
};
export default TypingGame;
