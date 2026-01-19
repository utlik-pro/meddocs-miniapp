import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  BookOpen,
  Play,
  Lock,
  Check,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { Card, Badge, Button, Progress, EmptyState } from '@/components/ui'
import { demoCourses, demoAISummaries, demoDoctor } from '@/data/mockData'
import type { Course } from '@/types'

const LearnScreen: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courses, setCourses] = useState(demoCourses)
  const userXP = demoDoctor.xp

  // Course lessons (mock)
  const getLessons = (courseId: string) => [
    { id: '1', title: 'Введение в тему', duration: '15 мин', isCompleted: true },
    { id: '2', title: 'Основные понятия', duration: '20 мин', isCompleted: true },
    { id: '3', title: 'Диагностика', duration: '25 мин', isCompleted: true },
    { id: '4', title: 'Современные методы лечения', duration: '30 мин', isCompleted: false },
    { id: '5', title: 'Клинические случаи', duration: '35 мин', isCompleted: false },
    { id: '6', title: 'Тестирование', duration: '15 мин', isCompleted: false },
  ]

  const handleCompleteLesson = (courseId: string, lessonIndex: number) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, completedLessons: Math.min(c.completedLessons + 1, c.lessonsCount) }
      }
      return c
    }))
  }

  // Course Detail View
  if (selectedCourse) {
    const lessons = getLessons(selectedCourse.id)
    const progress = (selectedCourse.completedLessons / selectedCourse.lessonsCount) * 100

    return (
      <div className="screen-scroll">
        {/* Header */}
        <div className="px-4 mb-4">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-gray-400 mb-4"
          >
            <ChevronLeft size={20} />
            <span>Назад</span>
          </button>
        </div>

        {/* Course Header */}
        <div className="px-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen size={32} className="text-accent" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{selectedCourse.title}</h1>
              <Badge variant="accent" className="mt-1">{selectedCourse.topic}</Badge>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="mb-6 glow-gold">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Ваш прогресс</span>
              <span className="text-sm font-medium text-accent">
                {selectedCourse.completedLessons}/{selectedCourse.lessonsCount} уроков
              </span>
            </div>
            <Progress value={progress} max={100} />
            {progress === 100 && (
              <Badge variant="success" className="mt-3">
                <Check size={12} />
                Курс завершён!
              </Badge>
            )}
          </Card>

          {/* Description */}
          <Card className="mb-6">
            <h3 className="font-semibold mb-2">О курсе</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {selectedCourse.description}
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {selectedCourse.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={14} />
                {selectedCourse.lessonsCount} уроков
              </span>
            </div>
          </Card>

          {/* Lessons List */}
          <h2 className="text-lg font-bold mb-3">Уроки курса</h2>
          <div className="space-y-2 pb-6">
            {lessons.map((lesson, index) => {
              const isLocked = index > selectedCourse.completedLessons
              const isCompleted = index < selectedCourse.completedLessons
              const isCurrent = index === selectedCourse.completedLessons

              return (
                <Card
                  key={lesson.id}
                  onClick={() => !isLocked && handleCompleteLesson(selectedCourse.id, index)}
                  className={`flex items-center gap-3 ${isLocked ? 'opacity-50' : ''}`}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${isCompleted ? 'bg-success' : isCurrent ? 'bg-accent' : 'bg-bg-hover'}
                  `}>
                    {isCompleted ? (
                      <Check size={18} className="text-bg" />
                    ) : isLocked ? (
                      <Lock size={16} className="text-gray-500" />
                    ) : (
                      <Play size={16} className={isCurrent ? 'text-bg' : 'text-gray-400'} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${isCompleted ? 'text-gray-400' : 'text-white'}`}>
                      {lesson.title}
                    </div>
                    <div className="text-xs text-gray-500">{lesson.duration}</div>
                  </div>
                  {isCurrent && (
                    <Badge variant="accent">Продолжить</Badge>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen-scroll px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap size={28} className="text-accent" />
          <h1 className="text-2xl font-bold text-white">Обучение</h1>
        </div>
        <p className="text-gray-400 text-sm">Курсы и вебинары для профессионального развития</p>
      </div>

      {/* AI Summaries Section */}
      {demoAISummaries.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-accent" />
            AI-конспекты
          </h2>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-3">
              {demoAISummaries.map(summary => (
                <Card key={summary.id} className="flex-shrink-0 w-72 border border-accent/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
                      <Sparkles size={16} className="text-bg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{summary.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                    {summary.content}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {summary.keyPoints.slice(0, 2).map((point, i) => (
                      <Badge key={i} variant="accent" className="text-[10px]">
                        {point.slice(0, 25)}...
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Courses Section */}
      <h2 className="text-lg font-bold mb-3">Доступные курсы</h2>
      <div className="space-y-4 pb-6">
        {courses.map((course, index) => {
          const isLocked = course.isLocked && userXP < (course.requiredXP || 0)
          const progress = (course.completedLessons / course.lessonsCount) * 100

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => !isLocked && setSelectedCourse(course)}
                className={`${isLocked ? 'opacity-60' : ''}`}
              >
                {/* Thumbnail */}
                {course.thumbnail && (
                  <div className="h-32 -mx-4 -mt-4 mb-4 rounded-t-card overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {isLocked && (
                      <div className="absolute inset-0 bg-bg/80 flex items-center justify-center">
                        <div className="text-center">
                          <Lock size={24} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">
                            Требуется {course.requiredXP} XP
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    {isLocked ? (
                      <Lock size={24} className="text-gray-500" />
                    ) : (
                      <BookOpen size={24} className="text-accent" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{course.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {course.lessonsCount} уроков
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                {course.completedLessons > 0 && !isLocked && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Прогресс</span>
                      <span className="text-xs text-accent">
                        {course.completedLessons}/{course.lessonsCount}
                      </span>
                    </div>
                    <Progress value={progress} max={100} />
                  </div>
                )}

                {/* Locked Message */}
                {isLocked && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-warning">
                    <Lock size={14} />
                    <span>Наберите ещё {(course.requiredXP || 0) - userXP} XP</span>
                  </div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default LearnScreen
