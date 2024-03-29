import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faSignOutAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'

import type { NavElement } from '~/types/app'
import { type IconProp } from '@fortawesome/fontawesome-svg-core';

export const COMMON: NavElement[] = [
  {
    title: 'Contact Us',
    to: '/',
  },
]

export const GUEST: NavElement[] = [
  {
    title: 'Log in',
    to: '/login',
  },
  {
    title: 'Sign Up',
    to: '/signup',
    ext: { variant: 'contained' }
  },
]

export const LOGGEDIN: NavElement[] = [
  {
    title: 'Account',
    uiElement: <FontAwesomeIcon icon={faUserCircle as IconProp} size='1x' className='account'/>,
      subElements: [
        {
          title: 'My Account',
          to: '/account',
          uiElement: <FontAwesomeIcon icon={faAddressCard as IconProp} size='1x' className='my-account'/>
        },
        {
          title: 'Log Out',
          namedHandler: 'logout',
          uiElement: <FontAwesomeIcon icon={faSignOutAlt as IconProp} size='1x' className='logout'/>
        },
      ]
  },
]
