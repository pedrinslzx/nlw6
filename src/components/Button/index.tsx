import { ReactNode, ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode
  icon?: string
  alt?: string
}

function Button({ children, icon, alt, ...rest }: ButtonProps) {
  return (
    <button className={styles.container} {...rest}>
      {icon && alt && <img src={icon} alt={alt} />}
      {children}
    </button>
  );
};

export default Button;
