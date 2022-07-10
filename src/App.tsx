import React from 'react';
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった


//コンポーネント
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";







// import { Contents } from "./components/pages/contents";
// import { TextInput } from "./components/TextInput";
// import { ImgPreview } from "./components/organisms/ImgPreview";
// import { GetFireData } from "./components/firebase/getFireData";
// import { SetFireData } from "./components/firebase/setFireData";


import './App.css';
import './css/global/reset.css';
import './css/global/main.css';
import { TopicDetail } from './components/pages/TopicDetail';
import { Topic } from './components/parts/Topic';




function App() {

 


  return (
    <BrowserRouter>
        <header>
          <ul>
            <li>
              <Link to="/">home</Link>  
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
          </ul>
        </header>
        <div className="contens_area">

          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/about/`} element={<About />} />
            <Route path={`/topics/:id`} element={<TopicDetail />} />

          </Routes>
        </div>
    </BrowserRouter>
  );
}



export default App;
