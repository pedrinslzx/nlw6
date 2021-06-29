import { ReactNode, ButtonHTMLAttributes, SVGAttributes } from 'react'

import {
  CancelButton,
  DefaultButton,
  DangerButton,
  GoogleButton
} from './styles'

export type ButtonColor = 'danger' | 'cancel' | 'default' | 'google'

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode
  icon?: React.FunctionComponent<SVGAttributes<SVGElement>>

  alt?: string

  isOutlined?: boolean

  color?: ButtonColor
}

export function Button({
  children,
  icon: Icon,
  isOutlined = false,
  color = 'default',
  ...rest
}: ButtonProps) {
  if (color === 'cancel') {
    return (
      <CancelButton className={isOutlined ? 'outlined' : ''} {...rest}>
        {Icon && <Icon className={'icon'} />}
        {children}
      </CancelButton>
    )
  } else if (color === 'google') {
    return (
      <GoogleButton className={isOutlined ? 'outlined' : ''} {...rest}>
        {Icon && <Icon className={'icon'} />}
        {children}
      </GoogleButton>
    )
  } else if (color === 'danger') {
    return (
      <DangerButton className={isOutlined ? 'outlined' : ''} {...rest}>
        {Icon && <Icon className={'icon'} />}
        {children}
      </DangerButton>
    )
  }

  return (
    <DefaultButton className={isOutlined ? 'outlined' : ''} {...rest}>
      {Icon && <Icon className={'icon'} />}
      {children}
    </DefaultButton>
  )
}
