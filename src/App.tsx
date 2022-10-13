// import { useContext} from 'react'
import { Route,Routes,RouteProps,Navigate,Outlet,useLocation } from "react-router-dom";//switch は Routesに変わった
import { Home } from "./components/pages/Home";
import { PrivateRoute } from "../src/router/PrivateRoute";




//プロバイダー。これで包むことで、この中でグローバルstateを支える
import { LoggedInProvider,LoggedInContext} from "./components/global/LoggedInProvider";

import { About } from "./components/pages/About";
import { TopicPage } from './components/pages/TopicPage';
import { Login } from './components/pages/Login';
import { Header } from './components/organisms/Header';

import { Nomatch } from './components/pages/Nomatch';
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
            {/* <Route path="/about/" element={<About />} /> */}
            <Route path="/about/" element={<PrivateRoute />}>
              <Route element={<About/>}/>
            </Route>
            
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
