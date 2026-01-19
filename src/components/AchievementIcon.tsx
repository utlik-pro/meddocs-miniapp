import React from 'react'
import { Trophy, BookOpen, Mic, Star, Award, Medal, Target, Zap } from 'lucide-react'
import type { AchievementIconType } from '@/types'

interface AchievementIconProps {
  icon: AchievementIconType
  size?: number
  className?: string
}

const iconMap = {
  trophy: Trophy,
  book: BookOpen,
  mic: Mic,
  star: Star,
  award: Award,
  medal: Medal,
  target: Target,
  zap: Zap,
}

export const AchievementIcon: React.FC<AchievementIconProps> = ({
  icon,
  size = 24,
  className = '',
}) => {
  const IconComponent = iconMap[icon] || Award

  return (
    <div className={`w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center ${className}`}>
      <IconComponent size={size} className="text-accent" />
    </div>
  )
}
