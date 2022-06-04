import React from 'react';
import axios from "axios";
import {useState} from "react";
import logo from './logo.svg';

import { Contents } from "./components/pages/contents";
import { TextInput } from "./components/TextInput";
import { Todo } from "./components/Todo";
import { ImgPreview } from "./components/organisms/ImgPreview";



import { TodoType } from "./types/todo";
import './App.css';



function App() {

  // const [todos,setTodos] = useState<Array<TodoType>>([]);
  const [todos,setTodos] = useState<Array<TodoType>>([]);


  const getAxiosData = () => {
    axios
      .get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data)
        console.log(response);

      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={getAxiosData}>ボタン</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        メインページ
        <Contents />

        フォームテスト
        <TextInput />

        画像プレビュー
        <ImgPreview />


       
       

        {todos.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            userId={todo.userId}
            completed={todo.completed}
          />
        ))}


       
      </header>
    </div>
  );
}

export default App;
