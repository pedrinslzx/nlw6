import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Container, Icon, Text } from './styles'

import { CheckIcon, CopyIcon } from '../Icons'

interface RoomCodeProps {
  code: string
}

export function RoomCode({ code }: RoomCodeProps) {
  const [copy, setCopy] = useState(false)

  const copyRoomCode = useCallback(
    async function copyRoomCode() {
      if (!navigator.clipboard) return
      try {
        await navigator.clipboard.writeText(code)
        setCopy(true)
        toast.success('O código da sala foi copiado')
        setTimeout(() => setCopy(false), 1000)
      } catch {
        toast.error('Erro ao copiar o código da sala')
      }
    },
    [code]
  )
  return (
    <Container onClick={copyRoomCode}>
      <Icon>{copy ? <CheckIcon /> : <CopyIcon />}</Icon>
      <Text>#{code}</Text>
    </Container>
  )
}
