import React from 'react'
import { motion } from 'framer-motion'

// Card Component
interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  highlighted?: boolean
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, highlighted }) => {
  const baseClasses = `bg-bg-card rounded-card p-4 ${highlighted ? 'border-2 border-accent' : ''}`

  if (onClick) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`${baseClasses} cursor-pointer card-hover ${className}`}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={`${baseClasses} ${className}`}>{children}</div>
}

// Button Component
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  className = '',
}) => {
  const baseClasses = 'font-semibold rounded-button flex items-center justify-center gap-2 transition-all'

  const variants = {
    primary: 'bg-accent text-bg hover:bg-accent-dark',
    secondary: 'bg-bg-card text-white hover:bg-bg-hover border border-gray-700',
    danger: 'bg-danger text-white hover:bg-red-600',
    ghost: 'bg-transparent text-accent hover:bg-accent/10',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {icon}
      {children}
    </motion.button>
  )
}

// Badge Component
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-bg-hover text-gray-300',
    accent: 'bg-accent/20 text-accent',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-danger/20 text-danger',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Avatar Component
interface AvatarProps {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  }

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-accent/20 text-accent flex items-center justify-center font-semibold ${className}`}>
      {initials}
    </div>
  )
}

// Progress Component
interface ProgressProps {
  value: number
  max?: number
  className?: string
}

export const Progress: React.FC<ProgressProps> = ({ value, max = 100, className = '' }) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={`h-2 bg-bg-hover rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-full bg-accent rounded-full"
      />
    </div>
  )
}

// Star Rating Component
interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  interactive?: boolean
  onChange?: (rating: number) => void
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onChange,
}) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, i) => (
        <motion.button
          key={i}
          whileTap={interactive ? { scale: 0.8 } : undefined}
          onClick={() => interactive && onChange?.(i + 1)}
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <svg
            className={`${sizes[size]} ${i < rating ? 'text-accent fill-accent' : 'text-gray-600 fill-gray-600'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </motion.button>
      ))}
      {showValue && (
        <span className="ml-1 text-sm text-gray-400">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}

// Tag Component
interface TagProps {
  children: React.ReactNode
  className?: string
}

export const Tag: React.FC<TagProps> = ({ children, className = '' }) => {
  return (
    <span className={`inline-block px-2 py-1 bg-bg-hover text-gray-300 rounded-lg text-xs ${className}`}>
      {children}
    </span>
  )
}

// Empty State Component
interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-gray-500">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-300 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  )
}

// Skeleton Component
interface SkeletonProps {
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-bg-card rounded-card ${className}`} />
  )
}

// Section Header Component
interface SectionHeaderProps {
  title: string
  action?: React.ReactNode
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action, className = '' }) => {
  return (
    <div className={`flex items-center justify-between mb-3 ${className}`}>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      {action}
    </div>
  )
}
