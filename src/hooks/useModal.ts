import { useState } from "react";
import { useTrapFocus } from "./useTrapFocus";
import { useAriaHide } from "./useAriaHide";

type Props = {
  role: string;
  ariaHideApp: boolean;
  appRoot: string;
  closeTimeoutMS: number;
  shouldFocusAfterRender: boolean;
  shouldCloseOnEsc: boolean;
  shouldReturnFocusAfterClose: boolean;

}
export function useModal({ appRoot = "root", role = 'dialog', closeTimeoutMS = 0, shouldFocusAfterRender = true, shouldCloseOnEsc = true, shouldReturnFocusAfterClose = true }: Props) {
  const modalRef = useTrapFocus();
  useAriaHide(appRoot);
  return { modalRef };
}
