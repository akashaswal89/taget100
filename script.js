// Auto-generate 5% increment data starting from 100 to 30,000
const balanceData = [];

let amount = 100;
let day = 1;

while (amount <= 30000) {
    balanceData.push({
        day: day,
        amount: Math.floor(amount)
    });

    amount *= 1.05;
    day++;
}

const completedDays = [];

// Populate table
function populateTable() {
    const tableBody = document.getElementById("balanceTable");

    balanceData.forEach((entry, index) => {

        // 2%, 4%, 5% (integer only)
        const p2 = Math.floor(entry.amount * 0.02);
        const p4 = Math.floor(entry.amount * 0.04);
        const p5 = Math.floor(entry.amount * 0.05);

        // doubling chain
        const p10 = p5 * 2;
        const p20 = p10 * 2;
        const p40 = p20 * 2;

        const terms = [p2, p4, p5, p10, p20, p40];

        const total = terms.reduce((sum, val) => sum + val, 0);

        const labelText = `${terms.join(" + ")} = ₹${total}`;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.day}</td>
            <td>₹${entry.amount}</td>
            <td>${labelText}</td>
        `;

        row.addEventListener("click", () => updateBalance(entry.amount, row));

        tableBody.appendChild(row);
    });

    document.getElementById("balance").innerHTML =
        'Balance: <span style="color:green;">₹0</span>';
}

// Update balance on click
function updateBalance(amount, row) {

    const balanceElement = document.getElementById("balance");

    if (!row.classList.contains("success")) {

        balanceElement.innerHTML =
            `Balance: <span style="color:green;">₹${amount}</span>`;

        row.classList.add("success");

    } else {

        balanceElement.innerHTML =
            'Balance: <span style="color:green;">₹0</span>';

        row.classList.remove("success");
    }
}

document.addEventListener("DOMContentLoaded", populateTable);
