import { Link } from 'react-router';
import './RegisterPage.css'

export function RegisterPage() {
    return (
        <>
            <title>Register Page</title>

            <p>
                <h2>Sign Up</h2>
            </p>
            <p>Email:</p>
            <input className="js-email" type="Email" />

            <p>Password:</p>
            <input className="js-password" type="text" />

            <p>Confirm Password:</p>
            <input className="js-confirm-password" type="text" /><br /><br />

            <button className="js-register-button">
                Register
            </button>

            <p>Already have an account <Link to="/">Login</Link></p>
        </>
    );
}