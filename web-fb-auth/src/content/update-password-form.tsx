import UpdatePasswordForm from '@/components/UpdatePasswordForm'
import type { CarteBlancheBlock, ElementBlock, EnhHeadingBlock } from '@hanzo/ui/blocks'

export default {
  blockType: 'carte-blanche',
  specifiers: 'no-inner-borders center big-padding-content',
  content: [
    {blockType: 'enh-heading',
      specifiers: 'center',
      heading: {text: 'Update Password', level: 3},
    } as EnhHeadingBlock,
    {blockType: 'space', level: 3},
    {blockType: 'element',
      element: <UpdatePasswordForm/>
    } as ElementBlock,
  ]
} as CarteBlancheBlock