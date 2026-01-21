//password2 is for confirm password

document.querySelector('.js-register-button').addEventListener('click', () => {
    const email = document.querySelector('.js-email').value;
    const password = document.querySelector('.js-password').value;
    const password2 = document.querySelector('.js-confirm-password').value;

    registerUser(email, password, password2);
});


function registerUser(email, password, password2) {
    // console.log(email, password, password2);

    fetch('http://127.0.0.1:8000/register/', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            password2
        })
    }).then((Response) => {
        return Response.json();
    }).then((data) => {
        alert("Registration Successful ✅")
        console.log(data);

        // redirect to login page
        window.location.href = "login.html"; // <-- ye line add ki
    });
}