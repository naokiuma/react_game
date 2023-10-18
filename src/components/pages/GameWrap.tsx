import { Outlet,Link } from "react-router-dom"


export const GameWrap = () => {
	return(
		<main className="main_contents game_content">
			<Outlet/>
			<div className="btn_wrap">
				<Link to="/game/create" className="secondly_btn">ゲームを新しく登録する</Link>
				<Link to="/game/list" className="secondly_btn">ゲームを探す</Link>
			</div>
		</main>
	)
}
