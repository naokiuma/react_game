import { memo,FC } from "react";



export const GameSearch:FC = memo(() => {
    return (
        <section >
            ゲームを探す
            <input type="text" />


            <div className="search_result_area main_contents">
                結果がここにはいる

            </div>
        </section>
    )

})