export default (theme) => ({
  drawer: {
    //padding: theme.spacing(1)
  },
  
  headerBarOuter: {
    position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    borderBottom: '0.5px #ddd solid',
    '&.placeholder': {
      position: 'relative',
      visibility: 'hidden'
    }
  },

  headerBar: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },

  logo: {
    lineHeight: theme.ext.toolbar.small + 'px',
    fontSize: '28px',
    paddingLeft: theme.spacing(1),
    margin: 0,
    color: theme.palette.primary.main
  },

  closeIcon: {
    width: '30px', 
    height: '30px',
    boxSizing: 'content-box',
    paddingLeft: '5px' // more clickable surface
  },

  menuOuter: {
    padding: theme.spacing(0, 3) + ' !important',
  },

  menuButton: {
    ...theme.ext.menuButton,
    marginTop: theme.spacing(1),
    fontSize: '18px',
    height: '40px',
    lineHeight: '40px',
  },
  buttonText: {
    ...theme.ext.menuButtonLabel
  },

  menuItem: {
    color: 'inherit', 
    fontSize: '1.2rem',
    textDecoration: 'none',
    padding: theme.spacing(0.5, 0),
    //paddingRight: theme.spacing(2),
    minWidth: "0",
    whiteSpace: "nowrap",

      // shouldn't be an issue on mobile, but just in case
    '&:hover': {
      textDecoration: 'none',
    }
  },

  subMenuHeaderOuter: {
    padding: theme.spacing(1, 3),
  },

  subMenuTitleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },

  closeSubmenuButton: {
    display: 'block',
    boxSizing: 'content-box',
    padding: '0px 8px 0px 8px',
    marginLeft: '-20px',
    color: 'inherit',
    //paddingRight: '6px'
  },

  subMenuTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: 400,
    lineHeight: '100%'
  },

  subMenuDescription: {
    margin: 0,
    fontSize: '1rem',
    lineHeight: 1.2
  },

  menuItemLeftChevron: {
    width: '32px',
    height: '32px',
  },

  menuItemRightChevron: {
  },

  subMenuBody: {
//    overflowY: 'auto'
    padding: theme.spacing(1, 3),
  },

  leafList: {

  },

  leafListItem: {
  },

  leafLink: {
    display: 'block',
    lineHeight: '36px'
  },

  subMenuSectionTitle: {
    fontWeight: 500,
    marginTop: theme.spacing(3)
  },

  iconMenuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  menuItemText: {
    display: 'block',
    flexGrow: 1,

  },

  menuItemIcon: {
    display: 'block',
    flexGrow: 0,
  },

  closeItem: {
    paddingLeft: theme.spacing(1)
  },
})
