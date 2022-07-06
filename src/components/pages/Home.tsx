import { memo,FC } from "react";
//detchデータ
import { Testfetch } from "../../fetch/Testfetch";
import { Topic } from "../global/Topic";



export const Home:FC = memo(() => {
    return (
        <section className="home main_contents">
            <p>
                ホームです。
            </p>
            <div className="topics">
                <Topic title={'やあ'} id={1} status={'話し中'}/>
                <Topic title={'ダイイングライトをプレイ中'} id={1} status={'話し中'}/>
                <Topic title={'ゼルダ面白かったー！'} id={1} status={'完了'}/>



            </div>
            <Testfetch/>
        </section>
    )

})