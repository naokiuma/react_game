import {ModalContext} from "../../provider/ModalProvider";

import { ChangeEvent,memo,FC,useState,useEffect,useContext} from "react";
import genres from '../../utils/game_genre'
import {searchGame} from "../../infrastructure/gameDriver";


export const GameSearch:FC = memo(() => {

    

    let url = new URL(window.location.href);
    let params = url.searchParams;
    let defaultValue = params.get('game') ? params.get('game') : '';

    const [keyword, setKeyword] = useState(defaultValue);
    const [result, setResult] = useState([]);
    const { Modalmsg,setModalMsg } = useContext(ModalContext);



    const changeKeyword = (e:ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    const submit = ():void => {        
        searchGame(keyword).then((data) =>{
            if(data.length > 0){
                setResult(data)                
            }else{
                setResult([]);
                setModalMsg('データが見つかりませんでした');
                setTimeout(() => {
                    setModalMsg('');
                }, 4000);
                console.log('データが見つかりませんでした')
            }
        })
    }

    
    useEffect(() => {
        searchGame(keyword).then((data) =>{
            if(data.length > 0){
                setResult(data)                
            }
        })
    },[])


    return (        
        <>
            <section className="main_contents game_search">
                <div className="search_input_wrap">
                    <span>
                        ゲームを探そう！
                    </span>
                    <input type="text" 
                        value={keyword}
                        onChange={changeKeyword}
                        placeholder='探したいゲーム名'
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
        </>
    )

})