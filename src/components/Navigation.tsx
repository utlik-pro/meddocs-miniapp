import React from 'react'
import { motion } from 'framer-motion'
import { Home, Calendar, GraduationCap, Users, User } from 'lucide-react'
import type { TabId } from '@/types'

interface NavigationProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: { id: TabId; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Главная' },
  { id: 'events', icon: Calendar, label: 'События' },
  { id: 'learn', icon: GraduationCap, label: 'Обучение' },
  { id: 'community', icon: Users, label: 'Врачи' },
  { id: 'profile', icon: User, label: 'Профиль' },
]

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg border-t border-bg-card z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const IconComponent = tab.icon

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 px-3 py-2 relative"
            >
              <div className="relative">
                <IconComponent
                  size={22}
                  className={`transition-all duration-200 ${
                    isActive ? 'text-accent' : 'text-gray-500'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-semibold transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
