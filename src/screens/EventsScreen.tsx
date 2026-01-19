import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  Star,
  Ticket,
} from 'lucide-react'
import { Card, Badge, Button, Avatar, StarRating, Tag, EmptyState } from '@/components/ui'
import { demoEvents } from '@/data/mockData'
import { backButton, haptic } from '@/lib/telegram'
import type { MedEvent } from '@/types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const EventsScreen: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'registered' | 'past'>('all')
  const [selectedEvent, setSelectedEvent] = useState<MedEvent | null>(null)
  const [events, setEvents] = useState(demoEvents)

  // Handle Telegram BackButton
  useEffect(() => {
    if (selectedEvent) {
      backButton.show(() => {
        haptic.light()
        setSelectedEvent(null)
      })
    } else {
      backButton.hide()
    }

    return () => {
      backButton.hide()
    }
  }, [selectedEvent])

  const filteredEvents = events.filter(event => {
    const isPast = new Date(event.date) < new Date()
    if (filter === 'registered') return event.isRegistered && !isPast
    if (filter === 'past') return isPast
    return !isPast
  })

  const handleRegister = (eventId: string) => {
    setEvents(prev => prev.map(e =>
      e.id === eventId
        ? { ...e, isRegistered: !e.isRegistered, registeredCount: e.isRegistered ? e.registeredCount - 1 : e.registeredCount + 1 }
        : e
    ))
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(prev => prev ? { ...prev, isRegistered: !prev.isRegistered } : null)
    }
  }

  // Event Detail View
  if (selectedEvent) {
    const eventDate = new Date(selectedEvent.date)

    return (
      <div className="screen-scroll">
        {/* Hero */}
        <div className="h-32 bg-gradient-to-br from-accent/30 to-bg-card flex items-center justify-center mb-4">
          <Calendar size={48} className="text-accent" />
        </div>

        <div className="px-4">
          {/* Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {selectedEvent.tags.map(tag => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h1>
          <p className="text-accent font-medium mb-4">{selectedEvent.topic}</p>

          {/* Info Cards */}
          <div className="space-y-3 mb-6">
            <Card className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar size={20} className="text-accent" />
              </div>
              <div>
                <div className="font-medium">
                  {format(eventDate, 'd MMMM yyyy', { locale: ru })}
                </div>
                <div className="text-sm text-gray-400">
                  {format(eventDate, 'EEEE', { locale: ru })}, {selectedEvent.time}
                </div>
              </div>
            </Card>

            <Card className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin size={20} className="text-accent" />
              </div>
              <div>
                <div className="font-medium">{selectedEvent.location}</div>
                <div className="text-sm text-gray-400">{selectedEvent.city}</div>
              </div>
            </Card>

            {selectedEvent.maxParticipants && (
              <Card className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users size={20} className="text-accent" />
                </div>
                <div>
                  <div className="font-medium">
                    {selectedEvent.registeredCount} / {selectedEvent.maxParticipants}
                  </div>
                  <div className="text-sm text-gray-400">участников</div>
                </div>
              </Card>
            )}
          </div>

          {/* Speaker */}
          {selectedEvent.speakerName && (
            <Card className="mb-6">
              <h3 className="font-semibold mb-3">Спикер</h3>
              <div className="flex items-center gap-3">
                <Avatar
                  src={selectedEvent.speakerPhoto}
                  name={selectedEvent.speakerName}
                  size="md"
                />
                <div>
                  <div className="font-medium">{selectedEvent.speakerName}</div>
                </div>
              </div>
            </Card>
          )}

          {/* Description */}
          <Card className="mb-6">
            <h3 className="font-semibold mb-2">О мероприятии</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {selectedEvent.description}
            </p>
          </Card>

          {/* Rating (for past events) */}
          {selectedEvent.isAttended && selectedEvent.rating && (
            <Card className="mb-6 border border-accent/30">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Star size={18} className="text-accent" />
                Ваша оценка
              </h3>
              <StarRating rating={selectedEvent.rating} size="lg" />
            </Card>
          )}

          {/* Action Button */}
          {!selectedEvent.isAttended && (
            <div className="pb-6">
              {selectedEvent.isRegistered ? (
                <div>
                  <Button
                    fullWidth
                    variant="secondary"
                    icon={<Ticket size={18} />}
                  >
                    Показать билет
                  </Button>
                  <button
                    onClick={() => handleRegister(selectedEvent.id)}
                    className="w-full text-danger text-sm py-3 mt-2 flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Отменить регистрацию
                  </button>
                </div>
              ) : (
                <Button
                  fullWidth
                  onClick={() => handleRegister(selectedEvent.id)}
                  icon={<Ticket size={18} />}
                >
                  Зарегистрироваться
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="screen-scroll px-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white mb-1">Мероприятия</h1>
        <p className="text-gray-400 text-sm">Конференции, вебинары и мастер-классы</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all' as const, label: 'Предстоящие', icon: Calendar },
          { id: 'registered' as const, label: 'Мои билеты', icon: Ticket },
          { id: 'past' as const, label: 'Прошедшие', icon: Check },
        ].map(f => (
          <motion.button
            key={f.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2
              ${filter === f.id ? 'bg-accent text-bg' : 'bg-bg-card text-white'}
            `}
          >
            <f.icon size={14} />
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Events List */}
      <AnimatePresence mode="wait">
        {filteredEvents.length > 0 ? (
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  onClick={() => setSelectedEvent(event)}
                  highlighted={event.isRegistered}
                >
                  <div className="flex gap-3">
                    <div className="w-14 h-14 bg-accent/20 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold text-lg">
                        {format(new Date(event.date), 'd')}
                      </span>
                      <span className="text-accent text-xs">
                        {format(new Date(event.date), 'MMM', { locale: ru })}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{event.title}</h3>
                      <p className="text-sm text-accent truncate">{event.topic}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {event.city}
                        </span>
                      </div>
                    </div>
                    {event.isRegistered && !event.isAttended && (
                      <Check size={20} className="text-accent flex-shrink-0" />
                    )}
                    {event.isAttended && event.rating && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star size={14} className="text-accent fill-accent" />
                        <span className="text-accent text-sm">{event.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1 mt-3 flex-wrap">
                    {event.tags.slice(0, 3).map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={<Calendar size={48} className="text-gray-500" />}
            title="Нет мероприятий"
            description={filter === 'registered' ? 'Вы ещё не зарегистрировались' : 'Скоро появятся новые события'}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventsScreen
