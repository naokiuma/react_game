import {ModalContext} from "../../provider/ModalProvider";

import { ChangeEvent,memo,FC,useState,useEffect,useContext} from "react";
import {Link } from "react-router-dom";

import genres from '../../utils/game_genre'
import {searchGame} from "../../infrastructure/gameDriver";

import {BASE_URL} from "../../config/url"



export const GameSearch:FC = memo(() => {

    

    let url = new URL(window.location.href);
    let params = url.searchParams;
    let defaultValue = params.get('game') ? params.get('game') : '';

    const [keyword, setKeyword] = useState(defaultValue);
    const [result, setResult] = useState([]);
    const { Modalmsg,setModalMsg } = useContext(ModalContext);

    useEffect(() => {
        searchGame(keyword).then((data) =>{
            if(data.length > 0){
                setResult(data)                
            }
        })
    },[])



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
            }
        })
    }


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
                                                {genres[each_game.genres]}
                                            </div>


                                            {each_game.images != null && 
                                            <div>
                                                {each_game.images.map((_img)=>(
                                                    <img src={BASE_URL + _img.image_file_name.replace("public","storage")} alt="" />     
                                                ))}
                                            </div>
                                            
                                                // <img src={BASE_URL + each_game.image_file_name.replace("public","storage")} alt="" />
                                            }

                                            {each_game.topics && 
                                            <>
                                                <span>このゲームの話題</span>
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
                                            </>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    })()
                } 

                <div>
                    <Link to="/game/create">ゲームを新しく登録する</Link>
                </div>


            </section>
        </>
    )

})