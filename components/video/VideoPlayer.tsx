'use client'

import { useEffect, useRef, useState } from 'react'
import { getVideoEmbed } from '@/lib/video-utils'

interface VideoPlayerProps {
  url: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  className?: string
  poster?: string
}

export default function VideoPlayer({
  url,
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  className = '',
  poster
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    try {
      getVideoEmbed(url)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement de la vidéo')
    }
  }, [url])

  if (error) {
    return (
      <div className="aspect-video bg-surface flex items-center justify-center">
        <p className="text-muted text-sm">{error}</p>
      </div>
    )
  }

  const { embedUrl, provider } = getVideoEmbed(url)

  // Construire l'URL avec les paramètres appropriés
  let finalUrl = embedUrl
  if (!autoplay) {
    finalUrl = finalUrl.replace('autoplay=1', 'autoplay=0')
  }
  if (!muted) {
    finalUrl = finalUrl.replace('muted=1', 'muted=0').replace('mute=1', 'mute=0')
  }
  if (!loop) {
    finalUrl = finalUrl.replace('loop=1', 'loop=0')
  }
  if (controls && provider === 'youtube') {
    finalUrl = finalUrl.replace('controls=0', 'controls=1')
  }

  return (
    <div className={`relative aspect-video bg-surface overflow-hidden ${className}`}>
      {isLoading && poster && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={finalUrl}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        title="Lecteur vidéo"
      />
    </div>
  )
}
