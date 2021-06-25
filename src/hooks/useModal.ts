import { useContext } from 'react'
import { ModalContext } from '../contexts/ModalContext'

export function useModal() {
  const modalContext = useContext(ModalContext)
  return modalContext
}
