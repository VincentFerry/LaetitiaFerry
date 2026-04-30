export interface VideoEmbed {
  provider: 'youtube' | 'vimeo'
  videoId: string
  embedUrl: string
  thumbnailUrl: string
}

export function getVideoEmbed(url: string): VideoEmbed {
  // YouTube : youtube.com/watch?v=ID ou youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    const videoId = ytMatch[1]
    return {
      provider: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
  }

  // Vimeo : vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    const videoId = vimeoMatch[1]
    return {
      provider: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0`,
      thumbnailUrl: '' // À récupérer via oEmbed API si nécessaire
    }
  }

  throw new Error('URL vidéo non reconnue. Formats supportés : YouTube (youtube.com/watch?v=... ou youtu.be/...) et Vimeo (vimeo.com/...)')
}

export function isValidVideoUrl(url: string): boolean {
  try {
    getVideoEmbed(url)
    return true
  } catch {
    return false
  }
}

export function getVideoProvider(url: string): 'youtube' | 'vimeo' | null {
  try {
    const { provider } = getVideoEmbed(url)
    return provider
  } catch {
    return null
  }
}
