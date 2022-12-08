import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div style={{marginTop:'100px'}}>
        <h1>Ooops, There is no such page</h1>
        <Link to='/'>Home</Link>
    </div>
  )
}

export default ErrorPage