import React from 'react'
import classNames from 'classnames'

import { 
  Grid, 
  makeStyles, 
  useMediaQuery, 
  useTheme 
} from '@material-ui/core'

import type { NavElement, SimpleHandler } from '~/types/app'

import { Link } from '~/components'
import { toKebabCase } from '@hanzo/fb-auth-shared/util'

const useStyles = makeStyles((theme) => ({
  outer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  gridContainer: {
    alignItems: 'stretch',
    flexWrap: 'nowrap'
  }, 
  gridCell: {
    padding: theme.spacing(4, 3),
    '&:last-child': {
      backgroundColor: theme.palette.background.paper
    }
  },
  menuTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: 1 // to achieve top alignment w other titles.
  },
  menuDesc: {
    fontSize: '0.8rem',
    lineHeight: 1.1
  },
  sectionTitle: {
    margin: 0,
    marginBottom: theme.spacing(2),
    fontSize: '0.9rem',
    lineHeight: 1.1,
  },
  leafList: {
    '& ~ $sectionTitle': {
      marginTop: theme.spacing(2.5),
    }
  },
  leafListItem: {

  },
  leafLink: {
    fontSize: '0.8rem',
    lineHeight: 1.1,
    padding: 0,
    display: 'block',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  },
  leafDesc: {
    fontSize: '0.7rem',
    lineHeight: 1,
    margin: 0,
  }
}))

const MegaMenuView: React.FC<{
  menuElement:  NavElement | undefined
  closeMenu:    SimpleHandler
  className?:   string
  style?:       any
}> = ({ 
  menuElement,
  closeMenu,
  className,
  style,
}) => {

  const s = useStyles()
  const theme = useTheme()
  const useFourColumns = useMediaQuery(theme.breakpoints.up('lg'))

  //if (!menuElement || !menuElement.subElements || menuElement.subElements.length === 0 || menuElement.subElements.length > 4) {

  if (!menuElement || !menuElement.subElements) {
    return <></>
  }

  const renderLeaves = (
    element: NavElement, 
    numElements: number, 
    fromStart: boolean
  ): React.ReactNode[] => {

    const renderLeaf = (leaf: NavElement) => (
      <li className={s.leafListItem} key={toKebabCase(leaf.title)}>
        <Link to={leaf.to} className={s.leafLink} onClick={closeMenu}>{leaf.title}</Link>
        <p className={s.leafDesc}>{leaf.desc}</p>
      </li>
    )

    const subElements = element.subElements as NavElement[]
    return (fromStart) ? 
      subElements.slice(0, numElements).map((leaf) => (renderLeaf(leaf)))
      :
      subElements.slice(-numElements).map((leaf) => (renderLeaf(leaf)))
  }

  const renderColumn = (i: number, elements: NavElement[], firstOfSplit: boolean) => {
    const result: React.ReactNode[] = [] 

    do {
      const subElements = elements[i].subElements as NavElement[]
      let numElements = subElements.length
      const splitColumn = (elements[i].ext && elements[i].ext.twoColumns)
      if (splitColumn) {
        numElements = (subElements.length % 2 === 1 && firstOfSplit) ? Math.ceil(subElements.length / 2) : Math.floor(subElements.length / 2)
        //console.log("NUM ELEMENTS: " + numElements)
      }

      result.push(
        <React.Fragment key={i}> 
        <h6 className={s.sectionTitle}>{(!splitColumn || firstOfSplit) ? elements[i].title : <>&nbsp;</>}</h6>
        <ul className={s.leafList}>
        {renderLeaves(elements[i], numElements, (!splitColumn || firstOfSplit))}
        </ul>
        </React.Fragment>
      )
      if (!splitColumn || !firstOfSplit) {
        i++
        firstOfSplit = true
      }
      if (splitColumn && firstOfSplit) {
        firstOfSplit = false 
      }
      if (splitColumn || i >= elements.length || !elements[i].ext || !elements[i].ext.sameColumn) {
        break
      }
    } 
    while (i < elements.length)
    return {
      content: result,
      i,
      firstOfSplit
    }
  }

  const dataColumns: React.ReactNode[] = []
  let i = 0
  let firstOfSplit = true
  do {
    const result = renderColumn(i, menuElement.subElements, firstOfSplit)
    dataColumns.push(<Grid xs={4} md={4} lg={3} className={s.gridCell} key={`data-column-${i}`}>{result.content}</Grid>)
    i = result.i
    firstOfSplit = result.firstOfSplit
  } 
  while (i < menuElement.subElements.length) 

  const padColumns: React.ReactNode[] = []
  if (dataColumns.length < 3) {
    for (i = 0; i < (3 - dataColumns.length); i++) {
      padColumns.push(
        <Grid xs={4} md={4} lg={3} className={s.gridCell} key={`pad-column-${i}`}>&nbsp;</Grid>  
      )    
    }
  }

  return (
    <div className={classNames(className, s.outer)} style={style} >
      {menuElement && (
      <Grid container className={s.gridContainer}>
        {useFourColumns && dataColumns.length <= 3 && (
        <Grid xs={4} md={4} lg={3} className={s.gridCell} key='name-column'>
          <h3 className={s.menuTitle}>{menuElement.title}</h3>
          <p className={s.menuDesc}>{menuElement.desc}</p>
        </Grid>
        )}
        {(menuElement.ext && menuElement.ext.noSeparateLastColumn) ? (
          <>
          {dataColumns}
          {padColumns}
          </>
        ) : (
          <>
          {dataColumns.slice(0, -1)}
          {padColumns}
          {dataColumns.slice(-1)}
          </>
        )}
      </Grid>
      )}
    </div>
  )
}

export default MegaMenuView