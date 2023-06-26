import {FC} from "react";
import { Outlet,Link } from "react-router-dom"


export const GameWrap:FC = () => {
	return(
		<div className="main_contents">
			ゲームラップです
		 	<Outlet/>

			<div>
                <Link to="/game/create">ゲームを新しく登録する</Link><br/>
                <Link to="/game/search">ゲームを探す</Link><br/>
				{/* todo、gamesをここに出す */}

            </div>
		</div>
	)
}
