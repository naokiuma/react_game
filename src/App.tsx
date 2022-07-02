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



function App() {

 


  return (
    <BrowserRouter>
        <header>
          <ul>
            <Link to="/">home</Link>
            <Link to="/about">about</Link>
          </ul>
        </header>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/about/`} element={<About />} />
        </Routes>
    </BrowserRouter>
  );
}



export default App;
