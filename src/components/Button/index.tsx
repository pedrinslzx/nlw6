import { ReactNode, ButtonHTMLAttributes, SVGAttributes } from 'react'

import './styles.scss'

export type ButtonColor = 'danger' | 'cancel' | 'default' | 'google'

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode
  icon?: React.FunctionComponent<SVGAttributes<SVGElement>>

  alt?: string

  isOutlined?: boolean

  color?: ButtonColor
}

function Button({
  isOutlined = false,
  children,
  icon: Icon,
  color,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        'button',
        isOutlined ? 'outline' : '',
        color ? color : 'default'
      ].join(' ')}
      {...rest}
    >
      {Icon && <Icon className={'icon'} />}
      {children}
    </button>
  )
}

export { Button }

export default Button
