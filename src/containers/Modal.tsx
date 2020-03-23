import React, { useCallback } from 'react';
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
  const modalRef = useTrapFocus({
    focusOnRender: shouldFocusAfterRender,
    returnFocus: shouldReturnFocusAfterClose,
  });
  return isOpen ? (
    <ModalPortal id={id}>
      <ModalWrapper>
        <Overlay onClick={onOverlayClick}>
          <UIModal role={role} ref={modalRef}>
            {children}
          </UIModal>
        </Overlay>
      </ModalWrapper>
    </ModalPortal>
  ) : null;
};
// so not to set the overflow on body before the modal acctually mounts
// FIXES: https://github.com/weahead/react-customizable-modal/issues/4
const ModalWrapper: React.FC<{}> = props => {
  useBodyScrollLock();
  return <>{props.children}</>;
};
