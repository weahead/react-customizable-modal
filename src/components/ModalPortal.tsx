import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface Props {
  id: string;
}

export const ModalPortal: React.FC<Props> = ({ id, children }) => {

  const domNode = useRef<HTMLElement>(getOrCreateElementById(id));
  console.log(domNode)
  useEffect(() => {

    return () => {
      // remove the div on unmount
      document.body.removeChild(domNode.current)
    };
  }, [id])
  return ReactDOM.createPortal(children, domNode.current)

};

function getOrCreateElementById(id: string): HTMLElement {
  const domNode = document.getElementById(id);
  if (domNode) {
    return domNode;
  } else {
    let element = document.createElement("div");
    element.id = id;
    document.body.appendChild(element);
    return element
  }
}