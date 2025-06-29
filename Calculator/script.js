document.addEventListener('DOMContentLoaded', function() {

    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history');
    const numberButtons = document.querySelectorAll('.number:not(#sign):not(#decimal)');
    const operatorButtons = document.querySelectorAll('.operator:not(#clear):not(#backspace):not(#percentage)');
    const scientificButtons = document.querySelectorAll('.scientific');
    const clearButton = document.getElementById('clear');
    const backspaceButton = document.getElementById('backspace');
    const decimalButton = document.getElementById('decimal');
    const equalsButton = document.getElementById('equals');
    const signButton = document.getElementById('sign');
    const percentageButton = document.getElementById('percentage');
    const themeToggle = document.getElementById('themeToggle');

    
    let currentInput = '0';
    let previousInput = '';
    let operation = '';
    let resetInput = false;
    let calculationHistory = [];

   
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('light-theme');
    });

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function updateHistory() {
        historyDisplay.textContent = calculationHistory.join(' ');
    }

    
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentInput === '0' || resetInput) {
                currentInput = button.textContent;
                resetInput = false;
            } else {
                currentInput += button.textContent;
            }
            updateDisplay();
        });
    });

   
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (operation && !resetInput) {
                compute();
            }
            previousInput = currentInput;
            operation = button.textContent;
            calculationHistory.push(previousInput, operation);
            updateHistory();
            resetInput = true;
        });
    });

   
    scientificButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = parseFloat(currentInput);
            let result;
            
            switch(button.id) {
                case 'power':
                    previousInput = currentInput;
                    operation = '^';
                    calculationHistory.push(previousInput, operation);
                    updateHistory();
                    resetInput = true;
                    break;
                case 'sqrt':
                    result = Math.sqrt(value);
                    calculationHistory.push('√(' + currentInput + ')', '=', result);
                    currentInput = result.toString();
                    updateDisplay();
                    updateHistory();
                    resetInput = true;
                    break;
                case 'factorial':
                    result = factorial(value);
                    calculationHistory.push(currentInput + '!', '=', result);
                    currentInput = result.toString();
                    updateDisplay();
                    updateHistory();
                    resetInput = true;
                    break;
                case 'pi':
                    currentInput = Math.PI.toString();
                    updateDisplay();
                    break;
                case 'sin':
                    result = Math.sin(value);
                    calculationHistory.push('sin(' + currentInput + ')', '=', result);
                    currentInput = result.toString();
                    updateDisplay();
                    updateHistory();
                    resetInput = true;
                    break;
                case 'cos':
                    result = Math.cos(value);
                    calculationHistory.push('cos(' + currentInput + ')', '=', result);
                    currentInput = result.toString();
                    updateDisplay();
                    updateHistory();
                    resetInput = true;
                    break;
                case 'tan':
                    result = Math.tan(value);
                    calculationHistory.push('tan(' + currentInput + ')', '=', result);
                    currentInput = result.toString();
                    updateDisplay();
                    updateHistory();
                    resetInput = true;
                    break;
                case 'log':
                    result = Math.log10(value);
                    calculationHistory.push('log(' + currentInput + ')', '=', result);
                    currentInput = result.toString();
                    updateDisplay();
                    updateHistory();
                    resetInput = true;
                    break;
            }
        });
    });

    
    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

   
    clearButton.addEventListener('click', () => {
        currentInput = '0';
        previousInput = '';
        operation = '';
        calculationHistory = [];
        updateDisplay();
        updateHistory();
    });

    
    backspaceButton.addEventListener('click', () => {
        if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    });

   
    decimalButton.addEventListener('click', () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    });

    signButton.addEventListener('click', () => {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    });

    
    percentageButton.addEventListener('click', () => {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    });

   
    equalsButton.addEventListener('click', () => {
        if (operation && !resetInput) {
            compute();
            calculationHistory.push('=', currentInput);
            updateHistory();
        }
    });

    
    function compute() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        currentInput = computation.toString();
        operation = '';
        resetInput = true;
        updateDisplay();
    }

    updateDisplay();
});