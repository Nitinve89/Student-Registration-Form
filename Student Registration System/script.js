document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.querySelector('#recordsTable tbody');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Populate table from localStorage
    Object.keys(cart).forEach(id => {
        addRowToTable(id, cart[id]);
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const studentId = document.getElementById('studentId').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        if (!name || !studentId || !email || !contact) return; // Validation check

        const student = { name, studentId, email, contact };
        cart[studentId] = student;
        localStorage.setItem('cart', JSON.stringify(cart));

        addRowToTable(studentId, student);
        form.reset();
    });

    function addRowToTable(id, student) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td><button onclick="deleteRecord('${id}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
    }

    window.deleteRecord = function(id) {
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
        tableBody.innerHTML = '';
        Object.keys(cart).forEach(id => addRowToTable(id, cart[id]));
    };
});