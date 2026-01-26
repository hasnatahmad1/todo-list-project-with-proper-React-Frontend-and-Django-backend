import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import './LoginPage.css'
import { useState } from 'react';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const navigateToHomePage = useNavigate();

    const toggleEmailText = (event) => {
        setEmail(event.target.value);
    };

    const togglePasswordText = (event) => {
        setPassword(event.target.value);
    };

    const toggleLoginButton = async () => {
        setIsLoading(true); // Start loading
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
        } finally {
            setIsLoading(false); // Stop loading
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
                disabled={isLoading}
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    margin: '8px 0',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'all .3s ease'
                }}
            />

            <p>Password</p>
            <input
                className="js-password"
                type="password"
                onChange={togglePasswordText}
                disabled={isLoading}
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    margin: '8px 0',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'all .3s ease'
                }}
            /><br /><br />

            <button
                className="js-login-button"
                onClick={toggleLoginButton}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span className="spinner"></span>
                        <span>Logging in...</span>
                    </>
                ) : (
                    'Login'
                )}
            </button>

            <p>Don&apos;t have an account <Link to="/register">Create Account</Link></p>
        </>
    );
}