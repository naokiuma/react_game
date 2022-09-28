import React,{useContext} from 'react';
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import { Home } from "./components/pages/Home";

//プロバイダー。これで包むことで、この中でグローバルstateを支える
import { LoggedInProvider,ExampleProvider,LoggedInContext,ExampleContext } from "./components/global/LoggedInProvider";

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

const { count, setCount } = useContext(ExampleContext);//サンプル

const { username } = useContext(LoggedInContext);


  

  return (
    <>
    <ExampleProvider>
      <LoggedInProvider>
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <div>
          {/* {username} */}
          </div>
          <div className="login_block">
            <Link to="/login">Login</Link>
          </div>
        </header>
        あ？れ？
        {username}
        {count}
        
      
      

        <main>
        ここは？{username}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about/" element={<About />} />
          <Route path="/topics/:id" element={<TopicPage />} />
          <Route path="/login/" element={<Login />} />

          <Route path="*" element={<Nomatch />} />
        </Routes>
        </main>
        </LoggedInProvider>
    </ExampleProvider>

    </>
  );
}



export default App;
