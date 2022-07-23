import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import IImg from '../../types/img';
import './actionNote.scss'

interface Props  {
    setModalColorOpen: (open:boolean) => void;
    modalColorOpen: boolean;
    setArchive: Dispatch<SetStateAction<boolean>>;
    setModalLabels: Dispatch<SetStateAction<boolean>>;
    setImages: (images:IImg[]) => void;
    archive: boolean;
    images: IImg[];
}



const ActionNote:FC<Props> = ({
    setModalColorOpen,
    modalColorOpen,
    setModalLabels,
    setArchive,
    setImages,
    archive,
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

    const [currentArchive, setCurrentArchive] = useState<boolean>(archive)

    const handlerArchive = () => {
        setCurrentArchive(!currentArchive);
        setArchive(!currentArchive);
    } 

    useEffect(() => {
        setCurrentArchive(archive)
    }, [archive])

    return (
        <div className="action-note">
            <div className="action-note__wrapper">
                <button className='color' onClick={() => setModalColorOpen(!modalColorOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M512 255.1C512 256.9 511.1 257.8 511.1 258.7C511.6 295.2 478.4 319.1 441.9 319.1H344C317.5 319.1 296 341.5 296 368C296 371.4 296.4 374.7 297 377.9C299.2 388.1 303.5 397.1 307.9 407.8C313.9 421.6 320 435.3 320 449.8C320 481.7 298.4 510.5 266.6 511.8C263.1 511.9 259.5 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256V255.1zM96 255.1C78.33 255.1 64 270.3 64 287.1C64 305.7 78.33 319.1 96 319.1C113.7 319.1 128 305.7 128 287.1C128 270.3 113.7 255.1 96 255.1zM128 191.1C145.7 191.1 160 177.7 160 159.1C160 142.3 145.7 127.1 128 127.1C110.3 127.1 96 142.3 96 159.1C96 177.7 110.3 191.1 128 191.1zM256 63.1C238.3 63.1 224 78.33 224 95.1C224 113.7 238.3 127.1 256 127.1C273.7 127.1 288 113.7 288 95.1C288 78.33 273.7 63.1 256 63.1zM384 191.1C401.7 191.1 416 177.7 416 159.1C416 142.3 401.7 127.1 384 127.1C366.3 127.1 352 142.3 352 159.1C352 177.7 366.3 191.1 384 191.1z"/>
                    </svg>
                </button>
                
                <label>
                    <input 
                        disabled={images.length > 4 ? true : false}
                        onChange={(e) => addTweetImg(e.target)} 
                        type="file"
                        id="add-img" 
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"/>
                    </svg>
                </label>
                
                <button
                    onClick={handlerArchive}
                    className='archive'
                >
                    {
                        currentArchive ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM14 14v3h-4v-3H7l5-5 5 5h-3z"/>
                            </svg>

                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(49 46 46)" viewBox="0 0 24 24">
                                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
                            </svg>
                        )
                    }
                    
                </button>
                
                <button 
                    onClick={() => setModalLabels(prev => !prev)}
                    className="label-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L418.7 226.7C443.7 251.7 443.7 292.3 418.7 317.3L285.3 450.7C260.3 475.7 219.7 475.7 194.7 450.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5V80C0 53.49 21.49 32 48 32L48 32zM112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default React.memo(ActionNote);  