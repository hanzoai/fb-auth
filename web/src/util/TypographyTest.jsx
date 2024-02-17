import React from 'react'

export default (props) => (<>

<h2>This is 2nd level heading</h2>
<h3>This is 3rd level heading</h3>
<h4>This is 4th level heading</h4>
<h5>This is 5th level heading</h5>
<h6>This is 6th level heading</h6>
<p>This is a test paragraph.</p>

<h2>Basic block level elements</h2>

<p>This is a normal paragraph (<code>p</code> element).
To add some length to it, let us mention that this page was
primarily written for testing the effect of <strong>user style sheets</strong>.
You can use it for various other purposes as well, like just checking how
your browser displays various HTML elements by default.
It can also be useful when testing conversions from HTML
format to other formats, since some elements can go wrong then.</p> 
<p>This is another paragraph. I think it needs to be added that
the set of elements tested is not exhaustive in any sense. I have selected
those elements for which it can make sense to write user style sheet rules,
in my opionion.</p>
<div>This is a <code>div</code> element. Authors may use such elements instead
of paragraph markup for various reasons. (End of <code>div</code>.)</div>
<blockquote><p>This is a block quotation containing a single
paragraph. Well, not quite, since this is not <em>really</em>
quoted text, but I hope you understand the point. After all, this
page does not use HTML markup very normally anyway.</p></blockquote>
<p>The following contains address information about the author, in an <code>address</code>
element.</p>
<address>
<a href="./" lang="en" hreflang="en">Artem Ash</a>,
</address> 

</>)
