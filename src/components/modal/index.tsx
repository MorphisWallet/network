import { useEffect } from 'react'
import cl from 'classnames'

import Portal from '../portal'

type ModalProps = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
  classNames?: string
}

const Modal = ({ isOpen, setOpen, children, classNames }: ModalProps) => {
  if (!isOpen) return null

  useEffect(() => {
    const onEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', e => onEscPress(e))

    return () => window.removeEventListener('keydown', e => onEscPress(e))
  }, [])

  return (
    <Portal>
      <div className={cl(['fixed inset-0 bg-black/50 z-[1200]', classNames])}>{children}</div>
    </Portal>
  )
}

export default Modal
