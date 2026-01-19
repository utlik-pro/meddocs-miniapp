// Doctor profile types
export interface Doctor {
  id: string
  firstName: string
  lastName: string
  patronymic?: string
  specialization: string
  photoUrl?: string
  rating: number
  reviewsCount: number
  city: string
  hospital?: string
  bio?: string
  interests: string[]
  achievements: Achievement[]
  xp: number
}

// Event types
export interface MedEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  city: string
  topic: string
  speakerName?: string
  speakerPhoto?: string
  maxParticipants?: number
  registeredCount: number
  isRegistered: boolean
  isAttended?: boolean
  rating?: number
  tags: string[]
}

// Course types
export interface Course {
  id: string
  title: string
  description: string
  topic: string
  duration: string
  lessonsCount: number
  completedLessons: number
  thumbnail?: string
  isLocked: boolean
  requiredXP?: number
  videoUrl?: string
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  duration: string
  order: number
  isCompleted: boolean
  videoUrl?: string
  summary?: string
}

// Achievement icon types
export type AchievementIconType = 'trophy' | 'book' | 'mic' | 'star' | 'award' | 'medal' | 'target' | 'zap'

// Achievement types
export interface Achievement {
  id: string
  title: string
  description: string
  icon: AchievementIconType
  earnedAt?: string
  xpReward: number
}

// AI Summary types
export interface AISummary {
  id: string
  eventId: string
  title: string
  content: string
  keyPoints: string[]
  generatedAt: string
  materials?: string[]
}

// Community types
export interface CommunityMember {
  id: string
  name: string
  specialization: string
  photoUrl?: string
  rating: number
  city: string
}

// Tab types
export type TabId = 'home' | 'events' | 'learn' | 'community' | 'profile'
