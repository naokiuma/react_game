import { memo,FC } from "react";
//detchデータ
import { Testfetch } from "../../fetch/Testfetch";
import { Topic } from "../global/Topic";

// export const InlineStyle = () => {
//     const Container ={
//       border:"1px solid black",
//       borderRadius:"20px"
  
//     }
//     return (
//       <div style={Container}>
//         <p>-inline styles -</p>
//         <button>ボタン</button>
//       </div>
//     );
//   };

export const Home:FC = memo(() => {

    const Topics ={
        display:"flex",
    }
    return (
        <section className="home main_contents">
            <p>
                ホームです。
            </p>
            <div style={Topics}>
                <Topic title={'やあ'} id={1} status={'話し中'}/>
                <Topic title={'ダイイングライトをプレイ中'} id={1} status={'話し中'}/>
                <Topic title={'ゼルダ面白かったー！'} id={1} status={'完了'}/>



            </div>
            <Testfetch/>
        </section>
    )

})