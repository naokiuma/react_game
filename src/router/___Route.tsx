import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
//コンポーネント
import { Home } from "../components/pages/Home";
import { About } from "../components/pages/About";
import { TopicPage } from '../components/pages/TopicPage';


export const Router = () => {
    return (

        <>
            <Routes>
                <Route path={`/`} element={<Home />} />
                <Route path={`/about/`} element={<About />} />
                <Route path={`/topics/:id`} element={<TopicPage />} />
            </Routes>
        </>
    )
}