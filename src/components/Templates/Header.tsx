import axios from 'axios'

import {LoggedInContext} from "../../provider/LoggedInProvider";
import {ModalContext} from "../../provider/ModalProvider";

import {useContext,FC,useState} from 'react'
// import {Logout} from '../../fooks/useLogout'
import {LogOutUser} from '../../infrastructure/authDriver'
import {Link } from "react-router-dom";
import { NoticeModal } from "../global/NoticeModal"

import { Searchbox } from "../Molecules/form/Searchbox"






export const Header:FC = () => {
    const { userAuth,username,setUserAuth,setUserName } = useContext(LoggedInContext);
    let modalcontext = useContext(ModalContext)
   

    let [searcIsActive,setSearchBox] = useState(false)



    ///最新
    const handleLogout = () => {
        LogOutUser().then((data) =>{
            setUserAuth(false)
            setUserName('');
        })
    }

    const toggleSearchBox = () =>setSearchBox(!searcIsActive)

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
                    <div onClick={toggleSearchBox}>
                        <span className="search_icon_wrap"><i className="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                </div>
                
            </header>

            {  modalcontext.Modalmsg !== '' ? (<NoticeModal msg={modalcontext.Modalmsg} modalActive={true}/>) : (<></>)}
            <Searchbox modalStatus={searcIsActive}/>


         
            
        </>
    )

}