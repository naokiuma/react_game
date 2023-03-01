import { memo,FC } from "react";
//css
import '../../css/pages/user.css';


export const UserDetail:FC = () => {
    return (
        <div className="main_contents">
            <h1>テスト<span>さん</span></h1>
            <section className="">
                <div className="profile_side">
                    <div className="profile_img_wrap">
                        <figure>
                            <img src="/img/top/top_billboard1.jpg" alt="" />
                        </figure>
                    </div>
                </div>



            </section>
        </div>

    )
}