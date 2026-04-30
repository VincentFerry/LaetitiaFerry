import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-accent text-bg hover:bg-[#d4b57e]',
    secondary: 'bg-transparent border border-accent text-accent hover:bg-accent hover:text-bg',
    ghost: 'bg-transparent text-text hover:text-accent'
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
