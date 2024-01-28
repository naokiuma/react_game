import {useState,memo,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


/**
 * ヘッダーでの利用時は表示非表示を切り替える関数を受け取る
 */
type SearchboxProps = {
	toggleDisplay?:React.Dispatch<React.SetStateAction<boolean>>;
	with_result_area?:boolean //検索文字の結果を表示するエリア
	with_close_btn?:boolean // 閉じるボタン
}

export const Searchbox = memo((props:SearchboxProps) => {
	const navigate = useNavigate();
    let url = new URL(window.location.href);
    let params = url.searchParams;
    const defaultValue = params.get('game') ? params.get('game') : '';

    const [inputValue, setInputValue] = useState(defaultValue);

	//検索時、ゲーム一覧ページでリダイレクト
	const handleSubmit:React.FormEventHandler<HTMLElement> = (event) => {
		event.preventDefault();
		if(props.toggleDisplay){
			props.toggleDisplay(false);
		}
		navigate(`/game/list?game=${inputValue}`);	
    };

	useEffect(() => {
		let timeoutId;
	
		const handleInputTimeout = () => {
		  timeoutId = setTimeout(() => {
			console.log(inputValue); // 入力値をログに出力
		  }, 1000);
		};
	
		// inputValueが変更された時に実行される処理
		if (inputValue !== '' && props.with_result_area) {
		  clearTimeout(timeoutId); // 前回のタイマーをクリア
		  handleInputTimeout();
		}
	
		// useEffectのクリーンアップ関数
		return () => {
		  clearTimeout(timeoutId); // タイマーをクリア
		};
	  }, [inputValue]); // inputValueが変更された時のみ実行
	


    const handleInputChange = (event) => {
		setInputValue(event.target.value);
    };

    return (
		<>
			<div className="search_form_wrap">
				{props.with_close_btn　&&(
					<button className="search_box_close_btn js_close_search_box">close</button>
				)}
				<form onSubmit={handleSubmit}>
					<dl>
						<dt>ゲーム名で検索する</dt>
						<dd>
							<input type="text" value={inputValue} onChange={handleInputChange} placeholder='ゲームの名前'/>
							<div className="_result">
								{/* todo：ここに一時的リザルトを出したい */}
								
							</div>
						</dd>
					</dl>
				</form>
			</div>
		</>
    )

})

