import { ReactNode } from 'react'

import { cx } from '../../services/utils'
import { Container } from './styles'

interface QuestionProps {
  children?: ReactNode
  content: string

  isHighlighted?: boolean
  isAnswered?: boolean

  author: { name: string; photoURL: string }
}

export function Question({
  content,
  author,
  children,
  isHighlighted = false,
  isAnswered = false
}: QuestionProps) {
  return (
    <Container
      className={cx('question', {
        answered: isAnswered,
        highlighted: isHighlighted && !isAnswered
      })}
    >
      <p>{content}</p>
      <footer>
        <div className={'user_info'}>
          <img src={author.photoURL} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="buttons">{children}</div>
      </footer>
    </Container>
  )
}
