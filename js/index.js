const SERVER_PATH = `http://localhost:3000`

$(document).ready(function () {

    if (!localStorage.getItem('token')) {

        $('#loginForm').show()
        $('#registerNav').show()
        $('#registerForm').hide()
        $('#loginNav').hide()
        $('#logoutNav').hide()
        $('#content').hide()

    } else {
        $('#loginForm').hide()
        $('#registerForm').hide()
        $(`#loginNav`).hide()
        $(`#registerNav`).hide()

    }
})

$('#form-register').submit(function (event) {
    let emailRegister = $('#emailRegis').val()
    let passwordRegister = $('#passwordRegis').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER_PATH}/register`,
        data: {
            email: emailRegister,
            password: passwordRegister
        }
    })
        .done(response => {
            console.log(response);
            $('#loginForm').show()
            $('#registerForm').hide()
        })
        .fail(response => {
            
        })
        .always(response => {
            console.log('ini always');
        })
    event.preventDefault()
})

$('#form-login').submit(function (event) {
    let emailLogin = $('#email').val()
    let passwordLogin = $('#password').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER_PATH}/login`,
        data: {
            email: emailLogin,
            password: passwordLogin
        }
    })
        .done((response) => {
            console.log(response);
            localStorage.setItem('token', response.token);
            logInDisplay()

            $('#loginNav').hide()
            $('#loginForm').hide()
            $('#registerNav').hide()
            $('#registerForm').hide()

            $('#logoutNav').show()
            $('#content').show()

        })
        .fail((response) => {

        })
        .always((response) => {
            console.log(`ini always`);
        })
    event.preventDefault()
})

$('#logoutNav').click(function (event) {
    localStorage.removeItem('token')

    $('#email').val('')
    $('#password').val('')
    $('#loginForm').show()
    $('#registerForm').hide()

    $('#logoutNav').hide()
    $('#content').hide()

    event.preventDefault()
})