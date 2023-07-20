import { useState,useMemo,memo,useCallback } from "react";

const Title = memo(() => {
	console.log('Title!');
	return(
		<h2>useCallBackTest1.1</h2>
	)
})




type ButtonType ={
	handleClick:()=> void;
	value:string;

}
const Button = memo(({handleClick,value}:ButtonType)=>{
	console.log('Button child component', value)
	return <button type="button" onClick={handleClick}>{value}</button>
})



type CountType = {
	text:string;
	countState:number;
}

const Count = memo(({text,countState}:CountType) => {
	console.log('Count child component', text)
	return <p>{text}:{countState}</p>
})




//Counterコンポーネント（親）
export const Counter = () => {

	const [firstCountState, setFirstCountState] = useState(0)
	const [secondCountState, setSecondCountState] = useState(10)
  
  //+ 1 ボタンのstateセット用関数
	const incrementFirstCounter = useCallback(() => setFirstCountState(firstCountState + 1),[firstCountState])
	// const incrementFirstCounter = () => console.log('じっし');

  
  //+ 10 ボタンのstateセット用関数
	const incrementSecondCounter = useCallback(() => setSecondCountState(secondCountState + 10),[secondCountState])
	// const incrementSecondCounter = () => console.log('じっし');

  
  //子コンポーネントを呼び出す
	return (
	  <>
		<Title/>
		<Count text="+ 1 ボタン" countState={firstCountState}/>
		<Count text="+ 10 ボタン" countState={secondCountState}/>
		<Button handleClick={incrementFirstCounter} value={'+1 ボタン'}/>
		<Button handleClick={incrementSecondCounter} value={'+10 ボタン'}/>
	  </>
	)
  }