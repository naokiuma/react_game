import axios from 'axios'
import { ChangeEvent, useState,useContext} from 'react'
import {LoggedInContext} from "../global/LoggedInProvider";
import { memo,FC } from "react";

type LoginParams = {
    email:string;
    password:string;
}


 
// export const Login:FC = memo(() => {
export const Login = () => {

    //ログイン状態
    const IsLogged = useContext(LoggedInContext);
    console.log(IsLogged);

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const { username,setUserName } = useContext(LoggedInContext);
    const { useremail,setUseremail } = useContext(LoggedInContext);



    const changeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const changePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    // SPA認証済みではないとアクセスできないAPI
    const handleUserClick = () => {
        axios.get('http://localhost:8888/api/user', { withCredentials: true }).then((response) => {
        console.log(response.data)
        })
    }




    const handleClick = () => {
        console.log("取得");
        const loginParams:LoginParams = {email,password}
        axios//csrf保護の初期化
            .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
            .then((response) => {
                //ログイン処理
                axios
                .post(
                    'http://localhost:8888/api/login',
                    loginParams,
                    {withCredentials:true}
                )
                .then((response) => {
                    setUserName(response.data.name);
                    setUseremail(response.data.email);

                    // ローカルストレージにキーを指定して、それに紐づく値を保存
                    localStorage.setItem('userName', response.data.name);
                    localStorage.setItem('userEmail', response.data.email);


                    // ローカルストレージからキーを指定して取得
                    var cat = localStorage.getItem("myCat");

                    // ローカルストレージから対象のキーに紐づく値を削除
                    localStorage.removeItem("myCat");
                })
            })
        }


    return(
        <section className="login">
            {/* <button onClick={() => setCount(count + 1)}>+</button> */}
            <h1>
                ログインページです。
            </h1>
            {username}

            <button onClick={handleUserClick}>ボタン</button>
            <div>
                メールアドレス
                <input onChange={changeEmail}/>
            </div>
            <div>
                パスワード
                <input onChange={changePassword}/>
            </div>
            <div>
                <button onClick={handleClick}>ログイン</button>
            </div>
        </section>
    )
}