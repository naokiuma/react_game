
import { memo,useState,useEffect } from "react";
import { useForm } from 'react-hook-form';
import {ImgPreview} from "components/commons/ImgPreview"

import genres from 'utils/game_genre'


//インフラ
import {createGame} from "infrastructure/gameDriver";
import {GetCategory} from "infrastructure/categoryDriver";

//Form用の情報
type GameFormInputs = {
    name:string;
    genre:string;
	imgData?:File[];
};


export const GameRegist = memo(() => {

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
    } = useForm<GameFormInputs>({
    });

    //画像のみ別途用意
    const [images, setImages] = useState<File[]>([]);

    const submit = async (data:GameFormInputs) => {
        let result = await createGame(data.name,data.genre,['1','2'],images)
		console.log('ゲームを登録！')
		console.log(result);
    }

    return (
        <section className="form_wrap game_form">
            <h1>ゲームを登録する</h1>
            <form onSubmit={handleSubmit(submit)}>
                <div className=''>
                    <dl className="write_area game_name">
                        <dt className="value_title">ゲーム名</dt>
                        <dd>
                            <input {...register('name', { required: 'ゲーム名は必須です' })}/>
                            <p className="_attention_msg">{errors.name?.message}</p> {/* エラー表示 */}
                        </dd>
                    </dl>

                    <dl className="write_area">
                        <dt className="value_title">ジャンル</dt>
                        <dd>
                            <select {...register('genre', { required: 'ジャンルは必須です' })}>
                                {
                                    genres.map((genre)=>(
                                        <option value={genres[genre]}>{genre}</option>
                                        ))
                                    }
                            </select>
                        </dd>
                    </dl>

                    <div className="write_area">
                        <ImgPreview images ={images} setImages = {setImages}/>
                    </div>
                    <button className="submit_btn">投稿</button>
                </div>
            </form>
        </section>
    )

})