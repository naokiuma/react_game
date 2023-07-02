import { Route,Routes,BrowserRouter } from "react-router-dom";//switch は Routesに変わった
import { Home } from "../components/pages/Home";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { About } from "../components/pages/About";
import { UserDetail } from "../components/pages/UserDetail";

import { GameWrap } from "../components/pages/GameWrap";

import { GameSearch } from "../components/pages/GameSearch";
import { GameForm } from '../components/pages/GameForm';
import { GameDetail } from '../components/pages/GameDetail';
import { Setting } from "../components/pages/Setting";
import { TopicDetail } from '../components/pages/TopicDetail';
import { Login } from '../components/pages/Login';
import { TopicForm } from '../components/pages/TopicForm';

import { Register } from '../components/pages/Register';
import { Nomatch } from '../components/pages/Nomatch';



// import { Header } from '../components/Templates/Header';
// import { Footer } from '../components/Templates/Footer';

import { Layout } from '../components/Templates/Layout';




/**
 * 
 * ログインユーザーのみアクセス可能
 */
export const MainRoute = () => {
    return(
        <Routes>
  			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/login/" element={<Login/>} />
				<Route path="/register/" element={<Register/>} />
				<Route path="/about/" element={<About/>} />
				<Route path="/user/" element={<UserDetail/>} />

				<Route path="/game" element={<GameWrap/>}>
					<Route path="search" element={<GameSearch/>} />
					<Route path="create" element={<GameForm/>} />
					<Route path=":id" element={<GameDetail />} />
				</Route>
				<Route path="/topic/:id" element={<TopicDetail />} />
				<Route path="/topic/create" element={<TopicForm/>} />

				<Route element={<PrivateRoute />}>
				<Route path="/setting" element={<Setting/>}/>
				</Route>
				<Route path="*" element={<Nomatch />} />
			</Route>
        </Routes>

    )
};