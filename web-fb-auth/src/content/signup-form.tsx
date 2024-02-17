import SignupForm from '@/components/SignupForm'
import type { CarteBlancheBlock, ElementBlock, EnhHeadingBlock } from '@hanzo/ui/blocks'
import Link from 'next/link'

export default {
  blockType: 'carte-blanche',
  specifiers: 'no-inner-borders center big-padding-content',
  content: [
    {blockType: 'enh-heading',
      specifiers: 'center',
      heading: {text: 'Create an account', level: 3}
    } as EnhHeadingBlock,
    {blockType: 'space', level: 3},
    {blockType: 'element',
      element: <SignupForm/>
    } as ElementBlock,
    {blockType: 'space', level: 0},
    {blockType: 'element',
      element: <p className='self-end'>Already have an account? <Link href='/login'>Log In</Link></p>
    } as ElementBlock
  ]
} as CarteBlancheBlock