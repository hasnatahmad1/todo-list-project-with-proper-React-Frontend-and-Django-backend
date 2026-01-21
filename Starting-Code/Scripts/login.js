document.querySelector('.js-login-button').addEventListener('click', () => {
    const email = document.querySelector('.js-email').value;
    const password = document.querySelector('.js-password').value;

    // console.log(email, password);

    loginUser(email, password);
});


function loginUser(email, password) {
    // console.log(email, password);

    fetch('http://127.0.0.1:8000/token/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((Response) => {
        return Response.json();
    }).then((data) => {
        if (data.access) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem("user_email", JSON.stringify(email));
            console.log(localStorage.getItem("user_email"));


            alert("Login Successful ✅");
            console.log("access_token:", data.access);

            window.location.href = "todohome.html"
        } else {
            alert("Invalid credentials ❌");
        }
    });
}