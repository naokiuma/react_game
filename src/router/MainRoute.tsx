import { Route,Routes,BrowserRouter } from "react-router-dom";//switch は Routesに変わった
import { Home } from "../components/pages/Home";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { About } from "../components/pages/About";
import { UserDetail } from "../components/pages/UserDetail";

import { GameSearch } from "../components/pages/GameSearch";

import { Setting } from "../components/pages/Setting";
import { TopicDetail } from '../components/pages/TopicDetail';
import { Login } from '../components/pages/Login';
import { TopicForm } from '../components/pages/TopicForm';

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
            <Route path="/topics/:id" element={<TopicDetail />} />
            <Route path="/topic/create" element={<TopicForm/>} />
            <Route path="/login/" element={<Login/>} />
            <Route path="/register/" element={<Register/>} />
            <Route path="/about/" element={<About/>} />
            <Route path="/user/" element={<UserDetail/>} />

            <Route path="/search/" element={<GameSearch/>} />

            <Route element={<PrivateRoute />}>
              <Route path="/setting" element={<Setting/>}/>
            </Route>
            <Route path="*" element={<Nomatch />} />
        </Routes>

    )
};