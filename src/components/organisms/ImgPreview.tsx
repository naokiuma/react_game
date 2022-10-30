import React, { useState } from 'react';

import '../../css/parts/image_preview.css';




export const ImgPreview = () => {
    const [imgData, setImg] = useState(null);
    const changeFile = (e:any) => {
        const files = e.target.files;
        console.log(files[0]);
        if(files.length > 0) {

            let file = files[0]
            let reader = new FileReader()
            reader.onload = (e) => {
                setImg(e.target.result)
            };
            reader.readAsDataURL(file)    
        } else {
            setImg(null)
        }
    }
   

    return (
        <div>
            <input type="file" accept="image/*" onChange={changeFile}/>
            <div>
                <img className="setted_img_frame" src={imgData} />
            </div>
        </div>
    ); 
};