import React from 'react';
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった


//コンポーネント
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { TopicPage } from './components/pages/TopicPage';
import { Nomatch } from './components/pages/Nomatch';
import { Topic } from './components/parts/Topic';


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
            <Link to="/">home</Link>  
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/about/`} element={<About />} />
          <Route path={`/topics/:id`} element={<TopicPage />} />
          <Route path="*" element={<Nomatch />} />


          
        </Routes>
      </main>
    </>
  );
}



export default App;
