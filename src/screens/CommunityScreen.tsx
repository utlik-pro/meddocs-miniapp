import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Star,
  MapPin,
  MessageCircle,
  Filter,
  Trophy,
  Crown,
} from 'lucide-react'
import { Card, Badge, Avatar, Button, EmptyState } from '@/components/ui'
import { demoCommunityMembers, demoDoctor } from '@/data/mockData'

const CommunityScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null)

  const specializations = ['Все', 'Гастроэнтеролог', 'Терапевт', 'Эндоскопист']

  // Add current user to the list for leaderboard
  const allMembers = [
    {
      id: demoDoctor.id,
      name: `${demoDoctor.firstName} ${demoDoctor.lastName}`,
      specialization: demoDoctor.specialization,
      photoUrl: demoDoctor.photoUrl,
      rating: demoDoctor.rating,
      city: demoDoctor.city,
      isCurrentUser: true,
      xp: demoDoctor.xp,
    },
    ...demoCommunityMembers.map((m, i) => ({
      ...m,
      isCurrentUser: false,
      xp: 1000 + (demoCommunityMembers.length - i) * 200,
    })),
  ].sort((a, b) => b.xp - a.xp)

  const filteredMembers = allMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpec = !selectedSpecialization || selectedSpecialization === 'Все' ||
      member.specialization === selectedSpecialization
    return matchesSearch && matchesSpec
  })

  return (
    <div className="screen-scroll px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Users size={28} className="text-accent" />
          <h1 className="text-2xl font-bold text-white">Сообщество</h1>
        </div>
        <p className="text-gray-400 text-sm">Рейтинг и коммуникация с коллегами</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Поиск врача..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bg-card rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Specialization Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {specializations.map(spec => (
          <motion.button
            key={spec}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSpecialization(spec === 'Все' ? null : spec)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
              ${(!selectedSpecialization && spec === 'Все') || selectedSpecialization === spec
                ? 'bg-accent text-bg'
                : 'bg-bg-card text-white'}
            `}
          >
            {spec}
          </motion.button>
        ))}
      </div>

      {/* Leaderboard Header */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={20} className="text-accent" />
        <h2 className="text-lg font-bold">Рейтинг врачей</h2>
      </div>

      {/* Top 3 Podium */}
      <Card className="mb-6 glow-gold">
        <div className="flex justify-center items-end gap-4 py-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <Avatar
              src={allMembers[1]?.photoUrl}
              name={allMembers[1]?.name || ''}
              size="md"
            />
            <Badge variant="default" className="mt-2">2</Badge>
            <p className="text-xs text-gray-400 mt-1 truncate max-w-[60px]">
              {allMembers[1]?.name.split(' ')[0]}
            </p>
            <p className="text-xs text-accent">{allMembers[1]?.xp} XP</p>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <div className="relative">
              <Avatar
                src={allMembers[0]?.photoUrl}
                name={allMembers[0]?.name || ''}
                size="lg"
                className="ring-4 ring-accent"
              />
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                <Crown size={14} className="text-bg" />
              </div>
            </div>
            <Badge variant="accent" className="mt-2">1</Badge>
            <p className="text-sm font-semibold text-white mt-1 truncate max-w-[80px]">
              {allMembers[0]?.name.split(' ')[0]}
            </p>
            <p className="text-sm text-accent font-bold">{allMembers[0]?.xp} XP</p>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <Avatar
              src={allMembers[2]?.photoUrl}
              name={allMembers[2]?.name || ''}
              size="md"
            />
            <Badge variant="default" className="mt-2">3</Badge>
            <p className="text-xs text-gray-400 mt-1 truncate max-w-[60px]">
              {allMembers[2]?.name.split(' ')[0]}
            </p>
            <p className="text-xs text-accent">{allMembers[2]?.xp} XP</p>
          </div>
        </div>
      </Card>

      {/* Members List */}
      {filteredMembers.length > 0 ? (
        <div className="space-y-3 pb-6">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`flex items-center gap-3 ${member.isCurrentUser ? 'border-2 border-accent' : ''}`}
              >
                {/* Rank */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm
                  ${index < 3 ? 'bg-accent text-bg' : 'bg-bg-hover text-gray-400'}
                `}>
                  {index + 1}
                </div>

                {/* Avatar */}
                <Avatar
                  src={member.photoUrl}
                  name={member.name}
                  size="md"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white truncate">
                      {member.name}
                    </span>
                    {member.isCurrentUser && (
                      <Badge variant="accent" className="text-[10px]">Вы</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{member.specialization}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {member.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={10} className="text-accent" />
                      {member.rating}
                    </span>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right flex-shrink-0">
                  <p className="text-accent font-bold">{member.xp}</p>
                  <p className="text-[10px] text-gray-500">XP</p>
                </div>

                {/* Action */}
                {!member.isCurrentUser && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <MessageCircle size={16} />
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Users size={48} className="text-gray-500" />}
          title="Врачи не найдены"
          description="Попробуйте изменить параметры поиска"
        />
      )}
    </div>
  )
}

export default CommunityScreen
