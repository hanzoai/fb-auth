import React from 'react'

import { useTheme } from '@material-ui/core'
import { RotateLeft } from '@material-ui/icons'

import TagBubble from './TagBubble'

const RefundTagBubble: React.FC<{ 
  onClick?(code: string): void
}> = ({ 
  onClick 
}) => {
  const theme = useTheme()

  const desc: any = {
    code: 'refunded',
    text: 'Refunded',
    Icon: RotateLeft,
    textColor: 'white',
    bgColor: theme.palette.secondary.light
  }
  if (onClick) {
    desc.onClick = onClick
  }
  return <TagBubble {...desc}/>
}

export default RefundTagBubble