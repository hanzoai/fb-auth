import React from 'react'
import classNames from 'classnames'

import { Button, makeStyles } from '@material-ui/core'
import { KeyboardArrowDown as DownChevron} from '@material-ui/icons'

import type { ChangeHandler, NavElement } from '~/types/app'
import type { MenuTriggerProps } from './MenuTriggerProps'

const useStyles = makeStyles((theme: any) => ({
  menuButton: {
    ...theme.ext.menuButton
  },
  buttonText: {
    ...theme.ext.menuButtonLabel
  },
}))

interface MegaMenuTriggerProps extends MenuTriggerProps {
  menuElement: NavElement
  displayMegaMenu: ChangeHandler<NavElement>
  isSelectedMenuElement(el: NavElement): boolean
}

const MegaMenuButton: React.FC<MegaMenuTriggerProps> = ({ 
  triggerClass,
  menuElement,
  displayMegaMenu,
  isSelectedMenuElement
}) => {

  const s = useStyles()
  const selected = isSelectedMenuElement(menuElement)

  return (
    <Button
      variant='text'
      color='inherit'
      className={classNames(s.menuButton, 'button-variant-text', (triggerClass) ? triggerClass : '', selected ? 'selected' : '')}
      classes={{ label: s.buttonText }}
      onClick={(e) => {e.stopPropagation(); displayMegaMenu(menuElement)}}
      endIcon={<DownChevron />}
    >
      {menuElement.title}
    </Button >
  )
}

export default MegaMenuButton