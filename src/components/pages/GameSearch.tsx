import { ChangeEvent,memo,FC,useState,useEffect } from "react";
// import { Game_Type } from "../../domain/game";
// import {SearchGame} from "../../fooks/useGame";
import {SearchGame} from "../../useCase/gameusecase";

import genres from '../../utils/game_genre'
// import GameDriver from "../../infra/gameDriver";
// import GameRepogitory from "../../infra/gameDriver";




export const GameSearch:FC = memo(() => {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState([]);


    const changeKeyword = (e:ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    const submit = ():void => {
        // GameRepogitory.SearchGame(keyword).then((data)=>{
        //     setResult([data])
        //     console.log('result')
        //     console.log(data)
        // })
        
        SearchGame(keyword).then((data) =>{
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
                            <ul className="search_result_area">
                            {result.map((each_game)=>(
                                <li key={each_game.id}>
                                    <div className="">
                                        ゲーム名：{each_game.game_name}<br/>
                                        ジャンル：{genres[each_game.genres]}
                                        {each_game.topics && 
                                        <ul>
                                            {each_game.topics.map((_topic)=>(
                                                <li>
                                                    <span>名前：{_topic.title}</span><br/>
                                                    <span>状況：{_topic.status}</span><br/>
                                                </li>       
                                            ))}
                                        </ul>
                                        }
                                    </div>
                                </li>
                            ))}
                            </ul>
                        )
                    }
                })()
            }






                
        </section>
    )

})