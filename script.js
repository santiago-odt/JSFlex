let date = new Date()
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
let currentMonth = months[date.getMonth()]
let currentYear = date.getFullYear()
let expensesArray = []

const header = document.getElementById("header")
let newExpenseButton = document.getElementById("add")
const newExpenseDiv = document.getElementById("new-expense")
const expensesTable = document.getElementById("table")

document.addEventListener("DOMContentLoaded", () => {
    header.innerHTML = `Gastos para el mes de ${currentMonth} ${currentYear}`
    if(localStorage.getItem("expenses")){
        expensesArray = JSON.parse(localStorage.getItem("expenses"))
        for(expense of expensesArray){
            showExpense(expense.tipo, expense.monto, expense.fecha)
        }
    }
    calcularYMostrarTotal()
})

newExpenseButton.addEventListener("click", () => {
    newExpenseDiv.innerHTML = `<div>
    <label for="type">Tipo de gasto:</label>
    <select name="type" id="type">
        <option value="luz">Recibo de luz</option>
        <option value="agua">Recibo de Agua</option>
        <option value="internet">Recibo de Internet</option>
        <option value="celular">Recibo de Celular</option>
        <option value="compras">Compras</option>
        <option value="comida">Comida</option>
        <option value="alquiler">Alquiler</option>
        <option value="otro">Otro</option>
    </select>
    <input placeholder="Ingrese el tipo de gasto" style="display : none" id="other-type"></input>
    </div>

    <label for="amount">Monto:</label>
    <input type="number" name="amount" id="amount"></input>
 
    <label for="date">Fecha:</label>
    <input type="date" name="date" id="date"></input>

    <button id="confirm">Confirmar</button>`

    const typeDropdown = document.getElementById("type")
    const moneyAmount = document.getElementById("amount")
    const transactionDate = document.getElementById("date")
    const customType = document.getElementById("other-type")
    const confirmButton = document.getElementById("confirm")

    typeDropdown.addEventListener("change", () => {
        if (typeDropdown.value == "otro") {
            customType.style.display = "flex"
        } else if (customType) {
            customType.style.display = "none"
        }

    })

    confirmButton.addEventListener("click", () => {
        let expenseAmount = parseInt(moneyAmount.value)
        let expenseDate = transactionDate.value
        let expenseType
        if (typeDropdown.value == "otro") {
            expenseType = customType.value
        } else {
            expenseType = typeDropdown.options[typeDropdown.selectedIndex].text
        }

        if (expenseAmount) {
            if(expenseDate){
            createExpense(expenseType, expenseAmount, expenseDate)
            showExpense(expenseType, expenseAmount, expenseDate)
            newExpenseButton = document.getElementById("add")
            localStorage.setItem("expenses", JSON.stringify(expensesArray))
            }else{
                alert("Debe ingresar una fecha completa")
            }
            calcularYMostrarTotal()
        } else {
            alert("Debe ingresar un número en el monto")
        }
        

    })



})
 
 

function createExpense(type, amount, date) {
    let expense = {}
    expense.tipo = type
    expense.monto = amount
    expense.fecha = date
    expensesArray.push(expense)
}

function showExpense(type, amount, date) {
    expensesTable.innerHTML += `<tr>
    <td>${type}</td>
    <td>$ ${amount}</td>
    <td>${date}</td>
    </tr>
    `
}

function calcularYMostrarTotal(){
    let sumaTotal = 0
    for(expense of expensesArray){
        sumaTotal += expense.monto
    }
    document.getElementById("total").innerHTML = sumaTotal
}