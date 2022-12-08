import React, { useState, useEffect } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const Register = () => {

    const [registerValues, setRegisterValues] = useState(
        {
            'full_name': '',
            "username": "",
            "referral_id": "",
            "email_id": "",
            "country_row_id": "",
            "mobile_number": "",
            "password": ""
        }
    )

    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        console.log({ ...registerValues, [e.target.name]: e.target.value })
        setRegisterValues({ ...registerValues, [e.target.name]: e.target.value })
    }

    const validate = (values) => {
        const errors = {}
        const passRegex = new RegExp('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$');
        const mobRegex = new RegExp('^[789]\d{9}$')
        const EmailRegex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')

        if (!values.full_name) {
            errors.full_name = "can't be empty"
        } 
        if (!values.username) {
            errors.username = "Please provide user name"
        } 

        if (!values.country_row_id) {
            errors.country_row_id = "can't be empty"
        }

        if (!values.mobile_number) {
            errors.mobile_number = "Number can't be empty"
        } 
        if (!values.email_id) {
            errors.email_id = 'email required'
        } 

        if (!values.password) {
            errors.password = 'password required'
        } 

        return errors
    }

    const handleRegister = (e) => {
        e.preventDefault()
        setFormErrors(validate(registerValues))
        setIsSubmit(true)
        // axios.post()
    }

    const password_criteria = <div style={{ display: 'text', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '10px' }}>
        <p >* Must contain 8 characters</p>
        <p >* Atleast 1 letter and 1 number</p>
        <p >* Atleast 1 special character</p></div>

    return (
        <div className='registerContainer'>
            <Helmet>
                <title>Dashboard | Register</title>
            </Helmet>
            <div>
                <p style={{ fontSize: '1.5rem' }}>Register</p>
                <p style={{ fontSize: '0.8rem' }}>Create your company's account</p>
            </div>

            <form action="" className='registerForm' autoComplete="off">
                <input type="text" name="full_name" id="" placeholder='Full name *' value={registerValues.full_name} onChange={(e) => handleChange(e)} />
                <p>{formErrors.full_name}</p>
                <input type="text" name="username" id="" placeholder='User name *' value={registerValues.username} onChange={(e) => handleChange(e)} />
                <p>{formErrors.username}</p>
                <input type="text" name="country_row_id" id="" placeholder='Select country *' value={registerValues.country_row_id} onChange={(e) => handleChange(e)} />
                <p>{formErrors.country_row_id}</p>
                <input type="text" name="mobile_number" id="" placeholder='Mobile Number *' value={registerValues.mobile_number} onChange={(e) => handleChange(e)} />
                <p>{formErrors.mobile_number}</p>
                <input type="email" name="email_id" id="" placeholder='Email ID *' value={registerValues.email_id} onChange={(e) => handleChange(e)} />
                <p>{formErrors.email_id}</p>
                <input type="password" name="password" id="" placeholder='Password *' value={registerValues.password} onChange={(e) => handleChange(e)} />
                <p>{formErrors.password}</p>
                <input type="text" name="referral_id" id="" placeholder='Referral ID' value={registerValues.referral_id} onChange={(e) => handleChange(e)} />

                <button onClick={(e) => handleRegister(e)}>Register</button>
                <Link to='/'>Back to login</Link>
            </form>

        </div>
    )
}

export default Register


