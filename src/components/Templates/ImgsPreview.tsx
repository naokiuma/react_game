import  { useState,FC } from 'react';
import '../../css/parts/image_preview.css';


export const ImgsPreview = ({images,setImages}) => {
    //プレビュー用のデータ
    const [imagePreviews, setImagePreview] = useState([])
    const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        // 何も選択されなかったら処理中断
        if (e.target.files.length === 0) {
            return
        }

        const files = e.target.files;
        console.log(files.length);
        console.log(files);

        // setImages([...images, files]);

        for(let i = 0; i < files.length; i++){
            let target = files[i];
            const reader = new FileReader()

            reader.onload = (e) => {
                // imagePreviewに読み込み結果（データURL）を代入する
                // imagePreviewに値を入れると<output>に画像が表示される

                console.log('最終画像の中身')
                console.log(imagePreviews)

                // setImagePreview([...imagePreviews,e.target?.result])//表示用画像
                setImagePreview(
                    (previmgs)=>[...previmgs,e.target?.result]
                )//表示用画像

                setImages(
                    (prev)=>[...prev,target]
                );
            };
            reader.readAsDataURL(e.target?.files[i])
           
        }
    }


    return (
        <div>画像ファイルを選択
            <input
                type="file"
                multiple
				accept="image/*,.png,.jpg,.jpeg,.gif"
                onChange={changeFile}
            />

            {imagePreviews.length > 0 ?
             (
                 <div className='img_previews'>
                    {imagePreviews.map((_each_img)=>(
                        <img className="setted_img_frame" src={_each_img} />
                    )
                    )}
                </div>
            ) : (
                <></>
            )}

        </div>
    ); 
};