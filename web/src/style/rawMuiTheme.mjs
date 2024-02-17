/**
 * NOTE: We cannot import or require ANYTHING in this file!
 * It is BOTH imported and linked by SnowPack in a React app,
 * AND dynamically imported ( via await import(<filname>) ) into a node utility running in '--harmony' mode.
 * It must also have the '*.mjs' extension
 */

import { ThemeProvider } from '@material-ui/core'

const SPACING_BASE = 8
const MAX_CONTAINER_WIDTH = 1200

const PALETTE = {
  common: {
    black: '#000',
    white: '#fff',
  },
  primary: {
    main: '#00c095', 
    dark: '#019775', 
    light: '#87d2c1', 
    /* orig KEEP
    main: '#028069',
    dark: '#066655', 
    light: '#01a486', 
    */ 
  },
  secondary: {
    dark: '#01193e', // also bg large blocks, sidebars, footer
    main: '#21076a',
    light: '#6848c4'
  },
  success: {
    //main: '#03943F',
    main: '#1a6b4d',
    light: '#cbf4c8',

  },
  error: {
    main: '#f44336',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.85)',
    secondary: 'rgba(255, 255, 255, 0.80)',
    disabled: 'rgba(0, 0, 0, 0.40)',
    hint: '#6848c4'
  },
  divider: 'rgba(0, 0, 0, 0.20)',
  background: {
    default: '#fff',
    paper: '#f6f6fa'   
  },
}

const SHAPE = {
  borderRadius: 4
}

const GREY_SHADES = [
  PALETTE.common.black,  // zero'th element, so paper elevations match indices
  '#222',
  '#333',
  '#3f3f3f',
  '#444',
  '#4f4f4f',
  '#555',
  '#5f5f5f',
  '#666',
  '#6f6f6f',
  '#777',
  '#767676',
]

const EXT = {
  spacing: SPACING_BASE,
  maxContainerWidth: MAX_CONTAINER_WIDTH,
  greys: GREY_SHADES,
  lighterText: GREY_SHADES[11],
  background: {
    dark: '#031033'
  },
  bgImageDivStyles: (url, ratio) => ({
      // ration is x / y
      // https://stackoverflow.com/questions/1495407/maintain-the-aspect-ratio-of-a-div-with-css
    backgroundImage: `url("${url}")`,
    boxSizing: 'border-box',
    width: '100%',
    paddingBottom: `${100 / ratio}%`,
    backgroundSize: 'cover',
  }),
  toolbar: {
    normal: 64,
    small: 56
  },
  radius: {
    small: '2px',
    normal: '4px',
    larger: '6px',
    large: '8px',
  },

  menuButton: {
    display: 'block',
    color: 'inherit',

    '&.button-variant-text': {
      borderRadius: '0px',
      //marginBottom: '8px',
      paddingBottom: 0,

      '&:hover': {
        backgroundColor: 'inherit',
      },
      '& > .MuiButton-label': {
      }
    },

    '&.button-variant-contained': {
      //marginBottom: '5px',
      paddingLeft: '12px',
      paddingRight: '12px',
      color: PALETTE.common.white,
      '&:hover': {
        color: PALETTE.text.secondary,
      }
    },

    '&.link-button': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      '&:hover': {
        textDecoration: 'none',
        '& *': {
          textDecoration: 'inherit',
        }
      },
    },

    paddingLeft: '6px',
    paddingRight: '6px',
    marginRight: SPACING_BASE,
    '&:last-child': {
      marginRight: 0
    },
    minWidth: '80px',

    '& .MuiButton-endIcon': {
      marginLeft: '1.5px',
    },
    '& .MuiSvgIcon-root': {
      marginRight: '-3px',
      transition: '0.5s transform ease'
    },

    '&.selected': {
      '& .MuiSvgIcon-root': {
        transform: 'rotate(180deg)'
      }
    },
  },

  menuButtonLabel: {
    width: 'auto',
    textTransform: 'capitalize',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    '.button-variant-text &': {
      borderBottom: '3.5px transparent solid',
      '&:hover': {
        borderBottom: `3.5px ${PALETTE.primary.main} solid`,
      },
    }
  }
}

