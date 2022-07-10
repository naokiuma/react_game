//import { TodoType } from "../../../types/todoType";
import {useState} from "react";
import axios from "axios";

type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};



export const Testfetch = (): JSX.Element => {

    // const [todos,setTodos] = useState<Array<TodoType>>([]);
    const [todos,setTodos] = useState<Array<TodoType>>([]);
    

    const onClickFetchData = () => {
      console.log("動作確認");
      axios
      // .get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos")
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTodos(res.data);
      })
      console.log(todos);
    }

    //todo。いずれこのliもコンポーネントにする。
    return (
      <>
        <button onClick={onClickFetchData}>テストフェッチ</button>
        <ul>

          {todos.map((todo) => (
            <li>
              title：{todo.title}
              userId：{todo.userId}
              completed：{todo.completed}
            </li>
          ))}
        
        </ul>
      </>
      
    )
}