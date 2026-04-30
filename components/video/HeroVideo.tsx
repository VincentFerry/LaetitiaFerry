'use client'

import { getVideoEmbed } from '@/lib/video-utils'

interface HeroVideoProps {
  url: string
  className?: string
}

export default function HeroVideo({ url, className = '' }: HeroVideoProps) {
  const { embedUrl, provider } = getVideoEmbed(url)

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Showreel"
        style={{
          border: 'none',
          pointerEvents: 'none'
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/80 pointer-events-none" />
    </div>
  )
}
