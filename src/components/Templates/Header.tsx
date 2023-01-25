import axios from 'axios'

import {LoggedInContext} from "../global/LoggedInProvider";
import {useContext,FC} from 'react'
import {Logout} from '../../Infrastructure/useLogout'
import {Link } from "react-router-dom";



export const Header:FC = () => {

    const { userAuth,username } = useContext(LoggedInContext);
    const handleLogout = Logout()

    return(
        <header>
            <img src="/img/global/logo.png" alt="Logo" />
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/setting">Setting</Link>
                </li>
            </ul>

            <div className="login_block">
                <div className="user_info">
                    {username !== 'undefined' ? username + 'さん' : '名無しさん'}
                </div>
                {userAuth?
                    <div>
                        <button className="header_btn" onClick={handleLogout}>Logout</button>
                    </div>:
                    <>
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                        <div>
                            <Link to="/register">Register</Link>
                        </div>
                    </>
                }

            </div>
      </header>
    )

}