import React from 'react';
import axios from "axios";
import {useState} from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";


//コンポーネント
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";

import { Contents } from "./components/pages/contents";
import { TextInput } from "./components/TextInput";
import { ImgPreview } from "./components/organisms/ImgPreview";
import { GetFireData } from "./components/firebase/getFireData";
import { SetFireData } from "./components/firebase/setFireData";


import { TodoType } from "./types/todo";
import './App.css';



function App() {

  const [todos,setTodos] = useState<Array<TodoType>>([]);
  const getAxiosData = () => {
    //console.log("動作確認");
  }


  return (
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      
  );
}



export default App;
