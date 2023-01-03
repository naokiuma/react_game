import { Route,Routes,BrowserRouter } from "react-router-dom";//switch は Routesに変わった
//プロバイダー。この中でグローバルstateを利用可能
import { Home } from "../components/pages/Home";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { About } from "../components/pages/About";
import { Setting } from "../components/pages/Setting";
import { TopicPage } from '../components/pages/TopicPage';
import { Login } from '../components/pages/Login';
import { Register } from '../components/pages/Register';
import { Nomatch } from '../components/pages/Nomatch';

/**
 * 
 * ログインユーザーのみアクセス可能
 */
export const MainRoute = () => {
    return(
        <Routes>
            <Route index element={<Home />} />
            <Route path="/topics/:id" element={<TopicPage />} />
            <Route path="/login/" element={<Login/>} />
            <Route path="/register/" element={<Register/>} />
            <Route path="/about/" element={<About/>} />
            <Route element={<PrivateRoute />}>
              <Route path="/setting" element={<Setting/>}/>
            </Route>
            <Route path="*" element={<Nomatch />} />
        </Routes>

    )
};