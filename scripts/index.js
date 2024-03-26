const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let user = document.getElementById('user').value;
    let password = document.getElementById('password').value;

    if (user === 'admin' && password === 'root') {
        window.location.href = './menuPrincipal/menuPrincipal.html';
        window.history.replaceState(null, null, window.location.href);
    } else {
        alert('Nombre de usuario o contrasena incorrectos');
    }

});

window.addEventListener('load', function () {
    window.history.pushState(null, null, window.location.href);

    window.onpopstate = function () {
        window.history.go(1);
    };
});

window.onload = function(){
    let user = document.getElementById('user');
    user.focus();
}