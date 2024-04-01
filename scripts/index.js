const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            const token = data.token;
            localStorage.setItem('token', token);
            window.location.href = './menuPrincipal/menuPrincipal.html';
            window.history.replaceState(null, null, window.location.href);
        } else {
            alert(data.msg || 'Error en la autenticación');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error en la solicitud');
    }
});


window.addEventListener('load', function () {
    window.history.pushState(null, null, window.location.href);

    window.onpopstate = function () {
        window.history.go(1);
    };
});

window.onload = function () {
    let correo = document.getElementById('email');
    correo.focus();
}