import {Link, Outlet } from "react-router-dom";
import {useContext,useState} from 'react'
import {LoggedInContext} from "provider/LoggedInProvider";
import {LogOutUser} from 'infrastructure/authDriver'
import { Searchbox } from "components/molecules/form/Searchbox"




export const Header = () => {

	const toggleSearchBox = () =>setSearchBox(!searcIsActive)
    const { userAuth,username,setUserAuth,setUserName } = useContext(LoggedInContext);

	let [searcIsActive,setSearchBox] = useState(false)
	const handleLogout = () => {
        LogOutUser().then((data) =>{
            setUserAuth(false)
            setUserName('');
        })
    }



    return(
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
    )

}