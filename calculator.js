document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let firstNumber = '';
    let currentOperator = '';
    let secondNumber = '';
    let shouldResetDisplay = false;

    // Add click event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('equals')) {
                calculateResult();
            } else if (button.classList.contains('clear')) {
                clearCalculator();
            } else if (button.classList.contains('decimal')) {
                handleDecimal();
            }
        });
    });

    // Handle number input
    function handleNumber(num) {
        if (shouldResetDisplay) {
            result.value = num;
            shouldResetDisplay = false;
        } else {
            result.value += num;
        }
        
        if (currentOperator) {
            secondNumber = result.value;
        } else {
            firstNumber = result.value;
        }
    }

    // Handle operator input
    function handleOperator(operator) {
        if (firstNumber && secondNumber) {
            calculateResult();
        }
        currentOperator = operator;
        shouldResetDisplay = true;
    }

    // Handle decimal point
    function handleDecimal() {
        if (!result.value.includes('.')) {
            result.value += '.';
        }
    }

    // Calculate the result
    function calculateResult() {
        if (!firstNumber || !currentOperator || !secondNumber) return;

        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);
        let calculatedResult;

        switch(currentOperator) {
            case '+':
                calculatedResult = num1 + num2;
                break;
            case '-':
                calculatedResult = num1 - num2;
                break;
            case '*':
                calculatedResult = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    result.value = 'Error: Division by zero';
                    clearVariables();
                    return;
                }
                calculatedResult = num1 / num2;
                break;
        }

        // Round to prevent floating point precision issues
        result.value = Math.round(calculatedResult * 1000000) / 1000000;
        firstNumber = result.value;
        secondNumber = '';
        shouldResetDisplay = true;
    }

    // Clear calculator
    function clearCalculator() {
        result.value = '';
        clearVariables();
    }

    // Clear variables
    function clearVariables() {
        firstNumber = '';
        currentOperator = '';
        secondNumber = '';
        shouldResetDisplay = false;
    }

    // Add keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        if (/[0-9]/.test(key)) {
            handleNumber(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleOperator(key);
        } else if (key === 'Enter' || key === '=') {
            calculateResult();
        } else if (key === 'Escape') {
            clearCalculator();
        } else if (key === '.') {
            handleDecimal();
        }
    });
});