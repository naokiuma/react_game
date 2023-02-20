import { ChangeEvent,memo,FC,useState,useEffect } from "react";
import {SearchGame} from "../../fooks/useGame";



export const GameSearch:FC = memo(() => {


    const {fetchGame} = SearchGame();

   

    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState([]);


    const changeKeyword = (e:ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    const submit = ():void => {
        fetchGame(keyword).then((data) =>{
            setResult(data)
            console.log('result')
            console.log(result)
        })

    }



    return (
        
        <section className="main_contents">
            <div className="search_input_wrap">
                <span>
                    ゲームを探す
                </span>
                <input type="text" 
                    value={keyword}
                    onChange={changeKeyword}
                />
                <button className="submit_btn"onClick={submit}>探す</button>
            </div>
             {
                (()=>{
                    if(result){
                        return(
                            <div className="search_result_area">
                            {result.map((each_game)=>(
                                <li key={each_game.id}>
                                    <div className="">
                                        ゲーム名：{each_game.game_name}
                                        {each_game.topics && 
                                            <ul>
                                                {each_game.topics.map((_topic)=>(
                                                    <li>
                                                        <span>{_topic.title}</span>
                                                        <span>{_topic.status}</span>
                                                    </li>       
                                                ))}
                                            </ul>
                                        }
                                    </div>
                                </li>
                            ))}
                            </div>
                        )
                    }
                })()
            }






                
        </section>
    )

})