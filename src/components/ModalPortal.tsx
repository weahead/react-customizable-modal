import React from "react";
import ReactDOM from "react-dom";

interface Props {
  id: string;
}

export const ModalPortal: React.FC<Props> = ({ id, children }) => {
  const domNode = document.getElementById(id);
  if (domNode) {
    return ReactDOM.createPortal(children, domNode);
  }
  // there is no domnode with the id passed in
  let element = document.createElement("div");
  element.id = id;
  document.body.appendChild(element);
  return ReactDOM.createPortal(children, element);
};
