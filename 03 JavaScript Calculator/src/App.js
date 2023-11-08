// 07 oct 06:03

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMain: 0,
      displaySec: "",
      numbers: [],
      symbols: []
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.getElementById("display").innerHTML = 0;
    document.getElementById("display-secondary").innerHTML = "";
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    // VARIABLES
    let numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let eraseKeys = ["C", "c", "Backspace"];
    let symbolKeys = ["+", "-", "*", "/"];

    // NUMBERS AND DOTS
    if ((numberKeys.includes(event.key)) ||
      (event.key === "." && this.state.displayMain.indexOf(".") === -1)) {

      if (event.key == "0" && this.state.displayMain == 0) {
        return;
      }

      const newDisplayMain = this.state.displayMain === 0 ?
        event.key:
        this.state.displayMain + event.key;

      this.setState(
        { displayMain: newDisplayMain },
        () => {
          console.log(this.state);
          document.getElementById("display").innerHTML = newDisplayMain;
          return;
        }
      );
    }

    // ERASE
    else if (eraseKeys.includes(event.key)) {

      // ERASE ALL
      if (["c", "C"].includes(event.key.toUpperCase())) {
        this.setState(
          {
            displayMain: 0,
            displaySec: "",
            numbers: [],
            symbols: [],
            negative: false
          },
          () => {
            document.getElementById("display").innerHTML = 0;
            document.getElementById("display-secondary").innerHTML = "";
          }
        );
        return;
      }
      
      // ERASE LAST
      else if (event.key === "Backspace") {
        if (this.state.displayMain == 0) {
          return;
        }

        let newDisplayMain = this.state.displayMain.length === 1 ?
          0:
          this.state.displayMain.slice(0, this.state.displayMain.length - 1);

        this.setState(
          { displayMain: newDisplayMain },
          () => {
            document.getElementById("display").innerHTML = newDisplayMain;
          }
        );
        return;
      }
    }
    
    // OPERATIONS
    else if (symbolKeys.includes(event.key)) {
      // CONTROL VARIABLES
      let numbers = true;
      let action = "append";

      // ZERO IN THE MAIN DISPLAY
      if (this.state.displayMain == 0) {
        // NO SUBTRACT MEANS NEW OPERATION
        numbers = false;
        if (event.key !== "-") {
          // REPLACE BECAUSE THE SECONDARY DISPLAY WILL ALWAYS
          // HAVE A SYMBOL AT THE END
          action = "replace";
        }
        // SUBTRACT MEANS NEGATIVE NUMBER
        else {
          action = "negative";
          this.setState(
            {
              negative: true
            }
          );
        }
      }

      // EXCEPTION WITH - CANCELED
      if (this.state.displayMain == "-" && this.state.negative) {
        this.setState(
          {
            negative: true
          }
        );
        action = "canceledNegative";
      }

      // SYMBOL WITH NUMBER AND ONLY SYMBOL
      // ARE CASES ADDED NORMALLY
      let newNumber = numbers ?
        parseFloat(this.state.displayMain):
        "";

      let newSymbol = event.key;

      let newNumbers = numbers ?
        [...this.state.numbers, newNumber]:
        [...this.state.numbers];

      let newSymbols = [...this.state.symbols];
      
      let newDisplayMain = 0;
      let newDisplaySec = action === "negative" ?
        this.state.displaySec:
        this.state.displaySec + newNumber + newSymbol;

      switch (action) {
        case "append":
          newSymbols = [...this.state.symbols, newSymbol];
          break;
        case "replace":
          console.log(newSymbol)
          newSymbols = [
            ...this.state.symbols.slice(0, this.state.symbols.length - 1),
            newSymbol
          ];
          break;
        case "negative":
          newDisplayMain = event.key;
          break;
        case "canceledNegative":
          newDisplayMain = 0;
          newDisplaySec = "-" + event.key;
          newNumbers = [...this.state.numbers];
          newSymbols = [
            ...this.state.symbols.slice(0, this.state.symbols.length - 1),
            newSymbol
          ];
      }

      this.setState(
        {
          displayMain: newDisplayMain,
          displaySec: newDisplaySec,
          numbers: newNumbers,
          symbols: newSymbols
        },
        () => {
          console.log(this.state)
          document.getElementById("display").innerHTML = newDisplayMain;
          document.getElementById("display-secondary").innerHTML = newDisplaySec;
        }
      );
    }
    
    // RESULT
    else if (event.key === "Enter") {
      // SAVE THE LAST NUMBER IF ANY
      let newNumbers = this.state.displayMain === 0 ?
        [...this.state.numbers]:
        [...this.state.numbers, parseFloat(this.state.displayMain)];

      // CALCULATE THE RESULT
      let total = newNumbers[0];
      for (let i = 0; i < newNumbers.length - 1; i++) {
        switch (this.state.symbols[i]) {
          case "+":
            total += newNumbers[i + 1];
            break;
          case "-":
            total -= newNumbers[i + 1];
            break;
          case "*":
            total *= newNumbers[i + 1];
            break;
          case "/":
            total /= newNumbers[i + 1];
        }
      }

      // SET THE STATE
      this.setState(
        {
          displayMain: total,
          displaySec: "",
          numbers: [],
          symbols: []
        },
        () => {
          console.log("R" + total)
          document.getElementById("display").innerHTML = total
        }
      );
    }
  }

  handleClear() {
    this.setState(
      {
        displayMain: 0,
        displaySec: "",
        numbers: [],
        symbols: []
      }
    );
    document.getElementById("display").innerHTML = 0;
    document.getElementById("display-secondary").innerHTML = "";
  }


  render() {
    return (
      <div className={"bg-dark rounded-bottom"} id={"calculator"}>
        <div className={"bg-primary-subtle"} id={"display-container"}>
          <p id={"display-secondary"}></p>
          <p id={"display"}></p>
        </div>
        <div id={"numbers"}>
          <button className={"btn btn-secondary"} id={"one"} onClick={() => this.handleKeyPress({key: "1"})}>1</button>
          <button className={"btn btn-secondary"} id={"two"} onClick={() => this.handleKeyPress({key: "2"})}>2</button>
          <button className={"btn btn-secondary"} id={"three"} onClick={() => this.handleKeyPress({key: "3"})}>3</button>
          <button className={"btn btn-secondary"} id={"four"} onClick={() => this.handleKeyPress({key: "4"})}>4</button>
          <button className={"btn btn-secondary"} id={"five"} onClick={() => this.handleKeyPress({key: "5"})}>5</button>
          <button className={"btn btn-secondary"} id={"six"} onClick={() => this.handleKeyPress({key: "6"})}>6</button>
          <button className={"btn btn-secondary"} id={"seven"} onClick={() => this.handleKeyPress({key: "7"})}>7</button>
          <button className={"btn btn-secondary"} id={"eight"} onClick={() => this.handleKeyPress({key: "8"})}>8</button>
          <button className={"btn btn-secondary"} id={"nine"} onClick={() => this.handleKeyPress({key: "9"})}>9</button>
          <button className={"btn btn-secondary"} id={"zero"} onClick={() => this.handleKeyPress({key: "0"})}>0</button>
          <button className={"btn btn-secondary"} id={"decimal"} onClick={() => this.handleKeyPress({key: "."})}>.</button>
        </div>
        <div id={"symbols"}>
          <button className={"btn btn-danger"} id={"clear"} onClick={() => this.handleClear()}>C</button>
          <button className={"btn btn-warning"} id={"erase"} onClick={() => this.handleKeyPress({key: "Backspace"})}>E</button>
          <button className={"btn btn-secondary"} id={"add"} onClick={() => this.handleKeyPress({key: "+"})}>+</button>
          <button className={"btn btn-secondary"} id={"subtract"} onClick={() => this.handleKeyPress({key: "-"})}>-</button>
          <button className={"btn btn-secondary"} id={"multiply"} onClick={() => this.handleKeyPress({key: "*"})}>*</button>
          <button className={"btn btn-secondary"} id={"divide"} onClick={() => this.handleKeyPress({key: "/"})}>/</button>
          <button className={"btn btn-success"} id={"equals"} onClick={() => this.handleKeyPress({key: "Enter"})}>=</button>
        </div>
      </div>
    );
  }
}

export default App;

// Pause     07 oct 12:02
// Continue  07 oct 12:35
// Pause     07 oct 13:14
// Continue  07 oct 14:30
// Finished     07 oct 17:03