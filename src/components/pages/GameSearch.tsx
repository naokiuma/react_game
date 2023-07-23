import {ModalContext} from "../../provider/ModalProvider";
import { ChangeEvent,memo,useState,useEffect,useContext,useMemo} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {searchGame} from "infrastructure/gameDriver";
import {GameCard} from "components/molecules/card/GameCard"



export const GameSearch = () => {

    //getパラメータの取得
    let url = new URL(window.location.href);
    let params = url.searchParams;
    let defaultparam = params.get('game') ? params.get('game') : '';

    const [keyword, setKeyword] = useState(defaultparam);
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
                    <h1>
                        ゲームを探そう！
                    </h1>
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
                                <div className="game_card_wrap">
                                    {result.map((each_game)=>(
										<GameCard key={each_game.id} {...each_game} />
                                    ))}
                                </div>
                            )
                        }
                    })()
                } 
                
            </section>
        </>
    )

}