import React, { useState } from 'react'
import { createPortal } from "react-dom";

import { ModalPropsType } from '../types';

const portal = document.querySelector("#portal") as HTMLElement;


const Modal = (props : ModalPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);
  
  if(!isOpen)   return (props.children(open));
  return createPortal(
    <>
      <div className="overlayed-container" onClick={() => setIsOpen(false)}></div>
      {props.content(close)}
    </>,
    portal
  );
}

export default Modal





