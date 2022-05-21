import {Editor, EditorState, convertToRaw, ContentState} from 'draft-js';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { resetTextarea } from './scripts';

import 'draft-js/dist/Draft.css';
import './style.scss'

interface TextareaProps {
  reset: boolean,
  valueDef?: string,
  setReset: Dispatch<SetStateAction<boolean>>,
  placeholder?: string,
  classes?: [string],
  getValue: (value: string) => void,
}

export const Textarea:React.FC <TextareaProps> = ({
  placeholder,
  classes,
  reset,
  valueDef = '',
  setReset,
  getValue,
}) => {
  const createState = (text: string) => {
    return EditorState.createWithContent(ContentState.createFromText(text));
  };
  const [editorState, setEditorState] = useState(createState(valueDef));

  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
  
  useEffect(() => {
    setEditorState(createState(valueDef));
  }, [valueDef]);

  useEffect(() => {
    getValue(value)
  }, [value])

  // setEditorState(valueDefauld)
  useEffect( () => {
      if(reset){
        setEditorState(resetTextarea(editorState));
        setReset(false);
      }  
  }, [reset])
  

  return (
    <div className={classes?.join(' ')}>
      <Editor placeholder={placeholder}  editorState={editorState} onChange={setEditorState} />
    </div> 
  ) 
};

export default Textarea



