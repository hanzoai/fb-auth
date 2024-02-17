import LoginForm from '@/components/LoginForm'
import type { CarteBlancheBlock, ElementBlock, EnhHeadingBlock } from '@hanzo/ui/blocks'
import Link from 'next/link'

export default {
    blockType: 'carte-blanche',
    specifiers: 'no-inner-borders center big-padding-content',
    content: [
        {blockType: 'enh-heading',
            specifiers: 'center',
            heading: {text: 'Login', level: 3}
        } as EnhHeadingBlock,
        {blockType: 'space', level: 3},
        {blockType: 'element',
            element: <LoginForm/>
        } as ElementBlock,
        {blockType: 'space', level: 0},
        {blockType: 'element',
            element: <Link href='/requestPasswordUpdate' className='self-end'>Forgot password?</Link>
        } as ElementBlock,
        {blockType: 'element',
            element: <p className='self-end'>Don't have an account? <Link href='/signup'>Join now</Link></p>
        } as ElementBlock
    ]
} as CarteBlancheBlock