import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Top from './Top';
import About from './Components/routes/About'
import Blog from './Components/routes/Blog'
import EditBlog from './Components/routes/EditBlog'


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider 
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    // redirectUri={`http://localhost:3000/sign_in`}
    redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Top/>}/>
          <Route exact path='/blog' element={<Blog/>}/>
          <Route exact path='/editblog' element={<EditBlog/>}/>
          <Route exact path='/about' element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);