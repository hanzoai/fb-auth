import React from 'react'

interface LogoImageProps {
  url: string
  aspectRatio: number
  className?: string
  height?: number
}

const LogoImage: React.FC<LogoImageProps> = ({ 
  url, 
  aspectRatio, 
  className, 
  height
}) => {

  let style: any = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${url})`,
  }
    // Either determined by exterior styling via className
    // or specified by height 
  if (height) {
    style.height = height
    style.width = height * aspectRatio
  }
  let props: any = { style }
  return (
    <div className={className} {...props}/>
  )
}

export default LogoImage