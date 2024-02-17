import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'

import { toKebabCase } from '@hanzo/fb-auth-shared/util'

import type { NavElement, SimpleHandler } from '~/types/app'
import { 
  ButtonMenu,
  LinkButton,
  NavElementMenu 
} from '~/components'

import { useAuthService } from '~/domain/auth'

const useStyles = makeStyles((theme: any) => ({
  menuGroupOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    '.$rightMenu &': {
      justifyContent: 'flex-end',
    },
    '&:last-child': {
     // paddingLeft: theme.spacing(2)  
    },
    paddingRight: theme.ext.menuButton.paddingLeft 
  },
  menuButton: {
    ...theme.ext.menuButton
  },
  buttonText: {
    ...theme.ext.menuButtonLabel
  },
}))

const MenuButtons: React.FC<{
  navElements: NavElement[]
  handlers?: Map<string, SimpleHandler>
  groupClassName?: string
}>  = observer(({ 
  navElements,
  handlers,
  groupClassName
}) => {
  const s = useStyles()
  const auth = useAuthService()
  const userNameRef = useRef<{
    displayName: string
    uid: string
  } | undefined>(undefined)

  useEffect(() => {
      if (auth.currentPaymintoUser && (userNameRef.current?.uid !== auth.currentPaymintoUser!.uid)) {
        userNameRef.current = {
          displayName: `${('' + auth.currentPaymintoUser!.firstName.charAt(0)).toUpperCase()} ${auth.currentPaymintoUser!.lastName}`,  
          uid: auth.currentPaymintoUser.uid
        }
      }
      else {
        userNameRef.current = undefined  
      }
  }, [auth.currentPaymintoUser])

  return (
    <div className={cx(s.menuGroupOuter, (groupClassName) ? groupClassName : '')} >
    {navElements.map((element) => {
      const buttonVariant = 
        ((element.ext && element.ext.variant) ? element.ext.variant : 'text') as ('text' | 'outlined' | 'contained' | undefined)

      let title = ''
      if (element.title === 'Account') {
        //console.log('in account', pu)
          title = (userNameRef.current) ?  userNameRef.current.displayName : 'Account'
      } 
      title = (title) ? title : element.title 

      return (
        (!element.loggedInOnly || element.loggedInOnly && !!auth.currentFirebaseUser) && (element.subElements ? (
          <ButtonMenu
            id={toKebabCase(title)}
            text={title}
            icon={element.uiElement}
            key={toKebabCase(title)}
          >
            <NavElementMenu elements={element.subElements as NavElement[]} handlers={handlers}/>
          </ButtonMenu>
        ) : (
          <LinkButton 
            key={toKebabCase(title)}
            buttonProps={{ 
              size: 'medium',
              variant: buttonVariant,
              className: cx(s.menuButton, 'link-button', `button-variant-${buttonVariant}`),
              classes: {label: s.buttonText}
            }} 
            to={element.to}
          >
            {title}
          </LinkButton >
        )))
    })}
    </div>
  )
}) 

export default MenuButtons