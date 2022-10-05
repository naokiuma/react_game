import React,{useContext} from 'react';
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import { Home } from "./components/pages/Home";

//プロバイダー。これで包むことで、この中でグローバルstateを支える
import { LoggedInProvider,LoggedInContext } from "./components/global/LoggedInProvider";

import { About } from "./components/pages/About";
import { TopicPage } from './components/pages/TopicPage';
import { Login } from './components/pages/Login';
import { Header } from './components/organisms/Header';

import { Nomatch } from './components/pages/Nomatch';


//ルーター
// import { Router } from "./router/Route";

import './App.css';
import './css/global/reset.css';
import './css/global/main.css';

function App() {

  return (
    <>
      <LoggedInProvider>
        <main>
        <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about/" element={<About />} />
            <Route path="/topics/:id" element={<TopicPage />} />
            <Route path="/login/" element={<Login />} />

            <Route path="*" element={<Nomatch />} />
          </Routes>
        </main>
        </LoggedInProvider>
    </>
  );
}



export default App;
