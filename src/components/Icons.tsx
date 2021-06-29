import { ImgHTMLAttributes, useContext } from 'react'

import { ThemeContext } from '../contexts/ThemeContext'

import LogoIconDark from '../assets/images/logo/dark.svg'
import LogoIconLight from '../assets/images/logo/light.svg'

type LogoProps = ImgHTMLAttributes<HTMLImageElement>

export function Logo(props: LogoProps) {
  const theme = useContext(ThemeContext)
  if (theme.currentTheme === 'dark') {
    return <img src={LogoIconDark} alt="LetMeAsk" {...props} />
  } else {
    return <img src={LogoIconLight} alt="LetMeAsk" {...props} />
  }
}

export {
  ReactComponent as GoogleIcon,
  default as GoogleIconSrc
} from '../assets/images/google-icon.svg'

export {
  ReactComponent as HomeIllustration,
  default as HomeIllustrationSrc
} from '../assets/images/illustration.svg'

export {
  ReactComponent as EmptyQuestions,
  default as EmptyQuestionsSrc
} from '../assets/images/empty-questions.svg'

export {
  ReactComponent as LoginIcon,
  default as LoginIconSrc
} from '../assets/images/login.svg'

export {
  ReactComponent as LikeIcon,
  default as LikeIconSrc
} from '../assets/images/like.svg'

export {
  ReactComponent as DeleteModalIcon,
  default as DeleteModalIconSrc
} from '../assets/images/delete-modal.svg'

export {
  ReactComponent as DeleteIcon,
  default as DeleteIconSrc
} from '../assets/images/delete.svg'

export {
  ReactComponent as CheckIcon,
  default as CheckIconSrc
} from '../assets/images/check.svg'

export {
  ReactComponent as AnswerIcon,
  default as AnswerIconSrc
} from '../assets/images/answer.svg'

export {
  ReactComponent as CheckWhiteIcon,
  default as CheckWhiteIconSrc
} from '../assets/images/check-white.svg'

export {
  ReactComponent as CopyIcon,
  default as CopyIconSrc
} from '../assets/images/copy.svg'
