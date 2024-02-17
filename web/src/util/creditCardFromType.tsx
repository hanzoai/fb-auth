import React, { type ReactElement } from 'react' 
import classNames from 'classnames'

import { PaymentRounded } from '@material-ui/icons'

export interface ImageDesc {
  url: string,
  alt: string
}

const cardMap = new Map<string, ImageDesc>([
  ['visa', { 
    url: '../../assets/images/cc-images/VisaCard.svg',
    alt: 'Visa'
  }],
  ['mastercard', { 
    url: '../../assets/images/cc-images/MasterCard.svg',
    alt: 'MasterCard'
  }],
  ['discover', { 
    url: '../../assets/images/cc-images/DiscoverCard.svg',
    alt: 'Discover Card'
  }],
  ['amex', { 
    url: '../../assets/images/cc-images/AmexCard.svg',
    alt: 'American Express Card'
  }],
])

export const renderDefaultCCImage = (
  color?: 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | undefined,
  className?: string
): ReactElement => {
  
  return <PaymentRounded color={color ? color : 'primary'} className={classNames('cc-default-image', (className) ? className : '' )} />
}

export default cardMap.get.bind(cardMap)