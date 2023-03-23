
import { memo,FC,useState,useEffect } from "react";
import { useForm } from 'react-hook-form';
import {ImgPreview} from "../Templates/ImgPreview"
import {ImgsPreview} from "../Templates/ImgsPreview"

import genres from '../../utils/game_genre'


//インフラ
import {createGame} from "../../infrastructure/gameDriver";
import {GetCategory} from "../../infrastructure/categoryDriver";

//Form用の情報
type FormInputs = {
    GameName:string;
    GameGenre:string;
};





export const GameForm = memo(() => {

    //既存カテゴリーの取得--------------
    let [categories,set_category] = useState([])
    useEffect(() => {
        GetCategory().then((data) => {
            set_category(data);
            console.log(categories)
        });
    },[])

    console.log(genres)

    //useformの初期化
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<FormInputs>({
    });

    //画像のみ別途用意
    const [imgData, setImg] = useState<File>(null);

    const [images, setImages] = useState<File[]>([]);

    
    const submit = (data:FormInputs) => {
        // console.log('送るでーた')
        // console.log(images)
        // console.log(data.GameName)
        // console.log(data.GameGenre)

        createGame(data.GameName,data.GameGenre,['1','2'],images)  
    }

    return (
        <section className="main_contents form_wrap game_form">

            <h1>ゲームを登録する</h1>
            <form onSubmit={handleSubmit(submit)}>
                <div className=''>
                    <dl className="write_area game_name">
                        <dt className="value_title">ゲーム名</dt>
                        <dd>
                            <input {...register('GameName', { required: 'ゲーム名は必須です' })}/>
                            <p className="_attention_msg">{errors.GameName?.message}</p> {/* エラー表示 */}
                        </dd>
                    </dl>

                    <dl className="write_area">
                        <dt className="value_title">ジャンル</dt>
                        <dd>
                            <select {...register('GameGenre', { required: 'ジャンルは必須です' })}>
                                {
                                    genres.map((genre)=>(
                                        <option value={genres[genre]}>{genre}</option>
                                        ))
                                    }
                            </select>
                        </dd>
                    </dl>

                    
                    
                    <div className="write_area">
                        {/* <ImgPreview setImage = {setImg}/> */}
                        <ImgsPreview images ={images} setImages = {setImages}/>

                    </div>
                    <button className="submit_btn">投稿</button>
                </div>
            </form>
        </section>
    )

})