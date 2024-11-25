// const dashboard = document.querySelector("#dashboard");
// const loginFormClass = document.querySelector(".login-form")

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('http://localhost:3000/', {
        method: 'GET',
        credentials: "include", 
    });
    const data = await response.json();
    console.log(data)
    if (data.loggedIn) {
        loginFormContainer.remove();
        // display the dashboard
    } else {
        loginFormContainer.style.display = "block";
    }

});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: "include", 
    });

    const data = await response.json();

    console.log(await data)
    // message.textContent = data.message;
});


