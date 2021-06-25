import { createContext, ReactNode, SVGAttributes, useCallback, useRef, useState } from "react";
import ReactModal from "react-modal";
import Button, { ButtonColor } from "../components/Button";

type Icon = React.FunctionComponent<SVGAttributes<SVGElement>>

interface ModalButtonType<Values> {
  key: string

  icon?: Icon
  text: string

  value: Values

  color: ButtonColor
}

interface ModalDataType<Values = boolean> {
  title: string
  description: string
  icon?: Icon

  buttons: ModalButtonType<Values>[]
}

interface ModalContextType {
  open: <Values = boolean>(data: ModalDataType<Values>) => Promise<Values | null>
  close: () => void

  opened: boolean
}


export const ModalContext = createContext({} as ModalContextType)

interface ModalProviderProps {
  children: ReactNode

  mainAppEl: HTMLElement
}

export function ModalProvider({ children, mainAppEl }: ModalProviderProps) {
  const [opened, setOpened] = useState(false)
  const value = useRef<any>(null)
  const [data, setData] = useState<Partial<ModalDataType<any>>>({})

  const Icon = data.icon

  const open = useCallback(async function open<Value = boolean>(data: ModalDataType<Value>) {
    setData(data)
    setOpened(true)

    await new Promise(resolve => window.addEventListener('modal-result', resolve, { once: true }))

    return value.current as Value
  }, [value])

  const close = useCallback(function close() {
    setOpened(false)
  }, [setOpened])

  return (
    <ModalContext.Provider value={{ open, close, opened }}>
      {children}
      <ReactModal
        onRequestClose={() => setOpened(false)}
        className={{ base: "modal", afterOpen: "open", beforeClose: "close" }}
        overlayClassName={{ base: "modal-overlay", afterOpen: "open", beforeClose: "close" }}
        portalClassName='modal-portal'
        contentLabel={data.title}
        appElement={mainAppEl}
        isOpen={opened}
        role="alertdialog"
        preventScroll
      >
        {Icon && <Icon className="icon" />}
        {data.title && <h2>{data.title}</h2>}
        {data.description && <p>{data.description}</p>}
        {data.buttons && (
          <div className="buttons">
            {data.buttons.map(button => button && (
              <Button
                key={button.key}
                color={button.color}
                icon={button.icon}
                role="button"
                onClick={() => {
                  window.dispatchEvent(new Event('modal-result'))
                  value.current = (button.value)
                  setOpened(false)
                }}
              >
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </ReactModal>
    </ModalContext.Provider>
  )
}
