
/*
    DJJJ Personal Budget Tracker

    Course: PROG-2700 Client Side Programming
    Author's: Dawson, Jeremy, Judah, Josh (DJJJ)
    Date: 13/04/2025
    Instructor: Nadia Gouda


*/

class Transaction {
    constructor(amount, category, type, date) {
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.date = date;
        this.id = Date.now();
    }
    TransactionSummary() {
        return this.date + " " + this.type + " " + this.category + " " + this.amount
    }
}

class BudgetTracker {
    constructor() {
        this.transactions = this.loadTransactions();
        if(this.transactions == null){
            this.transactions = [];
        }
        this.form = document.getElementById("transactionForm");
        this.transactionList = document.getElementById("transactionList");
        this.balanceElement = document.getElementById("balance");

        this.saveLocal();
        this.initEventListeners();
        this.renderTransactions();
    }

    // grabs transactions array from localStorage, parses it to useable data
    loadTransactions(){
            let localTransactions = localStorage.getItem("transactions");
            let transactions = JSON.parse(localTransactions);
            return transactions;
    }

    // event listener that adds a transaction when a submit event happens on the webpage, preventDefault stops the webpage from reloading itself
    initEventListeners(){
        this.form.addEventListener("submit", x =>{
            x.preventDefault();
            this.addTransaction();
        })
    }
    
    // this sets the transactionList to blank, then it uses slice and sort to arrange the transactions. it makes it so the latest transaction is at the top
    renderTransactions(){
        this.transactionList.innerHTML = "";
        this.transactions.slice().sort((a, b) => b.id - a.id).forEach
        (transaction =>{
            const transactionDiv = document.createElement("div"); // creates a div for each transaction
            transactionDiv.innerHTML = `
                <ul id="transactionList">${transaction.date}\n${transaction.type}\n${transaction.description}\n${transaction.amount}</ul>
            `; // this is filling in the content of the list
            this.transactionList.appendChild(transactionDiv); // appends the transactionDiv to the list
        }); // copies transactions array to a new array, sorts them by id
        
    }

    // this saves the transactions array to the localStorage(turns it to a string, then saves it)
    saveLocal(){
        const stringTransactions = JSON.stringify(this.transactions);
        localStorage.setItem("transactions", stringTransactions);
    }

    // clears the form values
    clearForm(){
        document.getElementById("userType").value = "";
        document.getElementById("userDesc").value = "";
        document.getElementById("userDate").value = "";
        document.getElementById("userAmount").value = "";
    }

    // adding transaction
    addTransaction(Transaction) {
        const description = document.getElementById("userDesc").value;
        const amount = parseFloat(document.getElementById("userAmount").value);
        const type = document.getElementById("userType").value;
        const date = document.getElementById("userDate").value;

        const transaction = {
            id: Date.now(),
            description,
            amount,
            type,
            date
        }

        this.transactions.push(transaction);
        this.goodboyChecker();
        this.renderTransactions();
        this.renderBalance();
        this.saveLocal();
        this.clearForm();
    }

    // shows income with a loop. returns the value for calculation purpose
    ShowIncomeTransactions() {
        let TotalIncome = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].type === "income") {
                TotalIncome += this.transactions[i].amount;
            }
        }
        return TotalIncome;
    } 

    // shows expenses with a loop. returns the value for calculation purpose
    ShowExpensesTransactions() {
        let TotalExpenses = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].type === "expense") {
                TotalExpenses += this.transactions[i].amount;
            }
        }
        return TotalExpenses;
    }

    // income - expense = value
    showBalance() {
        return this.ShowIncomeTransactions() - this.ShowExpensesTransactions();
    }

    // sets the innerHTML of our divs using getelementbyid and calling functions that return our calculated numbers
    renderBalance(){
        document.getElementById("balance").innerHTML = "$" + this.showBalance();
        document.getElementById("income").innerHTML = "$" + this.ShowIncomeTransactions();
        document.getElementById("expense").innerHTML = "$" + this.ShowExpensesTransactions();
    }

    // this checks your balance and tells you if you're doing a good job
    // if your balance is 0, it remains white
    // if your balance is negative it turns red
    // if your income is 20% higher than your expenses it turns green
    goodboyChecker(){
        if(this.showBalance() < 0){
            document.getElementById("balance").style.color = "red";
        }
        else if(this.showBalance() > 0){
            document.getElementById("balance").style.color = "rgb(121, 199, 121)";
        }
        else{
            document.getElementById("balance").style.color = "white";
        }
        if(this.ShowIncomeTransactions() * 0.8 > this.ShowExpensesTransactions()){
            document.getElementById("tracker").innerHTML = "GOOD BOY";
            document.getElementById("tracker").style.color = "rgb(121, 199, 121)";
        }
        else if(this.showBalance() < 0){
            document.getElementById("tracker").innerHTML = "BAD BOY";
            document.getElementById("tracker").style.color = "red";
        }
        else{
            document.getElementById("tracker").innerHTML = "";
        }
    }

    // clears local storage, reinitializes the array so it isn't null for use in our other methods.
    // re-renders transactions, balance and checks if you're a good boy
    clearTransactions(){
        localStorage.clear();
        this.transactions = [];
        this.renderTransactions();
        this.renderBalance();
        this.goodboyChecker();
    }
}

// takes the balance income and expense from the budgetTracker storage and sets the innerHTML to the values
function loadLocal(){
    theBudget.goodboyChecker();
    document.getElementById("balance").innerHTML = "$" +  theBudget.showBalance();
    document.getElementById("income").innerHTML = "$" +  theBudget.ShowIncomeTransactions();
    document.getElementById("expense").innerHTML = "$" +  theBudget.ShowExpensesTransactions();
}

let theBudget = new BudgetTracker();

// exporting the transaction array to CSV
function exportLocal(){
    const data = theBudget.transactions;
    const fileName = "myTransactions";
    const exportType = "csv";
    window.exportFromJSON({data, fileName, exportType});
}