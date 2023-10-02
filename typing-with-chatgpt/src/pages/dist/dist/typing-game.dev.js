"use strict";

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

exports.__esModule = true;

var react_1 = require("react");

var TypingGame = function TypingGame() {
  var _a = react_1.useState(""),
      textToType = _a[0],
      setTextToType = _a[1];

  var _b = react_1.useState(""),
      userInput = _b[0],
      setUserInput = _b[1];

  var _c = react_1.useState(null),
      startTime = _c[0],
      setStartTime = _c[1];

  var _d = react_1.useState(0),
      elapsedTime = _d[0],
      setElapsedTime = _d[1];

  var _e = react_1.useState(0),
      wordsPerMinute = _e[0],
      setWordsPerMinute = _e[1];

  var _f = react_1.useState(0),
      wordsPerMinuteFinal = _f[0],
      setWordsPerMinuteFinal = _f[1];

  var _g = react_1.useState(0),
      highestWPM = _g[0],
      setHighestWPM = _g[1];

  var _h = react_1.useState([10]),
      listOfWPMs = _h[0],
      SetListOfWPMs = _h[1];

  var charGlobalIndex = 0;
  var wrongChars = 0;
  var correctChars = 0;
  var quotes = [];

  var handleInputChange = function handleInputChange(e) {
    setUserInput(e.target.value);
    if (!startTime) setStartTime(Date.now());
  };

  var handleKeyDown = function handleKeyDown(e) {
    var inputElement = document.getElementById('typingInput');

    if (inputElement) {
      inputElement.focus();
    }
  };

  var mouseClick = function mouseClick(e) {
    console.log("mouse has been clicked");
    var inputElement = document.getElementById('typingInput');
    console.log(inputElement);

    if (inputElement) {
      setTimeout(function () {
        inputElement.focus();
      }, 100);
    }
  };

  react_1.useEffect(function () {
    if (!startTime) {
      var newListOfWPMs = __spreadArrays([wordsPerMinute], listOfWPMs); // Add the new WPM to the beginning


      while (newListOfWPMs.length > 10) {
        // Ensure the list doesn't exceed 10 items
        newListOfWPMs.pop(); // Remove the oldest WPM
      }

      SetListOfWPMs(newListOfWPMs);
    }
  }, [startTime, wordsPerMinute, listOfWPMs]);
  react_1.useEffect(function () {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var randomQuote = quotes[randomIndex];
    setTextToType(randomQuote);
  }, []);
  react_1.useEffect(function () {
    var intervalId;

    if (userInput === textToType && startTime) {
      setWordsPerMinuteFinal(wordsPerMinute);

      if (wordsPerMinute > highestWPM) {
        setHighestWPM(wordsPerMinute * 1.01);
      }

      if (!startTime) setElapsedTime(Date.now() - startTime);
      clearInterval(intervalId);
    } else if (startTime) {
      intervalId = setInterval(function () {
        setElapsedTime(Date.now() - startTime);
      }, 1);
    }

    return function () {
      if (intervalId) clearInterval(intervalId);
    };
  }, [startTime, userInput, textToType]);
  react_1.useEffect(function () {
    document.addEventListener('mousedown', mouseClick);
    return function () {
      document.removeEventListener('mousedown', mouseClick);
    };
  }, []);
  react_1.useEffect(function () {
    if (startTime) {
      var currentWpm = Math.round(userInput.length / 5 * (60 / (elapsedTime / 1000)));
      setWordsPerMinute(currentWpm);
    } else {
      setWordsPerMinute(0);
    }
  });
  react_1.useEffect(function () {
    var inputElement = document.getElementById('typingInput');

    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  var NewGame = function NewGame() {
    setUserInput("");
    setStartTime(null);
    setWordsPerMinute(0);
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var randomQuote = quotes[randomIndex];
    setTextToType(randomQuote);
    var inputElement = document.getElementById('typingInput');

    if (inputElement) {
      setTimeout(function () {
        inputElement.focus();
      }, 100);
    }
  };

  var ReplayGame = function ReplayGame() {
    setUserInput("");
    setStartTime(null);
    setWordsPerMinute(0);
    var inputElement = document.getElementById('typingInput');

    if (inputElement) {
      setTimeout(function () {
        inputElement.focus();
      }, 100);
    }
  };

  return react_1["default"].createElement("div", {
    className: "flex min-h-screen flex-col items-center font-mono h-48 font-semibold border"
  }, startTime && react_1["default"].createElement("h2", {
    style: {
      fontSize: 20
    },
    className: "fixed top-3 right-3 font-mono"
  }, "Time: ", (elapsedTime / 1000).toFixed(2), " seconds"), react_1["default"].createElement("h2", {
    style: {
      fontSize: 20
    },
    className: "fixed bottom-10 right-10 font-mono"
  }, "Highest WPM: ", highestWPM.toFixed(0)), react_1["default"].createElement("h2", {
    style: {
      fontSize: 15
    },
    className: "fixed bottom-50 left-10 font-mono"
  }, "List of last 10 scores:", react_1["default"].createElement("br", null), " ", listOfWPMs[1]), react_1["default"].createElement("h2", {
    className: "text-4xl  mt-20 mb-20 "
  }, "Typing with ChatGPT"), react_1["default"].createElement("div", null, react_1["default"].createElement("div", {
    className: "text-center font-mono font-bold lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-center w-0.5"
  }, react_1["default"].createElement("div", {
    className: "fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"
  }, react_1["default"].createElement("div", {
    className: "mt-20 "
  }, textToType.split("").map(function (_char, charIndex) {
    var currentChar = userInput[charGlobalIndex] || ""; // fetch char from userInput

    var color = 'rgb(92, 117, 33)';
    var displayChar = _char;

    if (_char === " ") {
      displayChar = "_";
      color = 'transparent';
    }

    if (currentChar === '_') {
      color = currentChar === _char ? 'transparent' : 'red';
      console.log("should be transparent space");
    } else if (currentChar && currentChar != '_') {
      color = currentChar === _char ? 'rgb(186, 186, 2)' : 'red';
    }

    var isChecked = false;

    if (currentChar === _char && !isChecked) {
      correctChars++;
      isChecked = true;
    } else {
      wrongChars++;
      isChecked = true;
    }

    console.log('Correct, Wrong: ', correctChars, ', ', wrongChars);
    charGlobalIndex++;
    return react_1["default"].createElement("span", {
      key: charIndex,
      style: {
        fontSize: "23px",
        color: color
      }
    }, displayChar);
  }))))), react_1["default"].createElement("div", null, react_1["default"].createElement("input", {
    id: "typingInput",
    type: "text",
    value: userInput,
    onKeyDown: handleKeyDown,
    onChange: handleInputChange,
    autoComplete: "off",
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: "100%",
      height: '100%',
      opacity: 0,
      zIndex: -1,
      outline: "none",
      border: "none"
    }
  }), react_1["default"].createElement("h2", {
    style: {
      color: wordsPerMinute === 0 ? 'transparent' : undefined,
      fontSize: '50px'
    },
    id: "wpm",
    className: "mt-10\n         text-4xl font-semibold"
  }, wordsPerMinute, " ")), react_1["default"].createElement("button", {
    style: {
      fontSize: "25px"
    },
    onClick: NewGame
  }, "New Game"), react_1["default"].createElement("button", {
    style: {
      fontSize: "25px"
    },
    onClick: ReplayGame
  }, "Replay"));
};

exports["default"] = TypingGame;