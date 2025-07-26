/**
 * the calculator class that represents a blueprint for creating a calculator object with methods for performing calculations and updating the display
 */
class Calculator{
    /**
     * @param {HTMLElement} previousOperandTextElement - the DOM element for the previous operand display
     * @param {HTMLElement} currentOperandTextElement - the DOM element for the current operand display
     */
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement= previousOperandTextElement
        this.currentOperandTextElement= currentOperandTextElement
        this.clear() //the method call is for initializing the state of the calculator
    }
    /**
     * this methos below clears all operands and the operations resetting the calculator state
     */
    clear(){
        this.currentOperand= ''
        this.previousOperand= ''
        this.operation= undefined
    }
    /**
     * the method below deletes the last character from the current operand
     */
    delete(){
        this.currentOperand= this.currentOperand.toString().slice(0, -1)
    }
    /**
     * the method below appends a number to the current operand
     * it prevents multiple decimal points
     * @param {string} number - the number string to append
     */
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand= this.currentOperand.toString()+ number.toString()
    }
    /**
     * this method sets the chosen operation and moves the current operand to the previous operand
     * if there's already a previous operand, it computes the result first
     * @param {string} operation - the operation symbol (+, -, *, /)
     */
    choseOperation(operation){
        if(this.currentOperand === '') return; //do nothing if there's no current operand
        if(this.previousOperand !== ''){
            this.compute() //compute if there's a pending operation
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '' //clears the current operand for new input
    }
    /**
     * this methos below performs the calculations based on the stored operation and operands
     */
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return; //do nothing if operands are not numbers
        switch(this.operation){
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                if(current === 0){
                    computation = 'error div by 0' //this indicates that division by 0 is not allowed
                }else{
                    computation = prev / current
                }
                break;
            default: 
                return; //do nothing if no valid operation
        }
        this.currentOperand = computation.toString()
        this.operation = undefined
        this.previousOperand = ''
    }
    /**
     * this method below formats a number for display, add commas for thousands and handling decimals
     * @param {string} number - the number string to format
     * @return {string} the formatted number string
     */
    getDisplayNumber(number){
        const stringNumber= number.toString()
        const intergerDigit= parseFloat(stringNumber.split('.')[0])
        const decimalDigit= stringNumber.split('.')[1]
        let intergerDisplay;
        if(isNaN(intergerDigit)){
            intergerDisplay = ''
        }else{
            intergerDisplay = intergerDigit.toLocaleString('en', {maximusFractionDigits: 0})
        }
        if(decimalDigit != null){
            return `${intergerDigit}.${decimalDigit}`
        }else{
            return intergerDisplay
        }
    }
    /**
     * this method below updates the text content of the displayed elements based on the current calculator state
     */
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}
// get all references to the necessary DOM elements
const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalsButton= document.querySelector('[data-equals]')
const delButton= document.querySelector('[data-delete]')
const clearButton= document.querySelector('[data-clear]')
const previousOperandTextElement= document.querySelector('[data-previous-operand]')
const currentOperandTextElement= document.querySelector('[data-current-operand]')

//create a new calculator instance(object)
const newCalculator= new Calculator(previousOperandTextElement, currentOperandTextElement)

//adding event listeners
//add click listeners for number buttons
numberButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        newCalculator.appendNumber(button.innerText)
        newCalculator.updateDisplay()
    })
})

//add click listeners for operation buttons
operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        newCalculator.choseOperation(button.innerText)
        newCalculator.updateDisplay()
    })
})

//add click listeners for the equals button
equalsButton.addEventListener('click', ()=>{
    newCalculator.compute()
    newCalculator.updateDisplay()
})

// add click listeners for clear button
clearButton.addEventListener('click', ()=>{
    newCalculator.clear()
    newCalculator.updateDisplay()
})

// add click listener for delete button
delButton.addEventListener('click', ()=>{
    newCalculator.delete()
    newCalculator.updateDisplay()
})

//initialize display update
newCalculator.updateDisplay()