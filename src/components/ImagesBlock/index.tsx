import React, { FC } from 'react';
import IImg from '../../types/img';

import './imagesBlock.scss'
interface IProps {
    images: IImg[]
    setImages: (images: IImg[]) => void
} 

const ImagesBlock:FC<IProps> = ({
    images, setImages
}) => {

    const deleteImg = (id: string) => {
        setImages(
            images.filter(img => img.id !== id)
        )
    }

    return (
        <div className='images-block' style={images.length > 3 ? {flexWrap: 'wrap'}: {}}>
            {
                images.map((img, index) => (

                    <div 
                        className="images-block__item" 
                        style={
                            (images.length > 4 && (index == 0 || index == 1)) ? {flex: '0 1 280px'} :
                            (images.length > 3 && index !== 0) ? {flex: '0 1 186px'} : undefined 
                        }
                    >
                        <button
                            onClick={(() => deleteImg(img.id))}
                        >+</button>
                        <img src={img.img} />
                    </div>
                ))
            }
        </div>
    );
};

export default ImagesBlock;