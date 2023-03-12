import axios from 'axios'
import { ChangeEvent, useState,useContext,useEffect} from 'react'
import { useLocation,useNavigate } from "react-router-dom";
import {LoggedInContext} from "../../provider/LoggedInProvider";

type RegisterParams = {
    username:string;
    email:string;
    password:string;
}

export const Register = () => {

    const location = useLocation();
    // console.log('uselocationで取得したデータ')
    // console.log(location)

    const navigate = useNavigate();
    const [username,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const { userAuth,setUserAuth } = useContext(LoggedInContext);

    //すでにログイン済みならtopへ。
    useEffect(() => {
        if (userAuth){
            navigate('/')
        }
    },[])

  
    const { setUseremail } = useContext(LoggedInContext);

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
            .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
            .then((response) => {
                //ログイン処理
                axios
                .post(
                    'http://localhost:8888/api/register',
                    loginParams,
                    {withCredentials:true}
                )
                .then((response) => {
                    // console.log('登録後のデータ')
                    // console.log(response.data)
                    setName(response.data.name);
                    setUseremail(response.data.email);
                    
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
                <button onClick={handleLoginClick}>ログイン</button>
            </div>
        </section>
    )
}