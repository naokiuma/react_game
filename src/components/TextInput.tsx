import React, { useRef,useState } from 'react';

export const TextInput = () => {
    //const myRef = React.createRef();//createrefはクラスコンポーネントで使う
    const inputElement = useRef(null);//userefは関数コンポーネントで使える
    const [name, setName] = useState("あいう");
   

    return (
        <form action="">
            <label htmlFor="">
                <input type="text" value={name} name="name"/>
            </label>
            <input type="submit" value="submit"/>

        </form>
    ); 
};