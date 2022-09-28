import axios from 'axios'
import { ChangeEvent, useState,useContext} from 'react'
import {LoggedInContext,ExampleContext} from "../global/LoggedInProvider";

import { memo,FC } from "react";

type LoginParams = {
    email:string;
    password:string;
}

 
// export const Login:FC = memo(() => {
export const Login = () => {

    const IsLogged = useContext(LoggedInContext);
    console.log(IsLogged);


    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const { count, setCount } = useContext(ExampleContext);//サンプル
    const { username,setUserName } = useContext(LoggedInContext);



    const changeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const changePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
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
                    console.log(response.data.name);
                    console.log(response.data.email);

                    setUserName(response.data.name);

                })
            })
        }

    return(
        <section className="login">
            <button onClick={() => setCount(count + 1)}>+</button>
            <h1>
                ログインページです。
            </h1>
            これが
            {count}
            です。
            {username}
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