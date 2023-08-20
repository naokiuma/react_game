import { ClassNames } from '@emotion/react';
import {useState,memo} from 'react'
import { useNavigate } from 'react-router-dom';

interface SearchboxProps {
    modalStatus?: boolean;
	type:string;
	func?:(newtext) => void;
}



export const Searchbox = memo((props:SearchboxProps) => {
	console.log('サーチボックス');
    const modalStatus = props.modalStatus
	const navigate = useNavigate()
    let url = new URL(window.location.href);
    let params = url.searchParams;
    const defaultValue = params.get('game') ? params.get('game') : '';

    const [inputValue, setInputValue] = useState(defaultValue);

	const handleSubmit:React.MouseEventHandler<HTMLElement> = (event) => {
		event.preventDefault();
		//同じページでの処理の場合は親から受け取った関数を実施
		if(props.type == 'is_page'){
			props.func(inputValue)
		}else{
			//globalではページ遷移
			const url = `/game/list?game=${inputValue}`;
			navigate(url);
		}
    };	

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };


    return (
        <div className={'search_box_wrap ' + (modalStatus == true ? 'active' : '')} >
            <div className="_inner">
				<i className="fa-solid fa-magnifying-glass" onClick={handleSubmit}></i>
                <input type="text" value={inputValue} onChange={handleInputChange} placeholder='ゲームの名前'/>
            </div>
        </div>
    )

})

