import { useState } from "react";
import { useTrapFocus } from "./useTrapFocus";
import { useAriaHide } from "./useAriaHide";
export function useModal({ appRoot }: { appRoot: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useTrapFocus();
  useAriaHide(appRoot);
  return { isOpen, modalRef, setIsOpen };
}
