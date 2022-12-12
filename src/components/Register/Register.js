
import React from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'

const validate = values => {
    const errors = {};

    if (!values.full_name) {
        errors.full_name = 'Fullname is required';
    }else if(!/^[a-zA-Z]{4,}$/i.test(values.full_name)){
        errors.full_name = 'Cannot be less than 4 characters';
    }
    if (!values.username) {
        errors.username = 'Username is required';
    }
    if (!values.country_row_id) {
        errors.country_row_id = 'Country is required';
    }
    if (!values.mobile_number) {
        errors.mobile_number = 'Mobile number is required';
    }else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(values.mobile_number)) {
        errors.mobile_number = 'Invalid Mobile number';
    }
    if (!values.email_id) {
        errors.email_id = 'email id is required';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_id)) {
        errors.email_id = 'Invalid Email';
    }
    if (!values.password) {
        errors.password = 'Password cannot be empty'
    }else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,25}$/i.test(values.password)) {
        errors.password = 'Password must meet minimum criteria';
    }

    return errors;
};

const Register = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            'full_name': "",
            "username": "",
            "referral_id": "",
            "email_id": "",
            "country_row_id": "",
            "mobile_number": "",
            "password": ""
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    })

    //handling form submission
    const handleRegister = (e) => {
        e.preventDefault()
        const data = {
            'full_name': formik.values.full_name,
            "username": formik.values.username,
            "referral_id": formik.values.referral_id,
            "email_id": formik.values.email_id,
            "country_row_id": formik.values.country_row_id,
            "mobile_number": formik.values.mobile_number,
            "password": formik.values.password
        }
        axios.post('https://lobster-app-ddwng.ondigitalocean.app/user/register', data, { headers: { api_key: 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH' } })
            .then(res => {
                console.log('register res', res)

                if (res.status == 200) {
                    console.log('res', res)
                    // localStorage.setItem('token',res.data.message.token)
                    if (res.data.status == true) {
                        navigate("/dashboard", {
                            state: {
                                'full_name': res.data.message.full_name,
                                'user_name': res.data.message.username,
                                'country_row_id': res.data.message.country_row_id,
                                'email_id': res.data.message.email_id,
                                'mobile_number': res.data.message.mobile_number,
                                'referral_id': res.data.message.referral_username,
                            }
                        });
                    } else {
                        alert(res.data.message.username)
                    }

                }
            })
    }

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
                <input type="text" name="full_name" id="" placeholder='Full name *' value={formik.values.full_name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.full_name && formik.errors.full_name ? <div style={{ position: 'relative', color: "red" }}>{formik.errors.full_name}</div> : null}

                <input type="text" name="username" id="" placeholder='User name *' value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.username && formik.errors.username ? <div style={{ position: 'relative', color: "red" }}>{formik.errors.username}</div> : null}

                <input type="text" name="country_row_id" id="" placeholder='Select country *' value={formik.values.country_row_id} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.country_row_id && formik.errors.country_row_id ? <div style={{ position: 'relative', color: "red" }}>{formik.errors.country_row_id}</div> : null}
                
                <input type="text" name="mobile_number" id="" placeholder='10 digit Mobile Number *' value={formik.values.mobile_number} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.mobile_number && formik.errors.mobile_number ? <div style={{ position: 'relative', color: "red" }}>{formik.errors.mobile_number}</div> : null}
                
                <input type="email" name="email_id" id="" placeholder='Email ID *' value={formik.values.email_id} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.email_id && formik.errors.email_id ? <div style={{ position: 'relative', color: "red" }}>{formik.errors.email_id}</div> : null}
                
                <input type="password" name="password" id="" placeholder='Password *' maxLength='25' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.password && formik.errors.password ? <div style={{ position: 'relative', color: "red" }}>{formik.errors.password}</div> : null}
                
                <input type="text" name="referral_id" id="" placeholder='Referral ID' disabled='true' value={formik.values.referral_id} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                <button onClick={(e) => handleRegister(e)}>Register</button>
                <Link to='/'>Back to login</Link>
            </form>

        </div>
    )
}

export default Register