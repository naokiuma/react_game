// import { useContext} from 'react'
import { Route,Routes,BrowserRouter } from "react-router-dom";//switch は Routesに変わった
import { useContext} from 'react'
import {LoggedInContext} from "./components//global/LoggedInProvider";


import { Home } from "./components/pages/Home";
import { PrivateRoute } from "../src/router/PrivateRoute";

import { MainRoute } from "../src/router/MainRoute";



//プロバイダー。この中でグローバルstateを利用可能
import { LoggedInProvider} from "./components/global/LoggedInProvider";
import { Header } from './components/Templates/Header';
import { Footer } from './components/Templates/Footer';

// import { About } from "./components/pages/About";
// import { Setting } from "./components/pages/Setting";
// import { TopicPage } from './components/pages/TopicPage';
// import { Login } from './components/pages/Login';
// import { Signup } from './components/pages/Signup';
// import { Nomatch } from './components/pages/Nomatch';


/*css*/
import './App.css';
import './css/global/reset.css';
import './css/global/main.css';


function App() {
  return (
    <>
    <BrowserRouter>
        <main>
    
        <LoggedInProvider>
            <Header />
            <MainRoute />

            {/* <Routes>
              <Route index element={<Home />} />
              <Route path="/topics/:id" element={<TopicPage />} />
              <Route path="/login/" element={<Login/>} />
              <Route path="/signup/" element={<Signup/>} />
              <Route path="/about/" element={<About/>} />
              <Route element={<PrivateRoute />}>
                <Route path="/setting" element={<Setting/>}/>
              </Route>
              <Route path="*" element={<Nomatch />} />
            </Routes> */}

          <Footer />
        </LoggedInProvider>
        </main>
      </BrowserRouter>
    </>
  );
}



export default App;
