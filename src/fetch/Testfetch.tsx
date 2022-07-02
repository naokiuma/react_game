import { TodoType } from "../types/todo";
import {useState} from "react";
import axios from "axios";



export const Testfetch = (): JSX.Element => {

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

    return <button onClick={onClickFetchData}>テストフェッチ</button>
}