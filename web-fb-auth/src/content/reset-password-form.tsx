import ResetPasswordForm from '@/components/ResetPasswordForm'
import type { CarteBlancheBlock, ElementBlock, EnhHeadingBlock } from '@hanzo/ui/blocks'

export default {
  blockType: 'carte-blanche',
  specifiers: 'no-inner-borders center big-padding-content',
  content: [
    {blockType: 'enh-heading',
      specifiers: 'center',
      heading: {text: 'Reset Password', level: 3, mb: 4},
      byline: {text: 'Please enter the email associated with your account. A password update link will be sent there.', level: 0}
    } as EnhHeadingBlock,
    {blockType: 'space', level: 3},
    {blockType: 'element',
      element: <ResetPasswordForm/>
    } as ElementBlock,
  ]
} as CarteBlancheBlock