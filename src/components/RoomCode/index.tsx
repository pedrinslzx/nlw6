import { useCallback, useState } from 'react'
import { ReactComponent as CopyImage } from '../../assets/images/copy.svg'
import { ReactComponent as CheckImage } from '../../assets/images/check-white.svg'

import styles from './styles.module.scss'
import { toast } from 'react-toastify'

interface RoomCodeProps {
  code: string
}

function RoomCode({ code }: RoomCodeProps) {
  const [copy, setCopy] = useState(false)

  const copyRoomCode = useCallback(
    async function copyRoomCode() {
      if (!navigator.clipboard) return
      try {
        await navigator.clipboard.writeText(code)
        setCopy(true)
        toast('O codigo da sala foi copiado', { type: 'success' })
        setTimeout(() => setCopy(false), 1000)
      } catch {
        toast('Erro ao copiar o código da sala', { type: 'error' })
      }
    },
    [code]
  )
  return (
    <button className={styles.container} onClick={copyRoomCode}>
      <div className={styles.icon}>{copy ? <CheckImage /> : <CopyImage />}</div>
      <span className={styles.text}>#{code}</span>
    </button>
  )
}

export default RoomCode
