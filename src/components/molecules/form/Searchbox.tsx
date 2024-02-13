import {useState,memo,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import {searchGamesFromKeyword} from "infrastructure/gameDriver";



/**
 * ヘッダーでの利用時は表示非表示を切り替える関数を受け取る
 */
type SearchboxProps = {
	toggleDisplay?:React.Dispatch<React.SetStateAction<boolean>>;
	is_modal:boolean
}

export const Searchbox = memo((props:SearchboxProps) => {
	const isFirstRender = useRef(true);
	const navigate = useNavigate();
    let url = new URL(window.location.href);
    let params = url.searchParams;
    const defaultValue = params.get('game') ? params.get('game') : '';

    const [inputValue, setInputValue] = useState(defaultValue);
	const [temp_result,setTempResult] = useState([]);//リアルタイム検索結果
    const [isLoading, setIsLoading] = useState(false);

	/**
	 * ゲーム一覧ページへリダイレクト
	 * @param event 
	 */
	const handleSubmit:React.FormEventHandler<HTMLElement> = (event) => {
		event.preventDefault();
		if(props.toggleDisplay){
			props.toggleDisplay(false);
		}
		navigate(`/game/list?game=${inputValue}`);	
    };

	let timeoutId;

	useEffect(() => {
		//モーダルの場合のみリアルタイム検索を実施
	if(!props.is_modal){
			return;
		}
		//初回は表示しない
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		setIsLoading(true)
		const realtime_search = () => {
		  timeoutId = setTimeout(async() => {
			const temp_result = await searchGamesFromKeyword(inputValue)
			setIsLoading(false)
			setTempResult(temp_result)
			console.log(temp_result); // 入力値をログに出力
		  }, 1000);
		};
	
		// inputValueが変更された時に実行される処理
		if (inputValue === ''){
			setInputValue('');
			setTempResult([]);
			setIsLoading(false);
		}else if (inputValue !== '' && props.is_modal) {
		//   clearTimeout(timeoutId); // 前回のタイマーをクリア
		  realtime_search();
		}
	
		// useEffectのクリーンアップ関数
		return () => {
		  clearTimeout(timeoutId); // タイマーをクリア
		};
	}, [inputValue]); // inputValueが変更された時のみ実行
	


    

    return (
		<>
			<div className="search_form_wrap">
				{props.is_modal &&(
					<button className="search_box_close_btn js_close_search_box">close</button>
				)}
				<form onSubmit={handleSubmit}>
					<dl>
						<dt>ゲーム名で検索する</dt>
						<dd>
							<input type="text"
							value={inputValue} 
							onChange={(event) => setInputValue(event.target.value)}
							placeholder='ゲームの名前'/>
							{/* 一時検索エリア */}
							<div className="_result">
								{
									(()=>{
										if(temp_result.length > 0){
											return(
												<div className="game_card_wrap">
													{temp_result.map((_result)=>(
														<Link to={"game/list?game=" + _result.game_name} className="game_link">
															{_result.game_name}
														</Link>
														))}
												</div>
											)
										}else if(isLoading){
											return(
												<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
											)
										}
									})()	
								}					
							</div>
						</dd>
					</dl>
				</form>
			</div>
		</>
    )

})

