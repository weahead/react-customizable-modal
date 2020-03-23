import React, { useCallback } from 'react';
import { ModalPortal } from './ModalPortal';
import { Overlay } from '../components/Overlay';
import { Modal as UIModal } from '../components/UIModal';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useTrapFocus } from '../hooks/useTrapFocus';
import { useHandleKeyPress } from '../hooks/useHandleKeyPress';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
interface Props {
  id: string;
  isOpen: boolean;
  role: string;
  shouldFocusAfterRender: boolean;
  onEscape: Function;
  onOverlayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  shouldReturnFocusAfterClose: boolean;
}
const ESC = 27;
export const Modal: React.FC<Props> = ({
  id = 'modal-root',
  isOpen = false,
  role = 'dialog',
  shouldFocusAfterRender = true,
  onOverlayClick,
  shouldReturnFocusAfterClose = true,
  onEscape,
  children,
}) => {
  //TODO: use useCloseOnEsc
  const handleOnEsc = useCallback(
    event => {
      const { keyCode } = event;
      if (isOpen && keyCode === ESC) {
        onEscape();
      }
    },
    [isOpen, onEscape]
  );
  useHandleKeyPress(handleOnEsc);
  useBodyScrollLock();
  const modalRef = useTrapFocus({
    focusOnRender: shouldFocusAfterRender,
    returnFocus: shouldReturnFocusAfterClose,
  });
  useOnClickOutside(modalRef, onOverlayClick);
  return isOpen ? (
    <ModalPortal id={id}>
      <Overlay>
        <UIModal role={role} ref={modalRef}>
          {children}
        </UIModal>
      </Overlay>
    </ModalPortal>
  ) : null;
};
