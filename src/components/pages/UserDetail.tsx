import { memo} from "react";
//css
import '../../css/pages/user.css';


export const UserDetail = () => {
    return (
        <div className="main_contents user_detail">
            <h1>テスト<span>さん</span></h1>
            <div className="detail_wrap">
                <section className="profile_side">
                    <div className="profile_img_wrap">
                        <figure>
                            <img src="/img/top/top_billboard1.jpg" alt="" />
                        </figure>
                    </div>
                </section>

                <section className="playing_side">
                    <div>
                        <span>ゲーム一覧</span>
                        <ul className="_status">
                            <li>買いたい</li>
                            <li>積みゲー</li>
                            <li>プレイ中</li>
                            <li>クリア済</li>
                        </ul>
                        <ul>
                            <li>
                                <dl>
                                    <dt>ゲーム名</dt>
                                    <dd>
                                        <img src="/img/top/top_billboard1.jpg" alt="" />
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>

                </section>



            </div>
        </div>

    )
}