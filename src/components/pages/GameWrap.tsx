import { Outlet,Link } from "react-router-dom"


export const GameWrap = () => {
	return(
		<div className="main_contents">
			<div>
		 		<Outlet/>
                <Link to="/game/create">ゲームを新しく登録する</Link><br/>
                <Link to="/game/list">ゲームを探す</Link><br/>
            </div>
		</div>
	)
}
