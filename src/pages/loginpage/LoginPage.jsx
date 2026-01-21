import { Link } from 'react-router';
import './LoginPage.css'

export function LoginPage() {
    return (
        <>
            <title>Login Page</title>

            <p>
                <h2>Log In</h2>
            </p>
            <p>Email</p>
            <input className="js-email" type="email" />

            <p>Password</p>
            <input className="js-password" type="text" /><br /><br />

            <button className="js-login-button">
                Login
            </button>

            <p>Dont have an account <Link to="/register">Create Account</Link></p>
        </>
    );
}