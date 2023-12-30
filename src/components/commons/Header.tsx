import {Link} from "react-router-dom";
import {useContext,useState} from 'react'
import {LoggedInContext} from "provider/LoggedInProvider";
import {LogOutUser} from 'infrastructure/authDriver'
import { Searchbox } from "components/molecules/form/Searchbox"


type headerProps = {
	isScroll?:boolean
}


export const Header = (props:headerProps) => {
	const showclass = props.isScroll ? 'is_scroll' : '';
	const toggleSearchBox = () =>setSearchBox(!searcIsActive)
    const { userAuth,username,setUserName,setUserID,setUserAuth } = useContext(LoggedInContext);
	let [searcIsActive,setSearchBox] = useState(false)

	const handleLogout = () => {
		LogOutUser()
			.then((res)=>{
				setUserName('');
				setUserID(0);
				setUserAuth(false);
			}).catch(()=>{
				alert('ログアウトに失敗しました。時間をあけて再実行してください')
			})
    }

    return(
		<header className={showclass}>
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
						{username !== '' ? username : 'ゲスト'}
					</li>
					{userAuth?
						<li className="btn_wrap">
							<button className="header_btn" onClick={handleLogout}>Logout</button>
						</li>
						:
						<>
							<li>
								<Link to="/login">ログイン</Link>
							</li>
							<li>
								<Link to="/register">新規登録</Link>
							</li>
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