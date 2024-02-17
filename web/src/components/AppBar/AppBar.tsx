import React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'

import { useAuthService } from '~/domain/auth'

import { 
  AppBarShell,
  BurgerMenuButton,
  MenuButtons,
  PaymintoLogo,
} from '~/components'

import type { 
  NavElement,
  BoundingRect, 
  ChangeHandler, 
  SimpleHandler, 
} from '~/types/app'

import ClientOrgSelector from './ClientOrgSelector'
import TestModeSwitch from './TestModeSwitch'

import { useIsMobile } from '~/util'
import MAIN_MENU from '~/settings/app/mainNav'
import { 
  COMMON as RIGHT_COMMON, 
  GUEST as RIGHT_GUEST, 
  LOGGEDIN as RIGHT_LOGGEDIN 
} from '~/settings/app/rightNav'

import styles from './appBar.style.js'
const useStyles = makeStyles(styles as any)

const AppBar: React.FC<{
  displayMegaMenu: ChangeHandler<NavElement>
  isMegaMenuElement(el: NavElement): boolean
  openMobileMenu: SimpleHandler
  className?: string
  onToolbarClick?: React.MouseEventHandler<HTMLButtonElement>
  toolbarResizeListener?: ChangeHandler<BoundingRect>
}> = observer(({
  openMobileMenu,
  displayMegaMenu,
  isMegaMenuElement,
  className,
  onToolbarClick,
  toolbarResizeListener
}) => {

  const desktop = !useIsMobile()
  const s = useStyles()
  
  const auth = useAuthService()

  const shellProps: any = {}
  if (className) {
    shellProps.headerClassName = cx(className, s.header)
  }
  if (onToolbarClick) {
    shellProps.onClick = onToolbarClick
  }
  if (toolbarResizeListener) {
    shellProps.toolbarResizeListener = toolbarResizeListener
  }
  shellProps.toolbarClassName = s.fullSizeToolbar

  const handlers = new Map<string, SimpleHandler>()
  handlers.set('logout', auth.logout.bind(auth))

  return (
    <AppBarShell {...shellProps} >
      <div className={cx(s.menuShelf, s.menuShelfTop, 'header-outermost')}>
        <div className={cx(s.menuShelfInner, 'header-inner')} >
          <div className={cx(s.menuSectionOuter, s.leftMenu)}>
            <PaymintoLogo className={s.logo} size='small' />
          </div>
          <div className={cx(s.menuSectionOuter, s.rightMenu)}>
            <MenuButtons navElements={RIGHT_COMMON} />
            {auth.currentFirebaseUser ? 
              (<MenuButtons navElements={RIGHT_LOGGEDIN} handlers={handlers}/>) 
              : 
              (<MenuButtons navElements={RIGHT_GUEST} />)
            }
          </div>          
        </div>
      </div>
      <div className={cx(s.menuShelf, s.menuShelfBottom, 'header-outermost')}>
        <div className={cx(s.menuShelfInner, 'header-inner')} >
          {auth.currentFirebaseUser && (<>
          <div className={cx(s.menuSectionOuter, s.leftMenu)}>
            <ClientOrgSelector className={s.orgSelector}/>
            <MenuButtons navElements={MAIN_MENU} />
          </div>
          <div className={cx(s.menuSectionOuter, s.rightMenu)}>
            <TestModeSwitch />
          </div>
        </>)} 
        </div>
      </div>
    </AppBarShell>
  )
})

export default AppBar

//<MenuButtons navElements={[MAIN_MENU[1]]} />
/*

    <div className={cx(s.menuSectionOuter, s.leftMenu,  className)}>
        <Link external to='https://lux.market.com' className={s.logoLink}>
          <PaymintoLogo text={APP_NAME} size={(desktop) ? 'large' : 'small'} />
        </Link>
        {desktop && currentFirebaseUser && (<>
          <ClientOrgSelector />
          <MenuButtons navElements={MAIN_MENU} />
        </>)}
      </div>
      {desktop ? (
        <div className={cx(s.menuSectionOuter, s.navMenu, s.rightMenu)}>
          <MenuButtons navElements={RIGHT_COMMON} />
          {currentFirebaseUser ? (
            <MenuButtons navElements={RIGHT_LOGGEDIN} handlers={handlers}/>
          ) : (
            <MenuButtons navElements={RIGHT_GUEST} />
          )}
        </div>
      ) : (
        <BurgerMenuButton onClick={openMobileMenu}/>
      )}
*/

// <ClientOrgSelector />