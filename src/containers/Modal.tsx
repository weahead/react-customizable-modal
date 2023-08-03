import React, { PropsWithChildren, useCallback } from 'react';
import { ModalPortal } from './ModalPortal';
import { Overlay } from '../components/Overlay';
import { Modal as UIModal } from '../components/UIModal';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useTrapFocus } from '../hooks/useTrapFocus';
import { useHandleKeyPress } from '../hooks/useHandleKeyPress';
interface Props {
  id: string;
  isOpen: boolean;
  role: string;
  shouldFocusAfterRender: boolean;
  onEscape: Function;
  onOverlayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  shouldReturnFocusAfterClose: boolean;
}
const ESC = 'Escape';
export const Modal: React.FC<PropsWithChildren<Props>> = ({
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
    (event: KeyboardEvent) => {
      const { code } = event;
      if (isOpen && code === ESC) {
        onEscape();
      }
    },
    [onEscape, isOpen]
  );
  useHandleKeyPress(handleOnEsc);
  useBodyScrollLock();
  const modalRef = useTrapFocus({
    focusOnRender: shouldFocusAfterRender,
    returnFocus: shouldReturnFocusAfterClose,
  });
  return isOpen ? (
    <ModalPortal id={id}>
      <Overlay onClick={onOverlayClick}>
        <UIModal role={role} ref={modalRef}>
          {children}
        </UIModal>
      </Overlay>
    </ModalPortal>
  ) : null;
};