export default {

    // https://uxplanet.org/responsive-design-best-practices-c6d3f5fd163b
  breakpoints: {
    values: {
      xs: 0,
      sm: 420,
      md: 780,
      lg: 1080,
      xl: 1366
    }
  },

  spacing: 8,

  palette: {
    type: 'light',
    ...PALETTE,
  },
  typography: {
    fontFamily: 'futura-pt, sans-serif',
  },
  shape: {
    ...SHAPE
  },

  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
    MuiInputLabel: {
        // display labels above the control by default
        // (no animation behavior)
      shrink: true
    },
    MuiContainer: {
      disableGutters: true
    }

  },

  overrides: {

    MuiButton: {
      root: {
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        textTransform: 'capitalize'
      },
      containedPrimary: {
        color: PALETTE.common.white,
        '&:hover': {
          color: PALETTE.text.secondary,
          backgroundColor: PALETTE.primary.light,
        }
      },
      containedSizeLarge: {
        padding: '12px 24px',
      },
      outlinedSizeLarge: {
        padding: '11px 24px', // account for border
      },
      containedSizeSmall: {
        padding: '8px 18px',
      },
      outlinedSizeSmall: {
        padding: '7px 18px', // account for border
      },

      outlined: {
        boxSizing: 'border-box',
        borderColor: 'rgba(0, 0, 0, 0.95)',
        color:  'rgba(0, 0, 0, 0.95)',
        opacity: 0.8,
        '&:hover': {
          opacity: 1,
        }
      },

      outlinedPrimary: {
        borderColor: PALETTE.primary.dark,
        color: `${PALETTE.primary.dark} !important`,
        '&:hover': {
          borderColor: PALETTE.primary.dark,
          color: `${PALETTE.primary.light} !important`,
          boxShadow:  '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 2px 0px rgb(0 0 0 / 12%)'
        },
      },
    },

    MuiIconButton: {
      root: {
        padding: 0
      } 
    },
    
    MuiInputLabel: {
      formControl: {
        position: 'static'
      },
    },

    MuiLink: {
      root: {
        paddingLeft: 0,
        paddingRight: 0,
      }
    },

    MuiFormLabel: {
      root: {
        fontSize: '1.2rem', // to somewhat match the MuiInputLabel-shrink labels
        lineHeight: '1.3rem',
        color: GREY_SHADES[7],
        '&.MuiInputLabel-shrink': {
          fontSize: '1.2rem',
          lineHeight: '1.3rem',
        },
        '&.Mui-focused': {
//          color: 'inherit'
          color: PALETTE.text.primary,
          fontWeight: 600
        },
      },
    },

    MuiInput: {
      formControl: {
        marginTop: '0 !important',
        marginBottom: '13px', // as per lineHeight + marginTop of MuiFormHelperText-root below
        '&.Mui-error': {
          marginBottom: 0,
        }
      },
      input: {
        padding: '4px 6px'
      }
    },

    MuiSelect: {
      select: {
        padding: '4px 6px'
      }
    },

    MuiMenu: {
      paper: {
        padding: '0 !important'
      }
    },

    MuiFormControl: {
      root: {
        display: 'flex', // not 'inline-flex'
        '& legend': {
          marginBottom: '3px'
        },
        '&:hover': {
          '& .MuiFormLabel-root:not(.Mui-disabled)': {
            color: PALETTE.text.primary,
            fontWeight: 600
          }  
        }
      },
    },

    MuiFormControlLabel: {
      root: {
        marginLeft: 0,
        marginRight: 0,
      },
      label: {
        fontSize: '0.8rem'
      }
    },

    MuiFormHelperText: {
      root: {
        fontSize: '11px',
        lineHeight: '12px',
        marginTop: '1px',
        textAlign: 'right'
      }
    },

    MuiContainer: {
      root: {
        // impl in style/responsivePadding.scss due to bug in MUI
      },
    },

    MuiRadio: {
      root: {
        padding: '2px',
        paddingRight: '4px',
        color: 'initial'
      }
    },

    MuiSwitch: {
      root: {
        marginTop: -5,
        marginBottom: -5,
      }
    },

    MuiPaper: {
      root: {
        padding: SPACING_BASE * 2 + 'px',
        borderRadius: SHAPE.borderRadius,
      }
    },

    MuiTableContainer: {
      root: {
        padding: 0
      }
    },

    MuiTableBody: {
      root: {
        backgroundColor: PALETTE.background.default,
      }
    },

    MuiTableRow: {
      head: {
        borderBottom: '1px solid #aaa',
      },
      root: {
        borderTop: '0.5px solid lightgrey',
        verticalAlign: 'baseline',
      },
    },

    MuiTableCell: {
      head: {
        paddingBottom: SPACING_BASE * 2 + 'px',
        fontWeight: 600,
        textTransform: 'uppercase',
      },
      root: {
        borderBottom: 'none',
        fontSize: '1rem',
      },
      footer: {
        color: PALETTE.text.primary,
        fontWeight: 600
      }
    },

    MuiTimelineItem: {
      alignLeft: {

      },
      missingOppositeContent: {
        '&:before': {
          flexGrow: 0,
          content: '""', // must use this syntax!
          paddingLeft: SPACING_BASE * 2 + 'px'
        }
      }
    },

    MuiAccordionSummary: {
      root: {
        padding: 0,
        minHeight: 0,
        '&.Mui-expanded': {
          minHeight: 0,
        }
      },
      content: {
        margin: 0,
        '&.Mui-expanded': {
          margin: 0
        }
      }
    },

    MuiAccordionDetails: {
      root: {
        padding: 0
      }
    },
  },

  ext: EXT
}

