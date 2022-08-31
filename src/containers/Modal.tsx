import { ModalPortal } from './ModalPortal'
import { Overlay } from '../components/Overlay'
import { Modal as UIModal } from '../components/UIModal'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useTrapFocus } from '../hooks/useTrapFocus'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

import type { PropsWithChildren } from 'react'
import { useCloseOnEsc } from '../hooks/useCloseOnEsc'

export type ModalProps = PropsWithChildren & {
  onEscape: Function
  onOverlayClick: (event: MouseEvent | TouchEvent) => void
  id?: string
  isOpen?: boolean
  role?: string
  shouldFocusAfterRender?: boolean
  shouldReturnFocusAfterClose?: boolean
}

// so not to set the overflow on body before the modal acctually mounts
// FIXES: https://github.com/weahead/react-customizable-modal/issues/4
function ModalWrapper({ children }: PropsWithChildren) {
  useBodyScrollLock()
  return <>{children}</>
}

export function Modal({
  onOverlayClick,
  onEscape,
  children,
  id = 'modal-root',
  isOpen = false,
  role = 'dialog',
  shouldFocusAfterRender = true,
  shouldReturnFocusAfterClose = true,
}: ModalProps) {
  useCloseOnEsc(() => {
    if (isOpen) {
      onEscape()
    }
  })

  const modalRef = useTrapFocus<HTMLDivElement>({
    focusOnRender: shouldFocusAfterRender,
    returnFocus: shouldReturnFocusAfterClose,
  })

  useOnClickOutside(modalRef, onOverlayClick)

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
  ) : null
}
