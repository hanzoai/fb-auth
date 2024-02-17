import React, { useState } from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import {
  IconButton,
  MenuList,
  MenuItem,
  makeStyles,
} from '@material-ui/core'

import { 
  KeyboardArrowLeft as LeftChevron,
  KeyboardArrowRight as RightChevron,
  Close as CloseIcon 
} from '@material-ui/icons'

import type { NavElement, SimpleHandler } from '~/types/app'
import { useAuthService } from '~/domain/auth'

import { 
  Link,
  LinkButton,
  PaymintoLogo,
  SideDrawer
} from '~/components'

import NAV from '~/settings/app/mainNav'
import { LOGGEDIN, GUEST } from '~/settings/app/rightNav'
import { toKebabCase } from '@hanzo/fb-auth-shared/util'

import styles from './mobileMegaMenu.style.js'
const useStyles = makeStyles(styles as any)

const MobileMegaMenu: React.FC<{
  open: boolean
  setOpen(open: boolean): void
}> = observer (({ 
  open, 
  setOpen 
}) => {

  const s = useStyles()
  const auth = useAuthService()
  const [subMenuElement, setSubMenuElement] = useState<NavElement | undefined>(undefined)

  const accountElements = (!!auth.currentFirebaseUser) ? LOGGEDIN :  GUEST

  const close = () => {setOpen(false)}

  const handlers = new Map<string, SimpleHandler>()
  handlers.set('logout', auth.logout.bind(auth))

  return (
    <SideDrawer
      open={open}
      setOpen={setOpen}
      width="100vw"
      maxWidth='500px'
      anchor="right"
      className={s.drawer}
    >
      <HeaderBar close={close}>
      {subMenuElement && (
        <SubMenuHeader element={subMenuElement} closeSubMenu={() => {setSubMenuElement(undefined)}} />
      )}
      </HeaderBar>
      {subMenuElement ? (<>
        <HeaderBar close={close} placeholder={true} >
          <SubMenuHeader element={subMenuElement} closeSubMenu={() => {setSubMenuElement(undefined)}} />
        </HeaderBar>
        <SubMenuBody element={subMenuElement} close={close} />
      </>) : (<>
        <HeaderBar close={close} placeholder={true} />
        <MenuList 
          autoFocusItem={false} 
          disablePadding 
          classes={{root: s.menuOuter}}
        >
          <MenuElements elements={NAV} handlerMap={handlers} close={close} openSubMenu={setSubMenuElement}/>
          <MenuElements elements={accountElements} handlerMap={handlers} close={close} openSubMenu={setSubMenuElement}/>
        </MenuList>
      </>)}
    </SideDrawer>
  )
})

const HeaderBar: React.FC<{
  close: SimpleHandler
  placeholder?: boolean
  children?: React.ReactNode
}> = ({
  close,
  children, 
  placeholder
}) => {
  const s = useStyles()
  if (placeholder === undefined) {
    placeholder = false 
  }

  return (
    <div className={cx(s.headerBarOuter, (placeholder) ? 'placeholder' : '')} >
      <div className={s.headerBar} >
        <PaymintoLogo className={s.logo} size='small'/>
        <IconButton onClick={close} >
          <CloseIcon className={s.closeIcon}/>
        </IconButton>
      </div>
      {children}
    </div>
  )
}

const MenuElement: React.FC<{
  element: NavElement
  openSubMenu(element: NavElement): void
  close: SimpleHandler
  handlerMap: Map<string, SimpleHandler>
}> = ({ 
  element,
  openSubMenu,
  close,
  handlerMap
}) => {

  const s = useStyles()
  const props: any = {}
  let onClick: SimpleHandler | undefined = undefined

  if (element.to) {
    props.to = element.to
    props.component = Link
  }
  else if (element.subElements) {
    onClick = () => {openSubMenu(element)}
  }
  else if (element.namedHandler) {
    const handler = handlerMap.get(element.namedHandler)
    onClick = () => { if (handler) (handler as SimpleHandler)(); close()}
  }
  else if (element.handler) {
    const handler = element.handler
    onClick = () => { (handler as SimpleHandler)(); close()}
  }
  props.onClick = (onClick) ? onClick : close

  const button = (element.ext && element.ext.variant && element.ext.variant === 'contained') 

  return button ? (
    <LinkButton 
      key={toKebabCase(element.title)}
      buttonProps={{ 
        variant: 'contained',
        size: 'large',
        className: cx(s.menuButton, 'link-button', 'button-variant-contained'),
        classes: {label: s.buttonText}
      }} 
      {...props}
    >
      {element.title}
    </LinkButton >
    ) : (
    <MenuItem 
      key={toKebabCase(element.title)}
      className={s.menuItem}
      disableGutters
      disableRipple 
      disableTouchRipple
      {...props}
    >
      <span className={s.menuItemText}>{element.title}</span>
      {element.subElements && <RightChevron className={s.menuItemRightChevron}/>}
    </MenuItem>
  )
}

const MenuElements: React.FC<{
  elements: NavElement[] 
  handlerMap: Map<string, SimpleHandler> 
  openSubMenu(element: NavElement): void
  close: SimpleHandler
}> = ({
  elements,
  handlerMap,
  openSubMenu,
  close
}) => {
  return (<>
    {elements.map((element, i) => (
    <MenuElement 
      element={element}
      handlerMap={handlerMap}
      openSubMenu={openSubMenu}
      close={close}
      key={`${toKebabCase(element.title)}-${i}`}
    />
    ))}
  </>)
}

const SubMenuHeader: React.FC<{
  element: NavElement
  closeSubMenu: SimpleHandler
}> = ({
  element,
  closeSubMenu
}) => {
  const s = useStyles()
  return (
    <div className={s.subMenuHeaderOuter} >
      <div className={s.subMenuTitleRow} >
        <IconButton onClick={closeSubMenu} className={s.closeSubmenuButton}>
          <LeftChevron className={s.menuItemLeftChevron}/>
        </IconButton>
        <h3 className={s.subMenuTitle}>{element.title}</h3>
      </div>
      {element.desc && (<p className={s.subMenuDescription}>{element.desc}</p>)}
    </div>
  )
}

const SubMenuBody: React.FC<{
  element: NavElement
  close: SimpleHandler
}> = ({
  element, 
  close
}) => {

  const s = useStyles()
  return (
    <div className={s.subMenuBody}>
    {element.subElements && element.subElements.map((section) => (<>
      <h6 className={s.subMenuSectionTitle}>{section.title}</h6>
      <ul className={s.leafList}>
      {section.subElements && section.subElements.map((leaf) => (
        <li className={s.leafListItem} key={toKebabCase(leaf.title)}>
          <Link to={leaf.to} className={s.leafLink} onClick={close}>{leaf.title}</Link>
        </li>
      ))}
      </ul>
    </>))}
    </div>
  )
}

export default MobileMegaMenu