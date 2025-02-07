let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

function addExpenseToTable(expense, index) {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2); 
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount.toFixed(2);
        renderExpenses();
    });

    deleteCell.appendChild(deleteBtn);
}

function renderExpenses() {
    expensesTableBody.innerHTML = "";
    totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalAmountCell.textContent = totalAmount.toFixed(2);

    expenses.forEach((expense, index) => {
        addExpenseToTable(expense, index);
    });
}

addBtn.addEventListener("click", function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === "") {
        alert("Please select a category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    if (date === "") {
        alert("Please select a date");
        return;
    }

    const newExpense = { category, amount, date };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    addExpenseToTable(newExpense, expenses.length - 1);

    amountInput.value = "";
    dateInput.value = "";
});

renderExpenses();
