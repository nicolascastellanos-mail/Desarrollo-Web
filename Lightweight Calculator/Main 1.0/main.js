// Variables that control the state of the program
let mainText = "0";
let secondaryText = "";
let numbers = [];
let symbols = [];

// An interface to the click functions to bind keys as well
document.addEventListener("keydown", keyHandler);
function keyHandler(event) {
  let pressedKey = event.key;

  let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let operations = ["+", "-", "*", "/"];

  if (numbers.includes(pressedKey)) {
    return writeNumber(parseInt(pressedKey));
  } else if (operations.includes(pressedKey)) {
    return writeOperation(pressedKey);
  } else if (pressedKey === ".") {
    return writePeriod();
  } else if (pressedKey === "Enter") {
    return calculateResult();
  } else if (pressedKey === "Backspace") {
    return erase();
  } else if (pressedKey.toUpperCase() === "C") {
    return clearData();
  }
}

/* A function to put a number in the main display when
   entered by a button */
function writeNumber(number) {
  // This keeps zeros from being at the left
  if (mainText === "0") {
    if (number === 0) {
      return;
    }
    mainText = "" + number;
  } else {
    mainText += number;
  }
  $("#main-text").text(mainText);
}

/* A function to put a operation in the main display
   when entered by a button */
function writeOperation(operation) {
  /* The negative variable indicates when a minus operator
     is entered after another operator, but indicates that
     it just makes the number negative */
  let negative = false;
  /* The replacing variable indicates when an operator is
     written after another one, so it must replace it */
  let replacing = false;

  // If the operator was entered but there is not any number
  if (mainText === "0") {
    // Means we are entering an operator after another one, thus replacing
    replacing = true;
    /* This handles entering a negative sign
       The first two cases manage sign multiplication */
    if (operation === "-") {
      switch (secondaryText[secondaryText.length - 1]) {
      case "-":
        secondaryText = secondaryText.slice(0, secondaryText.length - 1) + "+";
        break;
      case "+":
        secondaryText = secondaryText.slice(0, secondaryText.length - 1) + "-";
        break;
      /* This case is reached when the previous operator is multiplication or division,
         so it can't be multiplied by minus and must be replaced */
      default:
        negative = true;
      }
    } else {
      /* This is reached when we are entering a sign different from zero after another
         one, so it is inmediately replaced */
      secondaryText = secondaryText.slice(0, secondaryText.length - 1) + operation;
    }
  } else {
    // This is reached when the main display does have a number to add to the secondary
    secondaryText += mainText + operation;
  }
  // This controls updating the state with both the new number and operation
  if (!replacing) {
    numbers.push(parseFloat(mainText));
    symbols.push(operation)
  }
  $("#secondary-text").text(secondaryText);
  mainText = negative ? "-" : "0";
  $("#main-text").text(mainText);
}

function writePeriod() {
  // Adds a period if there is not any one in the main display
  if (mainText.indexOf(".") == -1) {
    mainText += ".";
    $("#main-text").text(mainText);
  }
}

function calculateResult() {
  // We must first add a number if in the display
  if (mainText !== "0") {
    numbers.push(parseInt(mainText));
  } // In other case, we must delete the additional operator
  else {
    symbols.pop();
  }
  /* The array indexes will store the operators in the user's
     expression, along with their indexes in the expression,
     and ordered by precedence, being the index zero the first
     operation to be done */
  let indexes = [];
  /* The operations array will control the precedence, being
     added first the multiplications and such in the inner loop,
     because of the outter loop */
  let operations = ["*", "/", "+", "-"];
  for (let i = 0; i < operations.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (symbols[j] === operations[i]) {
        let operation = operations[i];
        indexes.push([j, operation ]);
      }
    }
  }
  /* This while loop will apply the operation in the index zero of
     the array indexes and eliminate it, until there is no more elements */
  while (indexes.length !== 0) {
    /* First we get the values from the first element and define where
       we will store the result */
    let index = indexes[0][0];
    let operation = indexes[0][1];
    let result;
    // Then this switch conditional will apply the right operation
    switch (operation) {
    case "*":
      result = numbers[index] * numbers[index + 1];
      break;
    case "/":
      result = numbers[index] / numbers[index + 1];
      break;
    case "+":
      result = numbers[index] + numbers[index + 1];
      break;
    case "-":
      result = numbers[index] - numbers[index + 1];
      break;
    }
    /* This eliminates the operation done and replaces the two operators
       with the result */
    numbers.splice(index, 2, result);
    indexes.shift();
    /* Since we replaced two elements in "numbers" for one, we must decrease
       all the indexes where the operators should work on */
    for (let i = 0; i < indexes.length; i++) {
      indexes[i][0] -= 1;
    }
  }
  /* This just handles a half reset of the state, except for
     the main display showing the result */
  mainText = numbers[0];
  secondaryText = "";
  numbers = [];
  symbols = [];
  $("#main-text").text(mainText);
  $("#secondary-text").text(secondaryText);
}

function erase() {
  // Can't erase when zero
  if (mainText === "0") {
    return;
  } else if (mainText.length === 1) {
    // The display should be set to zero if all is erased
    mainText = "0";
  } else {
    // If just erasing normaly, eliminate the last character
    mainText = mainText.slice(0, mainText.length - 1);
  }
  $("#main-text").text(mainText);
}

function clearData() {
  // Reset the state to default
  mainText = "0";
  secondaryText = "";
  numbers = [];
  symbols = [];
  $("#main-text").text(mainText);
  $("#secondary-text").text(secondaryText);
}
