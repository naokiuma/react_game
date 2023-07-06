
import {useContext,FC,useState} from 'react'
import {Link, Outlet } from "react-router-dom";
import {LoggedInContext} from "../../provider/LoggedInProvider";
import {ModalContext} from "../../provider/ModalProvider";
import {LogOutUser} from '../../infrastructure/authDriver'
import { NoticeModal } from "../global/NoticeModal"
import { Searchbox } from "../form/Searchbox"





export const Layout:FC = () => {
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
                <Link to="/">
                    <img src="/img/global/header_logo.png" className="header_logo" alt="Logo" />
                </Link>
                <ul>
                    <li>
                        <Link to="/game/search">ゲーム</Link>
                    </li>
                    <li>
                        <Link to="/about">アバウト</Link>
                    </li>
                    {/* todo ↓ログインしていれば出す */}
                    <li>
                        <Link to="/setting">設定</Link>
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


			<Outlet/>






			<footer>
				<span>
				フッターパーツ
				</span>
			</footer>


         
            
        </>
    )

}