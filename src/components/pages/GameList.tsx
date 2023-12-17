import {ModalContext} from "../../provider/ModalProvider";
import { ChangeEvent,memo,useState,useEffect,useContext,useMemo} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {searchGame,searchGames} from "infrastructure/gameDriver";
import {GameCard} from "components/molecules/card/GameCard";
import { Searchbox } from "components/molecules/form/Searchbox"
import { useQuery } from 'react-query';
import { useTransition } from "react";



export const GameList = () => {

    //getパラメータの取得
    let url = new URL(window.location.href);
    let params = url.searchParams;
    let defaultparam = params.get('game') ? params.get('game') : '';

    // const [keyword, setKeyword] = useState(defaultparam);
    // const [result, setResult] = useState([]);

	
	const { data :games, isError,refetch} = useQuery({
		queryKey:['games'],
		queryFn: async () => {
			return searchGames(defaultparam);
		},
	});

	console.log('is_error')
	console.log(isError)



    const handleSubmitOnPage = (newText):void => {       
        // searchGame(newText).then((data) =>{
        //     if(data.length > 0){
        //         setResult(data)                
        //     }else{
        //         setResult([]);
        //     }
        // })
    }

    return (
        <>
            <section className="game_list">
                <div className="search_input_wrap">
                    <h1>ゲーム一覧</h1>
                </div>

				<Searchbox modalStatus={true} type='is_page' func={handleSubmitOnPage} />
                {
                    (()=>{
                        if(games.length > 0 && !isError){
                            return(
                                <div className="game_card_wrap">
                                    {games.map((each_game)=>(
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