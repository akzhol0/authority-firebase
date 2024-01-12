import React, { useState } from 'react';
import '../styles/register-page.css'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {database} from '../../components/config/firebase'

const RegisterPage = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [passwordVisibility, setPasswordVisibility] = useState<Boolean>(false);
    const navigate = useNavigate()

    function signUpButton() {
        if (name.length  === 0 || email.length  === 0 || password1.length  === 0 || password2.length  === 0) {
            setError('Inputs are empty')
        } else if (password1 !== password2) {
            setError('Your passwords should match')
        } else {
            localStorage.setItem('userName', name);
            register();
        }
    }

    function register() {
        createUserWithEmailAndPassword(database, email, password1)
        .then((response) => {
            console.log(response)
            navigate('/login')
        }).catch((error) => {
            if (error.code.includes('auth/email-already-in-use')) {
                setError('This email already in use');
            } else if (error.code.includes('auth/auth/weak-password')) {
                setError('Your password is weak, at least 6 characters')
            } else if (error.code.includes('auth/invalid-email')) {
                setError('Something is wrong with your e-mail')
            } else { 
                setError('Error');
            }
        })
    }

    return (
        <div className="wrapper-login-all">
            <div className="wrapper-login">
            <div className="text-wrapper">
                <strong>Sign Up</strong>
            </div>
            <div className="inp-wrapper">
                <div className="inp-container inp-login-container">
                    <strong>Name</strong>
                    <input 
                    onChange={(e) => setName(e.target.value)}
                    value={name} 
                    type='text' 
                    placeholder='Enter your name'/>
                </div>
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
                    onChange={(e) => setPassword1(e.target.value)}
                    value={password1} 
                    type={passwordVisibility ? 'type' : 'password'} 
                    placeholder='Enter your password'/>
                </div>
                <div onClick={() => setPasswordVisibility(passwordVisibility ? false : true)} className="img-vis img-password-visibility1"></div>
                <div className="inp-container inp-password-container">
                    <strong>Repeat Password</strong>
                    <input 
                    onChange={(e) => setPassword2(e.target.value)}
                    value={password2} 
                    type={passwordVisibility ? 'type' : 'password'} 
                    placeholder='Repeat your password'/>
                </div>
                <div onClick={() => setPasswordVisibility(passwordVisibility ? false : true)} className=" img-vis img-password-visibility2"></div>
            </div>
            <button onClick={signUpButton} className="signin-wrapper">Sign Up Now</button>
            {error.length ? <div className="error-wrapper">{error}</div> : ''}
            <p className='last-text'>You have an account?  <Link to='/login'><p>Sign In</p></Link> </p>
        </div>
        </div>
    );
};

export default RegisterPage;