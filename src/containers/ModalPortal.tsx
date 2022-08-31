import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import type { PropsWithChildren } from 'react'

export type ModalPortalProps = PropsWithChildren & {
  id: string
}

const isBrowser = typeof window !== 'undefined'

export const ModalPortal = ({ id, children }: ModalPortalProps) => {
  const target = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let container = document.getElementById(id)
    if (!container) {
      container = document.createElement('div')
      container.setAttribute('id', id)
      document.body.appendChild(container)
    }

    if (target.current) {
      container.appendChild(target.current)
    }

    return () => {
      if (target.current) {
        target.current.remove()
      }
      if (container && container.childNodes.length === 0) {
        container.remove()
      }
    }
  }, [id])

  if (!isBrowser) {
    return null
  }

  if (!target.current) {
    target.current = document.createElement("div");
  }
  return createPortal(children, target.current)
}
