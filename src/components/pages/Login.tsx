import axios from 'axios'
import { ChangeEvent, useState,useContext} from 'react'
import { useLocation,useNavigate } from "react-router-dom";

import {LoggedInContext} from "provider/LoggedInProvider";
import {LogInUser} from 'infrastructure/authDriver'


type LoginParams = {
    email:string;
    password:string;
}

export const Login = () => {

    const location = useLocation();

    //ログイン状態
    const IsLogged = useContext(LoggedInContext);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //グローバルな値
    const { username,setUserName } = useContext(LoggedInContext);
    const { userid,setUserID } = useContext(LoggedInContext);
    const { userAuth,setUserAuth } = useContext(LoggedInContext);
    const { setUseremail } = useContext(LoggedInContext);


    const changeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const changePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLoginClick = async () => {
        const loginParams:LoginParams = {email,password}
        // console.log('loginします')
        // console.log(loginParams)
        await LogInUser(loginParams)
		.then((response)=>{

			setUserName(response.data.name);
			setUserID(response.data.user_id);
			setUseremail(response.data.email);
			setUserAuth(true);

			console.log('login successed')
			// console.log(response.data);

		})




        // axios//csrf保護の初期化
        // .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
        // .then((response) => {
        //     //ログイン処理
        //     axios
        //     .post(
        //         'http://localhost:8888/api/login',
        //         loginParams,
        //         {withCredentials:true}
        //     )
        //     .then((response) => {
        //         setUserName(response.data.name);
        //         setUserID(response.data.user_id);
        //         setUseremail(response.data.email);
        //         setUserAuth(true);
        // // navigate(url)//リダイレクト
        // // ローカルストレージに保存する場合-------------------------------------
        // // ローカルストレージにキーを指定して、それに紐づく値を保存
        // // localStorage.setItem('userName', response.data.name);
        // // localStorage.setItem('userEmail', response.data.email);

        // // ローカルストレージからキーを指定して取得
        // var cat = localStorage.getItem("myCat");
        // // ローカルストレージから対象のキーに紐づく値を削除
        // localStorage.removeItem("myCat");
        //     })
        // })


    }


    return(
        <section className="login">
            <h1>
                Login
            </h1>
            {username}
            {userid}
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