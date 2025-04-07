
/*
Names: Jeremy Paruch, , , ,
Student Number: w0222971
Date: March 30,2025
Class: Client Side Programming
Instructor: Nadia Gouda


*/


//  Create a Transaction Class
class Transaction {
    constructor(amount, category, type, date) {
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.date = date;
    }
    TransactionSummary() {
        return this.date + " " + this.type + " " + this.category + " " + this.amount
    }
}

//Create a BudgetTracker Class
class BudgetTracker {
    constructor() {
        this.transactions = [];
    }
    // adding transaction
    addTransaction(Transaction) {
        this.transactions.push(Transaction);
    }
    // Method for showing all the transactions Moved the innerHTML over to this function so that it will appear in side the financial calculator
    ShowTransactions(transactionListUl) {
        for (let i = 0; i < this.transactions.length; i++) {
            transactionListUl.innerHTML += "<li>" + this.transactions[i].TransactionSummary() + "</li>";
        }
    }
    // Shows all the transactions that are classified under as income!
    ShowIncomeTransactions() {
        let TotalIncome = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].type === "income") {
                TotalIncome += this.transactions[i].amount;
            }
        }
        return TotalIncome;
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
}
// Transaction list to be generated from the incomes and expenses.
function generateTransactionList(theBudget) {
    let transactionListUl = document.getElementById('transactionList');
    theBudget.ShowTransactions(transactionListUl); // this is working 
    transactionListUl.innerHTML += "<li><strong>Total Income:</strong> " + theBudget.ShowIncomeTransactions() + "</li>";
    transactionListUl.innerHTML += "<li><strong>Total Expenses:</strong> " + theBudget.ShowExpensesTransactions() + "</li>";
    transactionListUl.innerHTML += "<li><strong>Balance:</strong> " + theBudget.showBalance() + "</li>";
} // transactions created to showcase the example
let theBudget = new BudgetTracker();
let transaction1 = new Transaction(20000, "salary", "income", "2025-01-21");
let transaction2 = new Transaction(2000, "tax return", "income", "2025-04-25");
let transaction3 = new Transaction(2000, "New Computer", "expense", "2024-02-14");
// printing the transactions that were created.
theBudget.addTransaction(transaction1);
theBudget.addTransaction(transaction2);
theBudget.addTransaction(transaction3);
generateTransactionList(theBudget);