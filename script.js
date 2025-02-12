document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username_input').value;
    const password = document.getElementById('password_input').value;
    
    const data = { username, password} ;

    try {
        const response = await fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(response.ok) {
            alert(`Login Succes!`);

            localStorage.setItem('token', result.token);
            localStorage.setItem('username', username);

            window.location.href ='dashboard.html';
        } else {
            alert(`Login failed : ${result.error}`);
        }
    }  catch (error) {
        alert("Server Error");
    }

});



