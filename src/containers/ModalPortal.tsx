import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  id: string;
}

export const ModalPortal: React.FC<Props> = ({ id, children }) => {
  const domNode = useRef<HTMLElement | null>(getOrCreateElementById(id));
  useEffect(() => {
    return () => {
      // remove the div on unmount
      const { current } = domNode;
      if (current) {
        document.body.removeChild(current);
      }
    };
  }, [id]);
  if (domNode.current) {
    return ReactDOM.createPortal(children, domNode.current);
  } else {
    return null;
  }
};

function getOrCreateElementById(id: string): HTMLElement | null {
  if (typeof window === `undefined`) {
    return null;
  }
  const domNode = document.getElementById(id);
  if (domNode) {
    return domNode;
  } else {
    let element = document.createElement('div');
    element.id = id;
    document.body.appendChild(element);
    return element;
  }
}
