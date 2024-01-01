import axios from 'axios'
import {API_BASE_URL,API_SANCTUM_URL} from "config/url"

import { ChangeEvent, useState,useContext,useEffect} from 'react'
import {useNavigate } from "react-router-dom";
import {LoggedInUserContext} from "provider/LoggedInUserProvider";


type RegisterParams = {
    username:string;
    email:string;
    password:string;
}

export const Register = () => {
    const navigate = useNavigate();
    const { setUserInfo,userInfo } = useContext(LoggedInUserContext);

    const [username,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
	const [errMsg,setErrMsg] = useState('')

    //すでにログイン済みならtopへ。
    useEffect(() => {
		console.log('registerでのautho');
		console.log(userInfo.auth)
        if (userInfo.auth){
            navigate('/')
        }
		console.log(API_BASE_URL);
		console.log(API_SANCTUM_URL);
    },[userInfo.auth])

    const changeName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const changeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const changePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLoginClick = () => {
        const loginParams:RegisterParams = {username,email,password}

        axios//csrf保護の初期化
            .get(API_SANCTUM_URL, { withCredentials: true })
            .then((response) => {
                //ログイン処理
                axios
                .post(
                    API_BASE_URL + '/register',
                    loginParams,
                    {withCredentials:true}
                )
                .then((response) => {
					if(response.data.result){
						setUserInfo({
							name:response.data.name,
							user_id:response.data.id,
							email:response.data.email,
							auth:true
						})
					}else{
						setErrMsg(response.data.msg)
					}
                })
            })
        }

    return(
        <section className="login">
            <h1>
                ユーザー登録
            </h1>
            <div>
                お名前
                <input onChange={changeName}/>
            </div>
            <div>
                メールアドレス
                <input onChange={changeEmail}/>
            </div>
            <div>
                パスワード
                <input onChange={changePassword}/>
            </div>
            <div>
                <button onClick={handleLoginClick}>登録</button>
            </div>

        </section>
    )
}