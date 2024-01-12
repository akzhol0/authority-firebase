import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/login-page.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { database } from '../config/firebase';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState<Boolean>(false);

    function SignInButton() {
        if (email.length === 0 || password.length === 0) {
            setError('Inputs are empty')
        } else {
            login()
        }
    } 

    function login() {
        signInWithEmailAndPassword(database, email, password)
        .then((response) => {
            console.log(response)
            navigate('/main-page')
            
            const userName = localStorage.getItem('userName')
            const user = {
                userName: userName,
                rememberPassword: true,
            }
            const userStringifyed = JSON.stringify(user);
            localStorage.setItem('User', userStringifyed)
        }).catch((error) => {
            if (error.code.includes('auth/invalid-email')) {
                setError('Something is wrong with your email')
            } else if (error.code.includes('auth/invalid-credential')) {
                setError('Wrong email or password')
            }
        })
    }

    return (
        <div className="wrapper-login-all">
            <div className="wrapper-login">
            <div className="text-wrapper">
                <strong>Sign in</strong>
            </div>
            <div className="inp-wrapper">
                <div className="inp-container inp-login-container">
                    <strong>E-mail</strong>
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                    type='email' 
                    placeholder='Enter your e-mail'/>
                </div>
                <div className="inp-container inp-password-container">
                    <strong>Password</strong>
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} 
                    type={passwordVisibility ? 'type' : 'password'} 
                    placeholder='Enter your password'/>
                    <div onClick={() => setPasswordVisibility(passwordVisibility ? false : true)} className="img-password-visibility"></div>
                </div>
            </div>
            <div className="help-customer">
                <div className="remember-password">
                    <input type="checkbox" />
                    <p>Remember password</p>
                </div>
                <div className="forgot-password">
                    <p>Forgot password?</p>
                </div>
            </div>
            <button onClick={SignInButton} className="signin-wrapper">Sign In Now</button>
            {error.length ? <div className="error-wrapper">{error}</div> : ''}
            <p className='last-text'>You don't have an account?  <Link to='/register'><p>Sign Up</p></Link> </p>
        </div>
        </div>
    );
};

export default LoginPage;