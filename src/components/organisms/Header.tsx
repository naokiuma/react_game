import axios from 'axios'

import {LoggedInContext} from "../global/LoggedInProvider";
import {useContext} from 'react'
import {Link } from "react-router-dom";



export const Header = () => {


    const logout = () => {
        const test = 'logout_test';
        axios//csrf保護の初期化
            .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
            .then((response) => {
                //ログアウト処理
                axios
                .post(
                    'http://localhost:8888/api/logout',
                    test,
                    {withCredentials:true}//これが漏れていた！
                )
                .then((response) => {
                  console.log(response);
                })
         })
    }

    const { username,useremail } = useContext(LoggedInContext);
    return(
        <header>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>

            <div className="login_block">
                <div className="user_info">
                    {username}
                </div>
                <div>
                    <Link to="/login">Login</Link>
                    <button onClick={logout}>Loout</button>

                </div>

            </div>
      </header>
    )


    


}