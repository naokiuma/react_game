import React, { useState } from 'react';

export const ImgPreview = () => {
    const [imgData, setImg] = useState(null);
    const changeFile = (e:any) => {
        const files = e.target.files;
        console.log(files[0]);
        if(files.length > 0) {

            var file = files[0]
            var reader = new FileReader()
            reader.onload = (e) => {
    
                setImg(e.target.result)
    
            };
            reader.readAsDataURL(file)
    
        } else {
    
            setImg(null)
    
        }
        // let fileReader = new FileReader();
        // fileReader.onload = () => {
        //     let canvas = document.getElementById('preview');
        //     let ctx = canvas.getContext('2d');
        //     let image = new Image();
        //     image.src = fileReader.result;
        //     image.onload = () => {
        //         canvas.width = image.width;
        //         canvas.height = image.height;
        //         ctx.drawImage(Image,0,0);


        //     }
        // }
        // fileReader.readAsDataURL(obj.files[0]);


    }
   

    return (
        <div>
            <input type="file" accept="image/*" onChange={changeFile}/>
            {/* <canvas id="preview">
                
            </canvas> */}
            <div>

                <img src={imgData} />
            </div>
        </div>
    ); 
};