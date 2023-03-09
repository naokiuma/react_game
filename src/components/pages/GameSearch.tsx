import { ChangeEvent,memo,FC,useState,useEffect } from "react";
import genres from '../../utils/game_genre'
import {SearchGame} from "../../infrastructure/gameDriver";





export const GameSearch:FC = memo(() => {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState([]);


    const changeKeyword = (e:ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    const submit = ():void => {        
        SearchGame(keyword).then((data) =>{
            if(data.length > 0){
                setResult(data)                
            }else{
                setResult([]);
                console.log('データが見つかりませんでした')
            }
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
                                    <li className="each_game" key={each_game.id}>
                                        <div>
                                            ゲーム名：{each_game.game_name}<br/>
                                            ジャンル：{genres[each_game.genres]}
                                            {each_game.topics && 
                                            <ul className="_topics">
                                                {each_game.topics.map((_topic)=>(
                                                    <li>
                                                        <a href="">
                                                            <span>名前：{_topic.title}</span><br/>
                                                            <span>状況：{_topic.status}</span><br/>
                                                        </a>
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