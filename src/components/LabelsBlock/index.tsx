import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import { PutLabel } from '../../store/action-creators/label';
import { ILabel } from '../../store/reducer/LabelReducer/type';
import { useTypeSelector } from '../../hooks/useTypeSelector';

import './labelBlock.scss'

interface IProps {
    noteId: string
}

const LabelsBlock:FC<IProps> = ({
    noteId
}) => {

    const dispatch = useDispatch<any>();

    const labels = useTypeSelector(state => state.label);

    const removeLabel = (label: ILabel) => {
        dispatch(PutLabel({
            id: label.id,
            title: label.title,
            notes: label.notes.filter(id => id !== noteId)
        }))
    }

    const sortLabels = ():ILabel[] => {
        const res:ILabel[] = [];
        labels.data.forEach(label => {
            if(label.notes.find(id => id === noteId)){
                res.push(label)

            };
        })
        return res
    }
    return (
        <div className='labels-block'>{
            sortLabels().map(label => (
                <div key={label.id}>
                    <span>{label.title}</span>
                    <button
                        onClick={() => removeLabel(label)}
                    >
                        <svg style={{transform: 'rotate(45deg)'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path>
                        </svg>
                    </button>
                </div>
            ))
        }</div>
    );
};

export default React.memo(LabelsBlock);