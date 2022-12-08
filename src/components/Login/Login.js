import React, { useState, useEffect } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet';

const Login = () => {

    const [loginValues, setLoginValues] = useState({
        'user_id': '',
        'password': ''
    })

    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    //handle input box
    const handleChange = (e) => {
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
    }

    const validate = (values) => {
        const errors = {}
        const EmailRegex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
        if (!values.user_id) {
            errors.user_id = 'user name or email required'
        }else if (!EmailRegex.test(values.mobile_number)) {
            errors.email_id = "Invalid email format"
        }

        if (!values.password) {
            errors.password = 'password cannot be empty'
        }

        return errors
    }

    //variable for password error div
    const password_criteria = <div style={{ display: 'text', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '10px' }}>
        <p >* Must contain 8 characters</p>
        <p >* Atleast 1 letter and 1 number</p>
        <p >* Atleast 1 special character</p></div>


    //handling Login form on submit button
    const handleLogin = (e) => {
        e.preventDefault()
        setFormErrors(validate(loginValues))
        setIsSubmit(true)

        const data={'login_id':loginValues.user_id,'password':loginValues.password}
        const API_DATA= JSON.stringify(data)
        console.log(API_DATA);

        axios.post('https://react-tasks-nodejs-api.herokuapp.com/user/login',API_DATA,{ headers: { api_key: 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH' } })
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err);
        })

    }


    return (
        <div className='loginContainer'>
            <Helmet>
                <title>Dashboard | Login </title>
            </Helmet>
            <div>
                <p style={{ fontSize: '1.5rem' }}>Login</p>
                <p style={{ fontSize: '0.8rem' }}>Enter your account login details</p>
            </div>

            <form action="" className='loginForm' autoComplete="off">
                <input type="text" name="user_id" id="" placeholder='User name or Email' value={loginValues.user_id} onChange={(e) => handleChange(e)} />
                <p>{formErrors.user_id}</p>
                <input id='password_input' type="password" name="password" placeholder='Password' value={loginValues.password} onChange={(e) => handleChange(e)} />
                <p>{formErrors.password}</p>
                <button onClick={(e) => handleLogin(e)}>Sign in</button>
                <Link to='/register'>Register</Link>
            </form>

        </div>
    )
}

export default Login


