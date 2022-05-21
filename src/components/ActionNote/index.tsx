import React, { FC, useState } from 'react';
import IImg from '../../types/img';
import './actionNote.scss'

type Props = {
    setModalColorOpen: (open:boolean) => void,
    modalColorOpen: boolean,
    setImages: (images:IImg[]) => void
    images: IImg[]
}



const ActionNote:FC<Props> = ({
    setModalColorOpen,
    modalColorOpen,
    setImages,
    images
}) => {
    
    const addTweetImg = (data: HTMLInputElement) => {
        const render = new FileReader();
        const file = data.files instanceof FileList
        ? render.readAsDataURL(data.files[0]) : 'handle exception'
        render.onload = (e) => {
            const id =  String( 'img' + Date.now());
            setImages([
                ...images, {id, img: String(e.target!.result) }
            ])
        }
    }

    return (
        <div className="action-note">
            <div className="action-note__wrapper">
                <button onClick={() => setModalColorOpen(!modalColorOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M512 255.1C512 256.9 511.1 257.8 511.1 258.7C511.6 295.2 478.4 319.1 441.9 319.1H344C317.5 319.1 296 341.5 296 368C296 371.4 296.4 374.7 297 377.9C299.2 388.1 303.5 397.1 307.9 407.8C313.9 421.6 320 435.3 320 449.8C320 481.7 298.4 510.5 266.6 511.8C263.1 511.9 259.5 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256V255.1zM96 255.1C78.33 255.1 64 270.3 64 287.1C64 305.7 78.33 319.1 96 319.1C113.7 319.1 128 305.7 128 287.1C128 270.3 113.7 255.1 96 255.1zM128 191.1C145.7 191.1 160 177.7 160 159.1C160 142.3 145.7 127.1 128 127.1C110.3 127.1 96 142.3 96 159.1C96 177.7 110.3 191.1 128 191.1zM256 63.1C238.3 63.1 224 78.33 224 95.1C224 113.7 238.3 127.1 256 127.1C273.7 127.1 288 113.7 288 95.1C288 78.33 273.7 63.1 256 63.1zM384 191.1C401.7 191.1 416 177.7 416 159.1C416 142.3 401.7 127.1 384 127.1C366.3 127.1 352 142.3 352 159.1C352 177.7 366.3 191.1 384 191.1z"/>
                    </svg>
                </button>

                {/* <label>
                    <input 
                        disabled={images.length > 4 ? true : false}
                        onChange={(e) => addTweetImg(e.target)} 
                        type="file" id="add-img" 
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"/>
                    </svg>
                </label> */}
                
                
            </div>
        </div>
    );
};

export default ActionNote;