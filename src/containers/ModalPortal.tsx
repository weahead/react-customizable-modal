import { useEffect, useState, type ReactNode, type ReactPortal } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  id: string;
  children: ReactNode;
}

export const ModalPortal = ({ children, id }: Props): ReactPortal | null => {
  const [domNode, setDomNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Prevent execution in non-browser environments (e.g., during SSR)
    if (typeof window === 'undefined') return;

    let element = document.getElementById(id);

    if (!element) {
      element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
    }

    setDomNode(element);

    return () => {
      if (element) document.body.removeChild(element);
    };
  }, [id]);

  // Ensure safe rendering: Avoid rendering in SSR or if the DOM node hasn't been set yet
  if (typeof window === 'undefined' || !domNode) return null;

  return ReactDOM.createPortal(children, domNode);
};
