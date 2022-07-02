import { memo,FC } from "react";
//detchデータ
import { Testfetch } from "../../fetch/Testfetch";


export const Home:FC = memo(() => {
    return (
        <section className="home main_contents">
            <p>
                ホームです。
            </p>
            <Testfetch/>
        </section>
    )

})