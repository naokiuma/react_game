import { memo,useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {searchGames} from "infrastructure/gameDriver";
import {GameCard} from "components/molecules/card/GameCard";
import { Searchbox } from "components/molecules/form/Searchbox"
import { useQuery } from 'react-query';
import { useLocation } from "react-router-dom";


export const GameList = () => {

	const location = useLocation();
	//{"game" -> "ハイボール"}といった情報を取得
	let urlParams = new URLSearchParams(location.search);
	let inputValue = urlParams.get('game') || '';
	const { data :games, isError,refetch} = useQuery({
		queryKey:['games'],
		queryFn: async () => {
			return searchGames(inputValue);
		},
	});
	// getが変わったらrefetch
	useEffect(() => {   
		refetch()
	},[inputValue]);

    return (
        <>
            <section className="game_list">
                <div className="search_input_wrap">
                    <h1>ゲーム一覧</h1>
                </div>

				<Searchbox />
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