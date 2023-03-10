class TippingCard {
    constructor(tipAmountTextElement, totalTextElement) {
        this.tipAmountTextElement = tipAmountTextElement
        this.totalTextElement = totalTextElement
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }

    calculateTip(bill, tipPercent, numPeople) {
        if (numPeople == 0) return
        return bill*tipPercent/numPeople;
    }

    calculateTotal(bill, tipPercent, numPeople) {
        if (numPeople == 0) return
        return (bill*(1+tipPercent))/numPeople
    }
    
    update(bill, tipPercent, numPeople) {
        console.log(`${bill}, ${tipPercent}, ${numPeople}`)
        const tip = this.calculateTip(bill, tipPercent, numPeople)
        const total = this.calculateTotal(bill, tipPercent, numPeople)
        this.tipAmountTextElement.textContent = this.formatter.format(`${isNaN(tip) ? 0 : tip.toString()}`)
        this.totalTextElement.textContent = this.formatter.format(`${isNaN(total) ? 0 : total.toString()}`)
    }
}

function toggleOn(button) {
    if (button.classList.contains('toggled')) return
    else button.classList.add('toggled')
}

function toggleOff(button) {
    if (!button.classList.contains('toggled')) return
    else button.classList.remove('toggled')
}

function getBill() {
    if (billAmountInput.value != "")
        return billAmountInput.value
    else return 0
}

function getTipPercent() {
    if(customTipInput.value != "")
        return customTipInput.value/100
    else {
        for (let i = 0; i < tipButtons.length; i++) {
            if (tipButtons[i].classList.contains('toggled'))
            return parseFloat(tipButtons[i].textContent.replace(/% ?/g, ""))/100
        }
    }
}

function getNumPeople() {
    if (numPeopleInput.value != "")
        return numPeopleInput.value
    else return 0
}

function checkValidNumPeople() {
    if (numPeopleInput.value > 0) {
        warningText.classList.add('hidden')
        numPeopleInput.classList.remove('num-person-warning-form')
    }
        
    else {
        warningText.classList.remove('hidden')
        numPeopleInput.classList.add('num-person-warning-form')
    }
        
}


// Import buttons and text-fields from DOM
const billAmountInput = document.querySelector('#bill');
const numPeopleInput = document.querySelector('#num-person');
const tipAmountTextElement = document.querySelector('#tip-amount');
const totalTextElement = document.querySelector('#total');
const tipButtons = document.querySelectorAll('.forms__grid-tip > button')
const customTipInput = document.querySelector('#custom')
const resetButton = document.querySelector('#reset-button')
const warningText = document.querySelector('.num-person-warning-text')

const tippingCard = new TippingCard(tipAmountTextElement, totalTextElement)

billAmountInput.addEventListener('input', () => {
    checkValidNumPeople()
    tippingCard.update(getBill(), getTipPercent(), getNumPeople())
})

numPeopleInput.addEventListener('input', () => {
    checkValidNumPeople()
    tippingCard.update(getBill(), getTipPercent(), getNumPeople())
})

tipButtons.forEach(buttonClicked => {
    buttonClicked.addEventListener('click', () => {
        checkValidNumPeople()
        tipButtons.forEach(button => {
            if (button === buttonClicked) toggleOn(buttonClicked)
            else toggleOff(button)
        })
        customTipInput.value = "";
        tippingCard.update(getBill(), getTipPercent(), getNumPeople())
    })
})

customTipInput.addEventListener('input', () => {
    checkValidNumPeople()
    tipButtons.forEach(button => {
        toggleOff(button)
    })
    tippingCard.update(getBill(), getTipPercent(), getNumPeople())
})

resetButton.addEventListener('click', () => {
    billAmountInput.value = ""
    tipButtons.forEach(button => {
        toggleOff(button)
    })
    customTipInput.value = ""
    numPeopleInput.value = ""

    warningText.classList.add('hidden');
    numPeopleInput.classList.remove('num-person-warning-form')
    tippingCard.update(getBill(), getTipPercent(), getNumPeople())
})







