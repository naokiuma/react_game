import {useState,memo} from 'react'
import { useNavigate } from 'react-router-dom';


/**
 * ヘッダーでの利用時は表示非表示を切り替える関数を受け取る
 */
type SearchboxProps = {
	toggleDisplay?:React.Dispatch<React.SetStateAction<boolean>>;
	with_result_area?:boolean
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


    const handleInputChange = (event) => {
      setInputValue(event.target.value);
	  if(props.with_result_area){
		  //todo1:入力して1秒してからゲーム取得のクエリを流す。(即だとそのたびクエリが走るため。)
	  }
    };

    return (
		<>
			<div className="search_form_wrap">
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

