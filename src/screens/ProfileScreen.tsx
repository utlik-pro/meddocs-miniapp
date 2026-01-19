import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  MapPin,
  Star,
  Award,
  Settings,
  Edit3,
  Trophy,
  Calendar,
  BookOpen,
  ChevronRight,
  MessageCircle,
  Building2,
  Sparkles,
} from 'lucide-react'
import { Card, Badge, Avatar, Button, Progress, Tag, StarRating } from '@/components/ui'
import { AchievementIcon } from '@/components/AchievementIcon'
import { demoDoctor, demoEvents, demoCourses, demoAISummaries } from '@/data/mockData'

const ProfileScreen: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'achievements' | 'stats'>('overview')
  const doctor = demoDoctor

  // Calculate stats
  const eventsAttended = demoEvents.filter(e => e.isAttended).length
  const coursesCompleted = demoCourses.filter(c => c.completedLessons === c.lessonsCount).length
  const lessonsCompleted = demoCourses.reduce((acc, c) => acc + c.completedLessons, 0)
  const summariesReceived = demoAISummaries.length

  // XP Progress to next level
  const currentLevelXP = doctor.xp % 500
  const xpToNextLevel = 500 - currentLevelXP
  const level = Math.floor(doctor.xp / 500) + 1

  return (
    <div className="screen-scroll px-4">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        {/* Avatar with ring */}
        <div className="relative inline-block mb-4">
          <Avatar
            src={doctor.photoUrl}
            name={`${doctor.firstName} ${doctor.lastName}`}
            size="xl"
            className="ring-4 ring-accent ring-offset-4 ring-offset-bg glow-gold"
          />
          <div className="absolute -bottom-1 -right-1 bg-accent text-bg rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            {level}
          </div>
        </div>

        {/* Name & Specialization */}
        <h1 className="text-2xl font-bold text-white">
          {doctor.firstName} {doctor.lastName}
        </h1>
        <p className="text-gray-400">{doctor.patronymic}</p>
        <Badge variant="accent" className="mt-2">{doctor.specialization}</Badge>

        {/* Location & Hospital */}
        <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {doctor.city}
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent" />
            {doctor.rating} ({doctor.reviewsCount})
          </span>
        </div>
        {doctor.hospital && (
          <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
            <Building2 size={12} />
            {doctor.hospital}
          </p>
        )}
      </motion.div>

      {/* XP Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-6 glow-gold border border-accent/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-accent" />
              <span className="font-semibold">Уровень {level}</span>
            </div>
            <Badge variant="accent">{doctor.xp} XP</Badge>
          </div>
          <Progress value={currentLevelXP} max={500} />
          <p className="text-xs text-gray-400 mt-2">
            До уровня {level + 1}: ещё {xpToNextLevel} XP
          </p>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-2 mb-6"
      >
        <Card className="text-center py-3 px-1">
          <Calendar size={18} className="mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-white">{eventsAttended}</p>
          <p className="text-[10px] text-gray-400">Событий</p>
        </Card>
        <Card className="text-center py-3 px-1">
          <BookOpen size={18} className="mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-white">{lessonsCompleted}</p>
          <p className="text-[10px] text-gray-400">Уроков</p>
        </Card>
        <Card className="text-center py-3 px-1">
          <Award size={18} className="mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-white">{doctor.achievements.length}</p>
          <p className="text-[10px] text-gray-400">Наград</p>
        </Card>
        <Card className="text-center py-3 px-1">
          <Sparkles size={18} className="mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-white">{summariesReceived}</p>
          <p className="text-[10px] text-gray-400">Конспектов</p>
        </Card>
      </motion.div>

      {/* Bio */}
      {doctor.bio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <User size={16} className="text-accent" />
              О себе
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">{doctor.bio}</p>
          </Card>
        </motion.div>
      )}

      {/* Interests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="mb-6">
          <h3 className="font-semibold mb-3">Интересы</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.interests.map(interest => (
              <Tag key={interest}>{interest}</Tag>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Award size={16} className="text-accent" />
              Награды
            </h3>
            <span className="text-xs text-gray-400">{doctor.achievements.length} шт.</span>
          </div>
          <div className="space-y-3">
            {doctor.achievements.map(achievement => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 bg-bg rounded-xl"
              >
                <AchievementIcon icon={achievement.icon} size={20} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white">{achievement.title}</div>
                  <div className="text-xs text-gray-400">{achievement.description}</div>
                </div>
                <Badge variant="accent">+{achievement.xpReward} XP</Badge>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-2 pb-6"
      >
        <Card className="flex items-center gap-3 cursor-pointer card-hover">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Edit3 size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Редактировать профиль</div>
            <div className="text-xs text-gray-400">Фото, интересы, о себе</div>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </Card>

        <Card className="flex items-center gap-3 cursor-pointer card-hover">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <MessageCircle size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Поддержка</div>
            <div className="text-xs text-gray-400">Связаться с командой</div>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </Card>

        <Card className="flex items-center gap-3 cursor-pointer card-hover">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Settings size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Настройки</div>
            <div className="text-xs text-gray-400">Уведомления, язык</div>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </Card>
      </motion.div>

      {/* Version */}
      <p className="text-center text-gray-600 text-xs pb-6">
        MedDocs v1.0.0
      </p>
    </div>
  )
}

export default ProfileScreen
