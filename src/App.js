import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet';

import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  return (
    <div className="App">
      <Helmet>
       <title>App Title</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" data-react-helmet='true'/>
      </Helmet>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
