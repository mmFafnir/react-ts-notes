import React, { ReactNode, FC } from "react";
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import "./style.scss";

const SCROLL_BOX_MIN_HEIGHT = '300px';

interface IProps {
  children: ReactNode,
  className?: string,
  maxHeight?: string
}

const Scrollbar:FC<IProps> =({ children, className ='', maxHeight=SCROLL_BOX_MIN_HEIGHT }) => {
  
  return (
    <div className="scrollbar">
      {/* // ts-ignore */}
      <SimpleBar style={{maxHeight: maxHeight}}>
        {children}
      </SimpleBar>
    </div>
  );
}

export default Scrollbar