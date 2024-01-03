import {Link} from "react-router-dom";
import {useContext,useState,memo} from 'react'
import {LoggedInUserContext} from "provider/LoggedInUserProvider";

import {LogOutUser} from 'infrastructure/authDriver'
import { Searchbox } from "components/molecules/form/Searchbox"


type headerProps = {
	isScroll?:boolean
}


export const Header = memo((props:headerProps) => {
	const showclass = props.isScroll ? 'is_scroll' : '';
	const toggleSearchBox = () =>{
		setSearchBox(!searcIsActive)
	}
    const { userInfo,setUserInfo } = useContext(LoggedInUserContext);
	// console.log('usernameは')
	// console.log(username)

	console.log('userinfoは')
	console.log(userInfo)

	let [searcIsActive,setSearchBox] = useState(false)

	const handleLogout = () => {
		LogOutUser()
			.then((res)=>{
				setUserInfo({
					name:'',
					user_id:0,
					email:'',
					auth:false
				})
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
					{/* todo ↓ログインしていれば出す */}
					<li>
						<Link to="/setting">設定</Link>
					</li>
				</ul>

				<ul className="login_block">
					<li className="user_info">
						{userInfo.name !== '' ? userInfo.name : 'ゲスト'}
					</li>
					{userInfo.auth?
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

})