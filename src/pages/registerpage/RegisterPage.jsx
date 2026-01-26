import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import './RegisterPage.css'
import { useState } from 'react';

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigateToLogin = useNavigate();

    const getEmail = (event) => {
        setEmail(event.target.value);
    }

    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    const getConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    // console.log(email, password, confirmPassword);

    const toggleRegisterButton = async () => {
        const response = await axios.post('https://yousef-frizzliest-myah.ngrok-free.dev/register/', {
            email: email,
            password: password,
            password2: confirmPassword
        }, {
            headers: {
                "Content-Type": "application/json",
                'ngrok-skip-browser-warning': 'True',
            }
        });
        alert("Registration Successful ✅");
        console.log(response.data);
        navigateToLogin('/');
    };



    return (
        <>
            <title>Register Page</title>

            <h2>
                Sign Up
            </h2>
            <p>Email:</p>
            <input
                className="js-email"
                onChange={getEmail}
                type="Email"
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

            <p>Password:</p>
            <input
                className="js-password"
                onChange={getPassword}
                type="password"
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

            <p>Confirm Password:</p>
            <input
                className="js-confirm-password"
                onChange={getConfirmPassword}
                type="password"
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
                className="js-register-button"
                onClick={toggleRegisterButton}

            >
                Register
            </button>

            <p>Already have an account <Link to="/">Login</Link></p>
        </>
    );
}