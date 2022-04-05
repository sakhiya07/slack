import React from 'react'
import { createPortal } from "react-dom";

import {ModalPropsType} from '../types'

const portal = document.querySelector("#portal") as HTMLElement;

const Modal = (props: ModalPropsType) => {
  if(!props.isOpen)  return null;
  return createPortal(
    <>
      <div className="overlayed-container" onClick={props.onRequestClose}></div>
      {props.children}
    </>,
    portal
  );
}

export default Modal;