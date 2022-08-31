import { useState } from "react";
import "./App.scss";

function App() {
  const [display, setDisplay] = useState("0");
  const [prevResult, setPrevResult] = useState("0");
  const operators = ["+", "-", "*", "/"];

  //   window.addEventListener("keyup", async (event) => {
  //     if (event.code.includes("Numpad") || event.code.includes("Digit")) {
  //       await setDisplay(display + event.key)
  //     }
  // })

  const updateDisplay = (event) => {
    const pressedButton = event.target.outerText;
    let lastCharacterOnDisplay;
    if (display.length > 1) {
      lastCharacterOnDisplay = display.charAt(display.length - 1);
    }
    const checkDecimalPoint = /\.[0-9]*$/;

    // handle pressing "0"
    if (pressedButton === "0") {
      if (display === "0") {
        return;
      } else {
        setDisplay(display + pressedButton);
      }
    }
    // handle decimal point
    else if (pressedButton === ".") {
      if (!checkDecimalPoint.test(display)) {
        setDisplay(display + pressedButton);
      } else {
        console.log("should not add decimal point!");
      }
    }
    // handle operators------------------
    // if the pressed button is an operator:
    else if (operators.includes(pressedButton)) {
      // if the last pressed button was also an operator:
      if (operators.includes(lastCharacterOnDisplay)) {
        if (pressedButton === "-") {
          setDisplay(display + pressedButton);
        } else {
          // don't do this if the last character was a "-"
          if (lastCharacterOnDisplay === "-") {
            let numberOfCharsToSlice = 0;
            for (let i = display.length; i >= 0; i--) {
              if (operators.includes(display.charAt(i))) {
                numberOfCharsToSlice++;
              }
            }
            const newDisplay = display.slice(0, -numberOfCharsToSlice);
            setDisplay(newDisplay + pressedButton);
          } else {
            const newDisplay = display.slice(0, -1);
            setDisplay(newDisplay + pressedButton);
          }
        }
      } else {
        console.log("we do get till here");
        setDisplay(display + pressedButton);
      }
    }
    // handle all other cases
    else {
      if (display === "0") {
        setDisplay(pressedButton);
      } else {
        setDisplay(display + pressedButton);
      }
    }
  };
  return (
    <div id={"wrapper"}>
      <div id={"calculator"}>
        <div id={"display"}>{display}</div>
        <button
          id={"clear"}
          onClick={() => {
            setPrevResult("0");
            setDisplay("0");
          }}
        >
          AC
        </button>
        <button
          id={"divide"}
          className={"operator"}
          onClick={(e) => updateDisplay(e)}
        >
          /
        </button>
        <button
          id={"multiply"}
          className={"operator"}
          onClick={(e) => updateDisplay(e)}
        >
          *
        </button>
        <button id={"seven"} onClick={(e) => updateDisplay(e)}>
          7
        </button>
        <button id={"eight"} onClick={(e) => updateDisplay(e)}>
          8
        </button>
        <button id={"nine"} onClick={(e) => updateDisplay(e)}>
          9
        </button>
        <button
          id={"subtract"}
          className={"operator"}
          onClick={(e) => updateDisplay(e)}
        >
          -
        </button>
        <button id={"four"} onClick={(e) => updateDisplay(e)}>
          4
        </button>
        <button id={"five"} onClick={(e) => updateDisplay(e)}>
          5
        </button>
        <button id={"six"} onClick={(e) => updateDisplay(e)}>
          6
        </button>
        <button
          id={"add"}
          className={"operator"}
          onClick={(e) => updateDisplay(e)}
        >
          +
        </button>
        <button id={"one"} onClick={(e) => updateDisplay(e)}>
          1
        </button>
        <button id={"two"} onClick={(e) => updateDisplay(e)}>
          2
        </button>
        <button id={"three"} onClick={(e) => updateDisplay(e)}>
          3
        </button>
        <button
          id={"equals"}
          onClick={() => {
            setPrevResult(eval(display));
            setDisplay(eval(display));
          }}
        >
          =
        </button>
        <button id={"zero"} onClick={(e) => updateDisplay(e)}>
          0
        </button>
        <button id={"decimal"} onClick={(e) => updateDisplay(e)}>
          .
        </button>
        {/* position the "=" button correctly */}
      </div>
    </div>
  );
}

export default App;
