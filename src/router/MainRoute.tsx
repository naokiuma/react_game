import { Suspense } from "react";
import { Route,Routes} from "react-router-dom";
import { PrivateRoute } from "router/PrivateRoute";
import { Home } from "components/pages/Home";
import { About } from "components/pages/About";
import { UserDetail } from "components/pages/UserDetail";
import { GameWrap } from "components/pages/GameWrap";
import { GameList } from "components/pages/GameList";
import { GameRegist } from 'components/pages/GameRegist';
import { GameDetail } from 'components/pages/GameDetail';
import { Setting } from "components/pages/Setting";
import { TopicDetail } from 'components/pages/TopicDetail';
import { Login } from 'components/pages/Login';
import { TopicRegist } from 'components/pages/TopicRegist';

import { Register } from 'components/pages/Register';
import { Nomatch } from 'components/pages/Nomatch';
import { Layout } from 'components/commons/Layout';



/**
 * 
 * PrivateRouteはprovateユーザーのみアクセス可能
 */
export const MainRoute = () => {
    return(

		<Suspense fallback={<div>loading...</div>}>

			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/login/" element={<Login/>} />
					<Route path="/register/" element={<Register/>} />
					<Route path="/about/" element={<About/>} />
					<Route path="/user/" element={<UserDetail/>} />

					<Route path="/game" element={<GameWrap/>}>
						<Route path="list" element={<GameList/>} />
						<Route path="create" element={<GameRegist/>} />
						<Route path=":id" element={<GameDetail />} />
					</Route>
					<Route path="/topic/create/new/:game_id" element={<TopicRegist/>} />
					<Route path="/topic/:id" element={<TopicDetail />} />

					<Route element={<PrivateRoute />}>
						<Route path="/setting" element={<Setting/>}/>
					</Route>
					<Route path="*" element={<Nomatch />} />
				</Route>
			</Routes>
		</Suspense>



    )
};