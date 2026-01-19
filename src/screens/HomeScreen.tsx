import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, GraduationCap, Sparkles, ChevronRight, Star, MapPin, Clock, BookOpen } from 'lucide-react'
import { Card, Badge, Avatar, Progress, Button } from '@/components/ui'
import { AchievementIcon } from '@/components/AchievementIcon'
import { demoDoctor, demoEvents, demoCourses, demoAISummaries } from '@/data/mockData'
import type { TabId } from '@/types'

interface HomeScreenProps {
  onNavigate: (tab: TabId) => void
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const doctor = demoDoctor
  const nextEvent = demoEvents.find(e => !e.isAttended)
  const activeCourse = demoCourses.find(c => c.completedLessons > 0 && c.completedLessons < c.lessonsCount)
  const latestSummary = demoAISummaries[0]

  return (
    <div className="screen-scroll px-4">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-4">
          <Avatar src={doctor.photoUrl} name={`${doctor.firstName} ${doctor.lastName}`} size="lg" />
          <div>
            <p className="text-gray-400 text-sm">Добро пожаловать,</p>
            <h1 className="text-xl font-bold text-white">{doctor.firstName} {doctor.lastName}</h1>
            <p className="text-accent text-sm">{doctor.specialization}</p>
          </div>
        </div>
      </motion.div>

      {/* XP Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-4 glow-gold">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="text-accent" size={18} />
              <span className="font-semibold">Ваш уровень</span>
            </div>
            <Badge variant="accent">{doctor.xp} XP</Badge>
          </div>
          <Progress value={doctor.xp % 500} max={500} />
          <p className="text-xs text-gray-400 mt-2">
            До следующего уровня: {500 - (doctor.xp % 500)} XP
          </p>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-accent">{doctor.achievements.length}</p>
          <p className="text-xs text-gray-400">Награды</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-accent">
            {demoEvents.filter(e => e.isAttended).length}
          </p>
          <p className="text-xs text-gray-400">Событий</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-accent">
            {demoCourses.reduce((acc, c) => acc + c.completedLessons, 0)}
          </p>
          <p className="text-xs text-gray-400">Уроков</p>
        </Card>
      </motion.div>

      {/* Next Event */}
      {nextEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calendar size={20} className="text-accent" />
              Ближайшее событие
            </h2>
            <button
              onClick={() => onNavigate('events')}
              className="text-accent text-sm flex items-center gap-1"
            >
              Все <ChevronRight size={16} />
            </button>
          </div>

          <Card onClick={() => onNavigate('events')} highlighted={nextEvent.isRegistered}>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar size={24} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{nextEvent.title}</h3>
                <p className="text-sm text-accent mb-1">{nextEvent.topic}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(nextEvent.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} • {nextEvent.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {nextEvent.city}
                  </span>
                </div>
              </div>
            </div>
            {nextEvent.isRegistered && (
              <Badge variant="success" className="mt-3">Вы зарегистрированы</Badge>
            )}
          </Card>
        </motion.div>
      )}

      {/* Continue Learning */}
      {activeCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <GraduationCap size={20} className="text-accent" />
              Продолжить обучение
            </h2>
            <button
              onClick={() => onNavigate('learn')}
              className="text-accent text-sm flex items-center gap-1"
            >
              Все <ChevronRight size={16} />
            </button>
          </div>

          <Card onClick={() => onNavigate('learn')}>
            <div className="flex gap-3 mb-3">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={24} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{activeCourse.title}</h3>
                <p className="text-sm text-gray-400">{activeCourse.topic}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Прогресс</span>
              <span className="text-xs text-accent">
                {activeCourse.completedLessons}/{activeCourse.lessonsCount} уроков
              </span>
            </div>
            <Progress
              value={activeCourse.completedLessons}
              max={activeCourse.lessonsCount}
            />
          </Card>
        </motion.div>
      )}

      {/* AI Summary */}
      {latestSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Sparkles size={20} className="text-accent" />
              AI-конспект
            </h2>
          </div>

          <Card className="border border-accent/30">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-bg" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{latestSummary.title}</h3>
                <p className="text-xs text-gray-400">
                  {new Date(latestSummary.generatedAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">
              {latestSummary.content}
            </p>
            <div className="flex flex-wrap gap-1">
              {latestSummary.keyPoints.slice(0, 3).map((point, i) => (
                <Badge key={i} variant="accent" className="text-[10px]">
                  {point.slice(0, 30)}...
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Achievements Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Последние награды</h2>
          <button
            onClick={() => onNavigate('profile')}
            className="text-accent text-sm flex items-center gap-1"
          >
            Все <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {doctor.achievements.slice(0, 3).map((achievement) => (
            <Card key={achievement.id} className="flex-shrink-0 w-28 text-center py-4">
              <div className="flex justify-center mb-2">
                <AchievementIcon icon={achievement.icon} size={18} />
              </div>
              <p className="text-xs font-medium text-white truncate">{achievement.title}</p>
              <Badge variant="accent" className="mt-1 text-[10px]">+{achievement.xpReward} XP</Badge>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default HomeScreen
