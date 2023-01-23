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
              <Footer />
          </LoggedInProvider>
        </main>
      </BrowserRouter>
    </>
  );
}



export default App;
