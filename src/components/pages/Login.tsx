import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { memo,FC } from "react";

type LoginParams = {
    email:string;
    password:string;
}


export const Login:FC = memo(() => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const changeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const changePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleClick = () => {
        const loginParams:LoginParams = {email,password}
        axios//csrf保護の初期化
            .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
            .then((response) => {
                //ログイン処理
                axios
                .post(
                    'http://localhost:8888/login',
                    loginParams,
                    {withCredentials:true}
                )
                .then((response) => {
                    console.log(response.data)
                })
            })
        }

    return(
    <section className="login">
        <h1>
            ログインページですです。
        </h1>
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
})