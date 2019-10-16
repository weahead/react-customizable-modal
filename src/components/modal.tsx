import React from "react";
import { ModalPortal } from "./ModalPortal";
interface Props {
  isOpen: boolean;
  role: string;
  ariaHideApp: boolean;
  closeTimeoutMS: number;
  shouldFocusAfterRender: boolean;
  shouldCloseOnEsc: boolean;
  shouldCloseOnOverlayClick: boolean;
  shouldReturnFocusAfterClose: boolean;
}

export const Modal: React.FC<Props> = ({
  isOpen = false,
  role = "dialog",
  ariaHideApp = true,
  closeTimeoutMS = 0,
  shouldFocusAfterRender = true,
  shouldCloseOnEsc = true,
  shouldCloseOnOverlayClick = true,
  shouldReturnFocusAfterClose = true,
  children
}) => {
  return <ModalPortal id={`modal-root`}>{children}</ModalPortal>;
};
