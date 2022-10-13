import axios from 'axios'

import {LoggedInContext} from "../global/LoggedInProvider";
import {useContext} from 'react'
import {Link } from "react-router-dom";



export const Header = () => {

    const {  } = useContext(LoggedInContext);
    const { userAuth,setUserAuth,username,setUserName } = useContext(LoggedInContext);

    console.log(username)

    console.log(userAuth)


    const test = () => {
        const test = 'Test_test';
        axios//csrf保護の初期化
            .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
            .then((response) => {
                //ログアウト処理
                axios
                .post(
                    'http://localhost:8888/api/test',
                    test,
                    {withCredentials:true}
                )
                .then((response) => {
                  console.log(response);
                })
         })
    }


    const logout = () => {
        axios//csrf保護の初期化
            .get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
            .then((response) => {
                //ログアウト処理
                axios
                .post(
                    'http://localhost:8888/api/logout',
                    {},
                    {withCredentials:true}
                )
                .then((response) => {
                  console.log(response);
                  setUserAuth(false)
                  setUserName('');
                })
         })
    }

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
                    {username !== 'undefined' ? username + 'さん' : 'ゲストさん'}
                </div>
                <div>
                    {userAuth ? 
                    <button className="header_btn" onClick={logout}>Logout</button> :
                    <Link to="/login">Login</Link>}
                </div>

            </div>
      </header>
    )


    


}