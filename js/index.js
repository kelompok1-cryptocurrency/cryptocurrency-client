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

$('#registerNav').click(function (event) {

    $('#registerForm').show()
    $('#loginNav').show()
    $('#loginForm').hide()
    $('#registerNav').hide()
})

$('#loginNav').click(function (event) {


    $('#loginForm').show()
    $('#registerNav').show()
    $('#loginNav').hide()
    $('#registerForm').hide()

})

$('#logoutNav').click(function (event) {
    localStorage.removeItem('token')
    googleSignOut()

    $('#email').val('')
    $('#password').val('')
    $('#loginForm').show()
    $('#registerForm').hide()

    $('#logoutNav').hide()
    $('#content').hide()

    event.preventDefault()
})

function onSignIn(googleUser) {

    const google_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: `${SERVER_PATH}/login/google`,
        method: `POST`,
        headers: {
            google_token
        }
    })
        .done(response => {

            logInDisplay()
            console.log(response);
            localStorage.setItem('token', response.token);

        })
        .fail(response => {
            console.log(response);
            localStorage.setItem('token', response.token)
        })
        .always(response => {
            console.log(response);
        })
    event.preventDefault()
}


function googleSignOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function logInDisplay() {

    $('#content').show()
    $('#logoutNav').show()
    $('#loginForm').hide()
    $('#registerNav').hide()
    $('#registerForm').hide()
    $('#loginNav').hide()

}





// ngecek apakah kita sudah dapat ngambil data dari google sign in
// function login dari google sign in
function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;
  // console.log(id_token)
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/google-login',
    headers: {
      'g_token':id_token
    }
  }).done(response => {
    // console.log(response,'ini dari done ajax')
    // console.log(response.access_token,'<<<<<<<<<<<<<')
    localStorage.setItem('access_token',response.access_token)
  }).fail(xhr => {
    console.log(xhr)
  })

}

// function logOut dari google sign in
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}