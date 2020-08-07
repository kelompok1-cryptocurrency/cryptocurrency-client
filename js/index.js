const SERVER_PATH = `http://localhost:3000`





$(document).ready(function () {

    if (!localStorage.getItem('access_token')) {

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
    motivationCalendarGenerator()
    ratesGenerator()

    $("#submit-converter").on("click",(event)=>{
        event.preventDefault()
        ratesConverter($("#content-rates-converter").val(),$("#value-converter").val())
    })
})

$('#form-register').submit(function (event) {
    event.preventDefault()
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
})

$('#form-login').submit(function (event) {
    event.preventDefault()
    let emailLogin = $('#email').val()
    let passwordLogin = $('#password').val()
    // console.log(emailLogin,passwordLogin)
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
            localStorage.setItem('access_token', response.access_token);
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
    event.preventDefault()
    localStorage.removeItem('access_token')
    googleSignOut()

    $('#email').val('')
    $('#password').val('')
    $('#loginForm').show()
    $('#registerForm').hide()

    $('#logoutNav').hide()
    $('#content').hide()

})

function motivationCalendarGenerator() {
    $.ajax({
        method:"GET",
        url:`${SERVER_PATH}/home/text`
    })
    .done(result=>{
        
        $("#jumbo-motivation").text(`${result.motivationQuote}`)
        $("#jumbo-holiday").text(`${result.holidayDate[0].name}, on ${result.holidayDate[0].week_day} ${result.holidayDate[0].date}`)
        })
    .fail(xhr=>console.log(xhr))
    .always(_=>{

    })
    
}

function ratesGenerator() {
    console.log("here")
    $.ajax({
        method:"GET",
        url:`${SERVER_PATH}/home/rates`
    })
    .done(result=>{
        let arr = ["BTC","ETH","XRP","USDT","BCH","ADA","LTC","BNB","EOS","XTZ","XLM","XMR","TRX","NEO","ASAFE2"]
        arr.forEach(curr=>{
            $("#content-rates").append(`
        <h5>${curr}  : ${result.rates[curr]}</h5>
        `)
            $("#content-rates-converter").append(`
            <option value="${curr}">${curr}</option>
        `)

        })
        })
    .fail(xhr=>console.log(xhr))
    .always(_=>{}) //$("#content-rates").empty()
}

function ratesConverter(curr,val) {
    console.log("here")
    $.ajax({
        method:"GET",
        url:`${SERVER_PATH}/home/rates`
    })
    .done(result=>{
        console.log(result.rates[curr])
        $("#result-converter").text(`
        ${val} USD is ${val/Number(result.rates[curr])} ${curr}
        `)
        })
    .fail(xhr=>console.log(xhr))
    .always(_=>{})
}


// function onSignIn(googleUser) {

//     const google_access_token = googleUser.getAuthResponse().id_token;

//     $.ajax({
//         url: `${SERVER_PATH}/login/google`,
//         method: `POST`,
//         headers: {
//             google_token
//         }
//     })
//         .done(response => {

//             logInDisplay()
//             console.log(response);
//             localStorage.setItem('token', response.token);

//         })
//         .fail(response => {
//             console.log(response);
//             localStorage.setItem('token', response.token)
//         })
//         .always(response => {
//             console.log(response);
//         })
//     event.preventDefault()
// }


// function googleSignOut() {
//     const auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         console.log('User signed out.');
//     });
// }

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