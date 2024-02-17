import React, { useState, type PropsWithChildren, type MouseEventHandler } from 'react'
import classNames from 'classnames'

import { BrowserRouter as Router, useLocation } from 'react-router-dom'

import {
  Container, 
  CssBaseline, 
  makeStyles, 
  MuiThemeProvider 
} from '@material-ui/core'

import { SnackbarProvider } from 'notistack'

// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import type {
  BoundingRect, 
  ChangeHandler, 
  NavElement 
} from '~/types/app'

import {
  AppBar, 
  Footer, 
  MegaMenuView, 
  MobileMegaMenu 
} from '~/components'

import Routes, { isFullscreenRoute } from './Routes'
import { AuthServiceProvider } from '~/domain/auth'
import { ClientOrgStateProvider } from '~/domain/clientOrg'

import theme from './style/muiTheme'
import './style/main.scss'

import styles from './style/mainLayout.style.js'
const useStyles = makeStyles(styles as any)

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation()
  const [megaMenuElement, setMegaMenuElement] = useState<NavElement | undefined>(undefined)
  const [desktopMenuRect, setDesktopMenuRect] = useState<BoundingRect>({ x: -1, y: -1, width: -1, height: -1 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toolbarResizeListener = (rect: BoundingRect) => {
    setDesktopMenuRect({ x: rect.x, y: rect.height, width: rect.width, height: -1 /* ignore */ })
  }

  const displayMegaMenu: ChangeHandler<NavElement> = (el) => {
    setMegaMenuElement(el)
  }

  const isMegaMenuElement = (el: NavElement): boolean => megaMenuElement !== undefined && megaMenuElement === el

  const ModalScrim = ({ onClick, className }: {onClick: MouseEventHandler<HTMLDivElement>; className: string}) => <div className={classNames(className, 'modal-scrim')} onClick={onClick} />

  const s = useStyles()
  const fullScreenClass = isFullscreenRoute(location.pathname) ? 'fullScreenContainer' : ''
  // see style/scss-partial/_appBarAndMenu.scss
  const menuClass = megaMenuElement !== undefined ? 'mega-menu-open' : 'mega-menu-not-open'

  return (
    <div className={classNames('sass-root', s.outermost, menuClass, fullScreenClass, routeClass(location.pathname))}>
      <AppBar
        openMobileMenu={() => {
          setMobileMenuOpen(true)
        }}
        displayMegaMenu={displayMegaMenu}
        isMegaMenuElement={isMegaMenuElement}
        className={s.appBar}
        onToolbarClick={(e) => {
          e.stopPropagation()
          setMegaMenuElement(undefined)
        }}
        toolbarResizeListener={toolbarResizeListener}
      />
      <Container component='main' className={s.main}>
        {(children as NonNullable<React.ReactNode>)}
      </Container>
      <Footer className={s.footer} />
      <MegaMenuView
        menuElement={megaMenuElement}
        closeMenu={() => {
          setMegaMenuElement(undefined)
        }}
        className={classNames(s.megaMenu, 'mega-menu')}
        style={{
          left: desktopMenuRect.x,
          top: desktopMenuRect.y,
          width: desktopMenuRect.width
        }}
      />
      {megaMenuElement && (
        <ModalScrim
          onClick={(e ) => {
            e.stopPropagation()
            setMegaMenuElement(undefined)
          }}
          className={s.modalScrim}
        />
      )}
      <MobileMegaMenu
        open={mobileMenuOpen}
        setOpen={(open) => {
          setMobileMenuOpen(open)
        }}
      />
    </div>
  )
}

const App: React.FC<{}> = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <AuthServiceProvider>
    <Router>
      <ClientOrgStateProvider>
        <SnackbarProvider 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }} >
          <PageLayout>
            <Routes />
          </PageLayout>
        </SnackbarProvider>
      </ClientOrgStateProvider>
    </Router>
    </AuthServiceProvider>
  </MuiThemeProvider>
)

// 'main' container will always have a class built from the main part of the route.
// This allows for any special case styling touch ups.
const routeClass = (path: string) => {
  const pathArray = path.split('/')
  return pathArray.length > 1 ? `on-route-${pathArray[1]}` : 'main-route'
}

export default App

/* 
  <GoogleReCaptchaProvider 
    useRecaptchaNet
    reCaptchaKey="6LcpEwUaAAAAABczj053eXaEnh9hMjL8Im4wEPYk"  // TODO move to process.env
    scriptProps={{ async: true, defer: true, appendTo: 'body' }}
  >
*/
