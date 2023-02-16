import { ChangeEvent,memo,FC,useState,useEffect } from "react";
import {SearchGame} from "../../Infrastructure/useGame";



export const GameSearch:FC = memo(() => {


    const {fetchGame} = SearchGame();

    // useEffect(() => {
    //     searchGame().then((data) =>{

    //     })
    // },[])

    const [keyword, setKeyword] = useState("");
    const changeKeyword = (e:ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    const submit = ():void => {
        let result = fetchGame(keyword)
        console.log(result)
        // props.toggleModalActive(false);

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


            <div className="search_result_area">

                結果がここにはいる

            </div>
        </section>
    )

})