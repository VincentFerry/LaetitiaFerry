interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Loader({ size = 'md', className = '' }: LoaderProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizes[size]} border-accent border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Chargement"
      />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-bg flex items-center justify-center z-50">
      <div className="text-center">
        <Loader size="lg" />
        <p className="mt-4 text-muted label-text text-sm">Chargement...</p>
      </div>
    </div>
  )
}

export function InlineLoader({ text = 'Chargement...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader size="md" className="mr-3" />
      <span className="text-muted">{text}</span>
    </div>
  )
}
