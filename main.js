document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('http://localhost:3000/', {
        method: 'GET',
    });
    console.log(await response.text())
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    message.textContent = data.message;
});

