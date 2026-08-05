let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

     
        if (value === "AC") {
            currentInput = "";
            previousInput = "";
            operator = "";
            display.value = "";
            return;
        }

        if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
            return;
        }

     
        if (["+", "-", "*", "/", "%"].includes(value)) {
            if (currentInput === "" && previousInput !== "") {
                operator = value;
                return;
            }

            if (currentInput === "") return;

            if (previousInput !== "" && operator !== "") {
                calculate();
            } else {
                previousInput = currentInput;
            }

            operator = value;
            currentInput = "";
            return;
        }

    
        if (value === "=") {
            if (previousInput === "" || currentInput === "" || operator === "") {
                return;
            }

            calculate();
            operator = "";
            previousInput = "";
            return;
        }

      
        if (value === "." && currentInput.includes(".")) {
            return;
        }

      
        currentInput += value;
        display.value = currentInput;
    });
});


function calculate() {
    const num1 = Number(previousInput);
    const num2 = Number(currentInput);

    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                display.value = "Error";
                currentInput = "";
                previousInput = "";
                operator = "";
                return;
            }
            result = num1 / num2;
            break;

        case "%":
            if (num2 === 0) {
                display.value = "Error";
                currentInput = "";
                previousInput = "";
                operator = "";
                return;
            }
            result = num1 % num2;
            break;

        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    previousInput = result.toString();
}