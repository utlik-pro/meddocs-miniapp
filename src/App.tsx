import React, { useState, Suspense, lazy, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { initTelegram, backButton, haptic } from '@/lib/telegram'
import type { TabId } from '@/types'

// Lazy load screens for better performance
const HomeScreen = lazy(() => import('@/screens/HomeScreen'))
const EventsScreen = lazy(() => import('@/screens/EventsScreen'))
const LearnScreen = lazy(() => import('@/screens/LearnScreen'))
const CommunityScreen = lazy(() => import('@/screens/CommunityScreen'))
const ProfileScreen = lazy(() => import('@/screens/ProfileScreen'))

// Loading component
const ScreenLoader: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
)

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home')

  // Initialize Telegram WebApp on mount
  useEffect(() => {
    initTelegram()
  }, [])

  // Handle tab change with haptic feedback
  const handleTabChange = (tab: TabId) => {
    haptic.selection()
    setActiveTab(tab)
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={handleTabChange} />
      case 'events':
        return <EventsScreen />
      case 'learn':
        return <LearnScreen />
      case 'community':
        return <CommunityScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <HomeScreen onNavigate={handleTabChange} />
    }
  }

  return (
    <div className="h-full bg-bg flex flex-col">
      {/* Spacer for Telegram header */}
      <div className="flex-shrink-0" style={{ height: '100px' }} />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Suspense fallback={<ScreenLoader />}>
          {renderScreen()}
        </Suspense>
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

export default App
