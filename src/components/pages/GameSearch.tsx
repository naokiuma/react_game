import {ModalContext} from "../../provider/ModalProvider";
import { ChangeEvent,memo,FC,useState,useEffect,useContext} from "react";
import {Link } from "react-router-dom";
import Slider from "react-slick";
import genres from '../../utils/game_genre'
import {searchGame} from "../../infrastructure/gameDriver";
import {BASE_URL} from "../../config/url"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const GameSearch:FC = memo(() => {


    //getパラメータの取得
    let url = new URL(window.location.href);
    let params = url.searchParams;
    let defaultparam = params.get('game') ? params.get('game') : '';

    const [keyword, setKeyword] = useState(defaultparam);
    const [result, setResult] = useState([]);
    const { Modalmsg,setModalMsg } = useContext(ModalContext);

    let settings = {
        dots: false,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

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
                                            <div className="_first">
                                                <Link to={"/game/" + each_game.id} state={each_game}>
                                                    {each_game.game_name}<br/>
                                                </Link>

                                                <span>{genres[each_game.genres]}</span>
                                            </div>

                                            {/* 画像 */}
                                            {each_game.images != null && 
                                            <Slider {...settings}>
                                                {each_game.images.map((_img)=>(
                                                    <div className="img_wrap">
                                                        <img src={BASE_URL + _img.image_file_name.replace("public","storage")} alt="" />     
                                                    </div>
                                                    ))}
                                            </Slider>
                                            }

                                            {each_game.topics && 
                                            <div className="game_each_topic">
                                                <span>話題</span>
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
                                            </div>
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