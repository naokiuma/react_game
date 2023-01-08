import React, { useState } from 'react';
import '../../css/parts/image_preview.css';


export const ImgPreview = ({setImage,imgData}) => {

    //プレビュー用のデータ
    const [imagePreview, setImagePreview] = useState(undefined)

    const setImg = setImage;
    const img_data = imgData;
    const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

         // 何も選択されなかったら処理中断
        if (e.target.files?.length === 0) {
            return
        }
        
        // console.log('ImgPreviewでの画像');
        // console.log(files);

        if(files && files[0]) {
            let file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {

                // imagePreviewに読み込み結果（データURL）を代入する
                // imagePreviewに値を入れると<output>に画像が表示される
                setImagePreview(e.target?.result)//表示用画像
                setImg(file)//送信用画像
            };
            reader.readAsDataURL(e.target?.files[0])
        }
    }

    return (
        <div>画像ファイルを選択
            <input
                type="file"
                multiple
				accept="image/*,.png,.jpg,.jpeg,.gif"
                onChange={changeFile}/>
            <div>
                <img className="setted_img_frame" src={imagePreview} />

            </div>
        </div>
    ); 
};