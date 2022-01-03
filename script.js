class Money {
    constructor(budgetInput, expenseInput, amountInput, budget, 
        expenses, balance, appendedContainer, budgetContainer, expenseContainer) {
            this.budgetInput = budgetInput;
            this.expenseInput = expenseInput;
            this.amountInput = amountInput;
            this.budget = budget;
            this.expenses = expenses;
            this.balance = balance;
            this.appendContainer = appendedContainer;
            this.budgetContainer = budgetContainer;
            this.expenseContainer = expenseContainer;

            this.budgetContainer.addEventListener('submit', (evt) => {
                evt.preventDefault()
                this.setBudget()
            });
            this.expenseContainer.addEventListener('submit', (evt) => {
                evt.preventDefault()
                this.setExpenses()
            });
    };

// sets budget and balance 
    setBudget = () => {
        this.budget.innerText = this.budgetInput.value;
        this.balance.innerText = this.budgetInput.value;
        this.budgetInput.value = '';
    }

// sets expense field
    setExpenses = () => {

        // parsing text values to float 
        const expensesValue = parseFloat(this.expenses.innerText)
        const amountInputValue = parseFloat(this.amountInput.value)
        const balanceValue = parseFloat(this.balance.innerText)

        this.expenses.innerText = expensesValue + amountInputValue;
        this.balance.innerText = balanceValue - amountInputValue;
        
        // passing fn where defined each expense
        this.individualExpense();

        this.amountInput.value = '';
        this.expenseInput.value = '';
    }

    // fn for individual expense
    individualExpense = () => {
        const balanceValue = parseFloat(this.balance.innerText)
        const expensesValue = parseFloat(this.expenses.innerText)

        // creating elements
       const box = document.createElement('div')
       box.classList.add('appended-box')
       const expenseTitle = document.createElement('p')
       expenseTitle.classList.add('expense-title')
       const expenseValue = document.createElement('p')
       expenseValue.classList.add('expense-value')
       const icons = document.createElement('div')
       icons.classList.add('icons')
       const check = document.createElement('i')
       check.classList.add('far', 'fa-check-square')
       const trash = document.createElement('i')
       trash.classList.add('fas', 'fa-trash')

    // appending elements
        box.append(expenseTitle)
        box.append(expenseValue)
        icons.append(check)
        icons.append(trash)
        box.append(icons)
        appendedContainer.appendChild(box)

        expenseTitle.innerText = this.expenseInput.value;
        expenseValue.innerText = this.amountInput.value;
        const expenseTextValue = parseFloat(expenseValue.innerText)

        // check icon event - will start animation change values and then after 1sec removes element from the DOM
        check.addEventListener('click', () => {
            box.classList.add('animation')
            this.balance.innerText = balanceValue + expenseTextValue;
            this.expenses.innerText = expensesValue - expenseTextValue;

            setInterval(() => {
                box.remove()    
            }, 1000);
        });

        // delete icon event
        trash.addEventListener('click', () => {
            box.classList.add('animation')
            this.balance.innerText = balanceValue + expenseTextValue;
            this.expenses.innerText = expensesValue - expenseTextValue;

            setInterval(() => {
                box.remove()    
            }, 1000);
        });
    }
};

// DOM elements
const budgetInput = document.getElementById('budget-input')
const expenseInput = document.getElementById('expense-input')
const amountInput = document.getElementById('amount-input')

const budget = document.getElementById('budget')
const expenses = document.getElementById('expenses')
const balance = document.getElementById('balance')

const appendedContainer = document.querySelector('.appended-expense')
const budgetContainer = document.querySelector('.budget-container')
const expenseContainer = document.querySelector('.expense-container')

// class instance
const money = new Money(budgetInput, expenseInput, amountInput, budget, 
    expenses, balance, appendedContainer, budgetContainer, expenseContainer)

