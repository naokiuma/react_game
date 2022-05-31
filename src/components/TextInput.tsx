import React, { useRef } from 'react';

export const TextInput = () => {
    //const myRef = React.createRef();//createrefはクラスコンポーネントで使う
    const inputElement = useRef(null);//userefは関数コンポーネントで使える
    const handleClick = (): void => {
        inputElement.current.focus();
        console.log("focusする。" + inputElement.current)
    };

    return (
    <div>
        <input type="text" ref={inputElement} />
        <input type="button" value="Focus" onClick={handleClick}/>
    </div>
    ); 
};