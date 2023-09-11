
import {useContext,useState} from 'react'
import {Link, Outlet } from "react-router-dom";
import {LoggedInContext} from "provider/LoggedInProvider";
import {ModalContext} from "provider/ModalProvider";
import {LogOutUser} from 'infrastructure/authDriver'
import { NoticeModal } from "components/molecules/modal/NoticeModal"
import { Searchbox } from "components/molecules/form/Searchbox"
import { Footer } from './Footer';



export const Test = () => {
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

	//サーチボックスの表示非表示切り替え
    const toggleSearchBox = () =>setSearchBox(!searcIsActive)

    return(
        <>
            <header>
				<div className="inner">
					<Link to="/">
						<img src="/img/global/header_logo.png" className="header_logo" alt="Logo" />
					</Link>
					<ul>
						<li>
							<Link to="/game/list">ゲーム</Link>
						</li>
						<li>
							<Link to="/about">このサービスについて</Link>
						</li>
						{/* todo ↓ログインしていれば出す */}
						<li>
							<Link to="/setting">設定</Link>
						</li>
					</ul>

					<ul className="login_block">
						<li className="user_info">
							{username !== 'undefined' ? username + 'さん' : 'ゲスト'}
						</li>
						{userAuth?
							<li>
								<button className="header_btn" onClick={handleLogout}>Logout</button>
							</li>
							:
							<>
								{/* <ul> */}

									<li>
										<Link to="/login">ログイン</Link>
									</li>
									<li>
										<Link to="/register">新規登録</Link>
									</li>
								{/* </ul> */}
							</>
						}
						<div onClick={toggleSearchBox}>
							<span className="search_icon_wrap"><i className="fa-solid fa-magnifying-glass"></i></span>
						</div>
					</ul>

				</div>
            	<Searchbox modalStatus={searcIsActive} type="global"/>
            </header>

            {  modalcontext.Modalmsg !== '' ? (<NoticeModal msg={modalcontext.Modalmsg} modalActive={true}/>) : (<></>)}
			<Outlet/>
			<Footer/>            
        </>
    )

}