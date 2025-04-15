
/*
    DJJJ Personal Budget Tracker

    Course: PROG-2700 Client Side Programming
    Author's: Dawson, Jeremy, Judah, Josh (DJJJ)
    Date: 13/04/2025
    Instructor: Nadia Gouda


*/


//  Create a Transaction Class
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



//Create a BudgetTracker Class
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

    loadTransactions(){
            let localTransactions = localStorage.getItem("transactions");
            let transactions = JSON.parse(localTransactions);
            return transactions;
    }

    initEventListeners(){
        this.form.addEventListener("submit", x =>{
            x.preventDefault();
            this.addTransaction();
        })
    }
    
    renderTransactions(){
        this.transactionList.innerHTML = "";
        this.transactions.slice().sort((a, b) => b.id - a.id).forEach
        (transaction =>{
            const transactionDiv = document.createElement("div");
            transactionDiv.classList.add("transaction", transaction.type);
            transactionDiv.innerHTML = `
                <ul id="transactionList">${transaction.date}\n${transaction.type}\n${transaction.description}\n${transaction.amount}</ul>
            `;
            this.transactionList.appendChild(transactionDiv);
        }); // copies transactions array to a new array, sorts them by id
        
    }

    saveLocal(){
        const balance = document.getElementById("balance").textContent;
        console.log(balance);
        localStorage.setItem("balance", balance);
        const stringTransactions = JSON.stringify(this.transactions);
        localStorage.setItem("transactions", stringTransactions);
    }



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

    // Shows all the transactions that are classified under as income!
    ShowIncomeTransactions() {
        let TotalIncome = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].type === "income") {
                TotalIncome += this.transactions[i].amount;
            }
        }
        return TotalIncome
    } // This will show the transactions that are listed as expenses
    ShowExpensesTransactions() {
        let TotalExpenses = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].type === "expense") {
                TotalExpenses += this.transactions[i].amount;
            }
        }
        return TotalExpenses;
    } // Balance is income subtract expenses
    showBalance() {
        return this.ShowIncomeTransactions() - this.ShowExpensesTransactions();
    }

    
    renderBalance(){
        document.getElementById("balance").innerHTML = "$" + this.showBalance();
        document.getElementById("income").innerHTML = "$" + this.ShowIncomeTransactions();
        document.getElementById("expense").innerHTML = "$" + this.ShowExpensesTransactions();
    }

     goodboyChecker(){
        if(this.showBalance() < 0){
            document.getElementById("balance").style.color = "red";
        }
        else if(this.showBalance() > 0){
            document.getElementById("balance").style.color = "rgb(121, 199, 121)";
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

     clearTransactions(){
        localStorage.clear();
        this.transactions = [];
        this.renderTransactions();
        this.renderBalance();
        this.goodboyChecker();
     }
}

function loadLocal(){
    theBudget.goodboyChecker();
    document.getElementById("balance").innerHTML = "$" +  theBudget.showBalance();
    document.getElementById("income").innerHTML = "$" +  theBudget.ShowIncomeTransactions();
    document.getElementById("expense").innerHTML = "$" +  theBudget.ShowExpensesTransactions();
}

let theBudget = new BudgetTracker();

function exportLocal(){
    const data = theBudget.transactions;
    const fileName = "myTransactions";
    const exportType = "csv";
    window.exportFromJSON({data, fileName, exportType});
}

