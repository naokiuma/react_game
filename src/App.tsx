import React from 'react';
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import { Home } from "./components/pages/Home";

import { About } from "./components/pages/About";
import { TopicPage } from './components/pages/TopicPage';
import { Login } from './components/pages/Login';

import { Nomatch } from './components/pages/Nomatch';


//ルーター
// import { Router } from "./router/Route";


import './App.css';
import './css/global/reset.css';
import './css/global/main.css';

function App() {

  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>  
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <div className="login_block">
          <Link to="/login">Login</Link>
        </div>
      </header>

      <main>
      <Routes>
        <Route index element={<Home />} />        
        <Route path="/about/" element={<About />} />
        <Route path="/topics/:id" element={<TopicPage />} />
        <Route path="/login/" element={<Login />} />

        <Route path="*" element={<Nomatch />} />
      </Routes>
      </main>
    </>
  );
}



export default App;
