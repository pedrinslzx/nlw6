import { ReactNode } from 'react';
import './styles.scss';

interface QuestionProps {
  children?: ReactNode
  content: string;
  author: { name: string; photoURL: string };
}

export function Question({ content, author, children }: QuestionProps) {
  return (
    <div className={'question'}>
      <p>{content}</p>
      <footer>
        <div className={'user_info'}>
          <img src={author.photoURL} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className='buttons'>
          {children}
        </div>
      </footer>
    </div>
  );
};

