import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import './RegisterPage.css'
import { useState } from 'react';

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

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

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const toggleRegisterButton = async () => {
        // Check if all fields are empty
        if ((email === '') && (password === '') && (confirmPassword === '')) {
            alert('All the fields are empty. Please Fill the Registration Form');
            return
        }
        // Check if email is empty
        else if (email === '') {
            alert('Email field is empty.');
            return
        }
        // Validate email format
        else if (!isValidEmail(email)) {
            alert('Please enter a valid email address (e.g., example@email.com)');
            return
        }
        // Check if password is empty
        else if (password === '') {
            alert('Password field is empty.');
            return
        }
        // Check if password meets minimum requirements (optional)
        else if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return
        }
        // Check if confirm password is empty
        else if (confirmPassword === '') {
            alert('Confirm Password field is empty.');
            return
        }
        // Check if passwords match
        else if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match.');
            return;
        }
        // If all validations pass, send request to backend
        else {
            setIsLoading(true); // Start loading
            try {
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
            } catch (error) {
                // Handle any errors from the backend
                if (error.response) {
                    alert(`Registration failed: ${error.response.data.message || 'Please try again'}`);
                } else {
                    alert('Network error. Please check your connection and try again.');
                }
                console.error('Registration error:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        }
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
                type="email"
                placeholder="example@email.com"
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

            <p>Password:</p>
            <input
                className="js-password"
                onChange={getPassword}
                type="password"
                placeholder="At least 6 characters"
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

            <p>Confirm Password:</p>
            <input
                className="js-confirm-password"
                onChange={getConfirmPassword}
                type="password"
                placeholder="Re-enter your password"
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
                className="js-register-button"
                onClick={toggleRegisterButton}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span className="spinner"></span>
                        <span>Registering...</span>
                    </>
                ) : (
                    'Register'
                )}
            </button>

            <p>Already have an account <Link to="/">Login</Link></p>
        </>
    );
}