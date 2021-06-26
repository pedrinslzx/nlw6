import { SVGAttributes } from 'react'

import { ReactComponent as LikeIconSVG } from '../../assets/images/like.svg'

interface LikeIconProps extends SVGAttributes<SVGElement> {
  color?: string
}

export function LikeIcon({ color = '#737380', ...props }: LikeIconProps) {
  return <LikeIconSVG {...props} color={color} />
}
