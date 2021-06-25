import { ReactNode, ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode
  icon?: React.FunctionComponent<any>
  alt?: string
}

function Button({ children, icon: Icon, alt, ...rest }: ButtonProps) {
  return (
    <button className={styles.container} {...rest}>
      {Icon && <Icon className={styles.icon} />}
      {children}
    </button>
  )
}

export default Button
