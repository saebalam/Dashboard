
import React from 'react'
import './dashboard.css'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Dashboard = () => {
    
    //extracting using object destructuring data passed from login or register page
    const location = useLocation()
    const {full_name,user_name,country_row_id,email_id,mobile_number,referral_id}=location.state

    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <h2 style={{ marginTop: '10px' }}>User Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>FullName</th>
                        <th>User Name</th>
                        <th>Country</th>
                        <th>Email Id</th>
                        <th>Mobile number</th>
                        <th>Referral id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{full_name}</td>
                        <td>{user_name}</td>
                        <td>{country_row_id}</td>
                        <td>{email_id}</td>
                        <td>{mobile_number}</td>
                        <td>{referral_id}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
