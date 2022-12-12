import React from 'react'
import './login.css'
import userLogo from '../../Assets/Icons/user.png'
import passLogo from '../../Assets/Icons/password.png'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet';

const validate = values => {
    const errors = {};

    if (!values.user_id) {
        errors.user_id = 'username or email is required';
    }
    if (!values.password) {
        errors.password = 'Password cannot be empty'
    } 

    return errors;
};

const Login = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    })

    //handling Login form on submit button
    const handleLogin = (e) => {
        e.preventDefault()

        const data = { 'login_id': formik.values.user_id, 'password': formik.values.password }

        axios.post('https://lobster-app-ddwng.ondigitalocean.app/user/login', data, { headers: { api_key: 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH' } })
            .then(res => {
                console.log(res.status)
                if (res.status == 200) {
                    // localStorage.setItem('token',res.data.message.token)
                    const resdata = { 'full_name': res.data.message.email_id, 'user_name': res.data.message.username }
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
                        alert(res.data.message.alert_message)
                    }
                }
            })
            .catch(err => {
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

            <form className='loginForm' autoComplete="off">
                <div style={{ display: 'flex', flexDirection: 'column' }} className='myinp'>
                    <div><img style={{ width: '20px' }} src={userLogo} alt="" /></div>
                    <input type="text" name="user_id" id="" placeholder='User name or Email' value={formik.values.user_id} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.user_id && formik.errors.user_id ? <div style={{position:'relative', color: "red" }}>{formik.errors.user_id}</div> : null}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }} className='myinp'>
                    <div><img style={{ width: '20px' }} src={passLogo} alt="" /></div>
                    <input id='password_input' type="password" name="password" placeholder='Password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.password && formik.errors.password ? <div style={{position:'relative', color: "red" }}>{formik.errors.password}</div> : null}
                </div>

                <div className='buttonDiv'>
                    <button type='submit' onClick={(e) => handleLogin(e)}>Sign in</button>
                </div>
                <Link to='/register'>Register</Link>
            </form>
        </div>
    )
}

export default Login
