import React, { Component, useState, useEffect } from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import Homepage from './Homepage'
import Container from 'react-bootstrap/Container'

const Login = (props) => {
    const {email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError} = props
    return (
    
        <section className = "login">
        <div className="loginContainer" >

<h1>Friendzone</h1>


<div className = 'inputContainer'>
<input placeholder = 'email/username' type ="text" autoFocus required value = {email} onChange={(e) => setEmail(e.target.value)}/>
<p className ="errorMsg">{emailError}</p>

<input placeholder = 'password' type ="password" required value = {password} onChange={(e) => setPassword(e.target.value)} />
<p className = "errorMsg">{passwordError}</p>
</div>

<div className="btnContainer">

    {!hasAccount ? (
        <div>
        <Link to = '/'><button type = "submit" onClick = {handleLogin}>Sign in</button></Link>
        <p>Don't have an account? <span onClick ={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
        </div>
    ):( 
        <div>
        <button type = "submit" onClick={handleSignup}>Sign Up</button>
        <p>have an account? <span onClick = {() => setHasAccount(!hasAccount)}>Sign In</span></p>
        </div>
    )}
    
</div>
</div>
</section>



    

    )
}


export default Login