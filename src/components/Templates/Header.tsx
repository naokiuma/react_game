import axios from 'axios'

import {LoggedInContext} from "../../provider/LoggedInProvider";
import {ModalContext} from "../../provider/ModalProvider";

import {useContext,FC} from 'react'
// import {Logout} from '../../fooks/useLogout'
import {LogOutUser} from '../../infrastructure/authDriver'
import {Link } from "react-router-dom";
import { NoticeModal } from "../global/NoticeModal"

import { Searchbox } from "../Molecules/form/Searchbox"






export const Header:FC = () => {
    const { userAuth,username,setUserAuth,setUserName } = useContext(LoggedInContext);
    let modalcontext = useContext(ModalContext)
   

    //デフォルト
    // const handleLogout = Logout()


    ///最新
    const handleLogout = () => {
        LogOutUser().then((data) =>{
            setUserAuth(false)
            setUserName('');
        })
    }

    return(
        <>
            <header>
                <img src="/img/global/logo.png" alt="Logo" />
                <ul>
                    <li>
                        <Link to="/">トップ</Link>
                    </li>
                    <li>
                        <Link to="/search">ゲームを探す</Link>
                    </li>
                    {/* <li className='game_menu'>
                        ゲーム
                        <div className='sub_menu'>
                            <Link to="/search">探す</Link>
                            <Link to="/search">書く</Link>
                        </div>
                    </li> */}
                    <li>
                        <Link to="/about">サービスについて</Link>
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
                    <div>
                        <span><i className="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                </div>
                
            </header>

            {  modalcontext.Modalmsg !== '' ? (<NoticeModal msg={modalcontext.Modalmsg} modalActive={true}/>) : (<></>)}
            <Searchbox/>

         
            
        </>
    )

}