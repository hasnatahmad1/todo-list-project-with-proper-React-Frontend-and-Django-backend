import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import './LoginPage.css'
import { useState } from 'react';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateToHomePage = useNavigate();

    const toggleEmailText = (event) => {
        setEmail(event.target.value);
    };

    const togglePasswordText = (event) => {
        setPassword(event.target.value);
    };

    const toggleLoginButton = async () => {
        try {
            const response = await axios.post('https://yousef-frizzliest-myah.ngrok-free.dev/token/', {
                email: email,
                password: password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'ngrok-skip-browser-warning': 'True',
                }
            });
            if (response.data.access) {
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                localStorage.setItem("user_email", JSON.stringify(email));
                console.log(localStorage.getItem("user_email"));

                alert("Login Successful ✅");
                console.log("access_token:", response.data.access);
                navigateToHomePage('/home');
            } else {
                alert("Invalid credentials ❌");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed ❌");
        }
    }


    return (
        <>
            <title>Login Page</title>


            <h2>Log In</h2>
            <p>Email</p>
            <input
                className="js-email"
                type="email"
                onChange={toggleEmailText}
            />

            <p>Password</p>
            <input
                className="js-password"
                type="text"
                onChange={togglePasswordText}
            /><br /><br />

            <button
                className="js-login-button"
                onClick={toggleLoginButton}
            >
                Login
            </button>

            <p>Don&apos;t have an account <Link to="/register">Create Account</Link></p>
        </>
    );
}