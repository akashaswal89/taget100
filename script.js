// Auto-generate 5% increment data starting from 100 to 30,000
const balanceData = [];

let amount = 100;  
let day = 1;

while (amount <= 32000) {
    balanceData.push({
        day: day,
        amount: parseFloat(amount.toFixed(2))
    });

    amount = amount * 1.05; // 5% increment
    day++;
}

let totalBalance = 0;
const completedDays = [];

// Populate table
function populateTable() {
    const tableBody = document.getElementById('balanceTable');

    balanceData.forEach((entry, index) => {

        // Base amount ka 2% aur decimal hatao
        const base = Math.floor(entry.amount * 0.02); 

        // Tumhara formula: decimal remove karne ke liye Math.floor()
        const second = Math.floor(base * 2);       // 2x
        const third  = Math.floor(base * 2.5);     // 2.5x
        const total  = base + second + third;      // x + 2x + 2.5x

        const labelText = `${base} + ${second} + ${third} = ₹${total}`;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.day}</td>
            <td>₹${entry.amount.toFixed(2)}</td>
            <td>${labelText}</td>
        `;
        
        if (completedDays.includes(index)) {
            row.classList.add('success');
        }

        row.addEventListener('click', () => updateBalance(index, row));
        tableBody.appendChild(row);
    });

    document.getElementById('balance').innerText = `Balance: ₹0.00`;
}

// Update balance on row click
function updateBalance(index, row) {
    if (!row.classList.contains('success')) {
        const clickedAmount = balanceData[index].amount;
        document.getElementById('balance').innerText = `Balance: ₹${clickedAmount.toFixed(2)}`;
        row.classList.add('success');
    } else {
        document.getElementById('balance').innerText = `Balance: ₹0.00`;
        row.classList.remove('success');
    }
}

document.addEventListener('DOMContentLoaded', populateTable);
