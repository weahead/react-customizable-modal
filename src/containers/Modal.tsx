import React, { useCallback, useState, useEffect } from "react";
import { ModalPortal } from "./ModalPortal";
import { Overlay } from "../components/Overlay";
import { Modal as UIModal } from "../components/UIModal";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useTrapFocus } from "../hooks/useTrapFocus";
import { useHandleKeyPress } from "../hooks/useHandleKeyPress";
interface Props {
    id: string;
    isOpen: boolean;
    role: string;
    ariaHideApp: boolean;
    shouldFocusAfterRender: boolean;
    onEscape: Function;
    onOverlayClick: Function;
    shouldReturnFocusAfterClose: boolean;
}
const ESC = 27
export const Modal: React.FC<Props> = ({
    id = 'modal-root',
    isOpen = false,
    role = "dialog",
    ariaHideApp = true,
    shouldFocusAfterRender = true,
    onOverlayClick,
    shouldReturnFocusAfterClose = true,
    onEscape,
    children
}) => {

    const handleOnEsc = useCallback(event => {
        const { keyCode } = event;
        if (isOpen && keyCode === ESC) {
            onEscape()
        }
    }, [onEscape])
    useHandleKeyPress(handleOnEsc)
    useBodyScrollLock()
    const modalRef = useTrapFocus({ focusOnRender: shouldFocusAfterRender, returnFocus: shouldReturnFocusAfterClose })
    return open ? <ModalPortal id={id}><Overlay onClick={onOverlayClick}><UIModal role={role} ref={modalRef}>{children}</UIModal></Overlay></ModalPortal> : null;
};
