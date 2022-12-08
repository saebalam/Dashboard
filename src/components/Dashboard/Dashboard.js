
import React from 'react'
import './dashboard.css'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Dashboard = () => {
    const myresdata=useParams().resdata
    console.log('message',{myresdata})
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
                        <td>Saeb Alam</td>
                        <td>alam_sa</td>
                        <td>India</td>
                        <td>test@test.com</td>
                        <td>9876543210</td>
                        <td>BCDT456YT</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard


