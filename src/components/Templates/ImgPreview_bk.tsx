import React, { useState } from 'react';

import '../../css/parts/image_preview.css';




export const ImgPreview = ({setImage,imgData}) => {
    const setImg = setImage;
    const img_data = imgData;
    const changeFile = (e:any) => {
        const files = e.target.files;

        if(files && files[0]) {
            let file = files[0]
            console.log('fileです');
            console.log(files);
            
            console.log(file);

            
            let reader = new FileReader()
            reader.onload = (e) => {
                // setImg(e.target.result)
                console.log('setする画像だよ')
                console.log(file)
                setImg(file)

            };
            reader.readAsDataURL(file)
        } else {
            setImg(null)
        }
    }
   

    return (
        <div>
            <input
                type="file"
                multiple
				accept="image/*,.png,.jpg,.jpeg,.gif"
                onChange={changeFile}/>
            <div>
                <img className="setted_img_frame" src={img_data} />
            </div>
        </div>
    ); 
};