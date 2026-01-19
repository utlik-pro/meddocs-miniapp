import type { Doctor, MedEvent, Course, AISummary, CommunityMember } from '@/types'

// Demo Doctor Profile - Galina Petrova
export const demoDoctor: Doctor = {
  id: '1',
  firstName: 'Галина',
  lastName: 'Петрова',
  patronymic: 'Александровна',
  specialization: 'Гастроэнтеролог',
  photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  rating: 4.8,
  reviewsCount: 127,
  city: 'Гродно',
  hospital: 'Гродненская областная клиническая больница',
  bio: 'Врач-гастроэнтеролог высшей категории с 15-летним опытом. Специализируюсь на воспалительных заболеваниях кишечника, включая болезнь Крона и язвенный колит.',
  interests: ['Болезнь Крона', 'ВЗК', 'Микробиом', 'Эндоскопия', 'Нутрициология'],
  achievements: [
    {
      id: '1',
      title: 'Активный участник',
      description: 'Посетил 10+ мероприятий',
      icon: 'trophy',
      earnedAt: '2025-12-15',
      xpReward: 100,
    },
    {
      id: '2',
      title: 'Эксперт по ВЗК',
      description: 'Завершил курс по воспалительным заболеваниям кишечника',
      icon: 'book',
      earnedAt: '2025-11-20',
      xpReward: 200,
    },
    {
      id: '3',
      title: 'Спикер',
      description: 'Выступил на региональной конференции',
      icon: 'mic',
      earnedAt: '2025-10-05',
      xpReward: 300,
    },
  ],
  xp: 1250,
}

// Demo Event - Meeting in Grodno
export const demoEvents: MedEvent[] = [
  {
    id: '1',
    title: 'Встреча врачей в Гродно',
    description: 'Практическая конференция для гастроэнтерологов и терапевтов. Обсудим современные подходы к лечению болезни Крона, разберём клинические случаи и поделимся опытом.',
    date: '2026-02-15',
    time: '10:00',
    location: 'Конференц-зал "Медик"',
    city: 'Гродно',
    topic: 'Лечение болезни Крона в современных реалиях. Топ-5 крутых практик',
    speakerName: 'Проф. Иванов А.С.',
    speakerPhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
    maxParticipants: 50,
    registeredCount: 32,
    isRegistered: false,
    tags: ['Гастроэнтерология', 'Болезнь Крона', 'Практика'],
  },
  {
    id: '2',
    title: 'Вебинар: Новые биомаркеры ВЗК',
    description: 'Онлайн-вебинар о современных методах диагностики воспалительных заболеваний кишечника с использованием новых биомаркеров.',
    date: '2026-02-22',
    time: '18:00',
    location: 'Онлайн (Zoom)',
    city: 'Онлайн',
    topic: 'Биомаркеры в диагностике ВЗК',
    speakerName: 'Д.м.н. Сидорова Е.В.',
    maxParticipants: 200,
    registeredCount: 145,
    isRegistered: true,
    tags: ['Диагностика', 'ВЗК', 'Онлайн'],
  },
  {
    id: '3',
    title: 'Мастер-класс по эндоскопии',
    description: 'Практический мастер-класс с демонстрацией современных эндоскопических техник.',
    date: '2026-01-10',
    time: '09:00',
    location: 'Учебный центр',
    city: 'Минск',
    topic: 'Современные техники эндоскопии',
    registeredCount: 20,
    isRegistered: true,
    isAttended: true,
    rating: 5,
    tags: ['Эндоскопия', 'Мастер-класс'],
  },
]

// Demo Courses
export const demoCourses: Course[] = [
  {
    id: '1',
    title: 'Болезнь Крона: основные тенденции',
    description: 'Комплексный курс о современных подходах к диагностике и лечению болезни Крона. Разбираем ключевые тенденции на ближайшие 2-3 года.',
    topic: 'Гастроэнтерология',
    duration: '4 часа',
    lessonsCount: 8,
    completedLessons: 3,
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop',
    isLocked: false,
    videoUrl: 'https://example.com/video1',
  },
  {
    id: '2',
    title: 'Микробиом кишечника',
    description: 'Влияние микробиоты на здоровье ЖКТ. Современные исследования и клинические применения.',
    topic: 'Гастроэнтерология',
    duration: '3 часа',
    lessonsCount: 6,
    completedLessons: 0,
    thumbnail: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400&h=200&fit=crop',
    isLocked: false,
  },
  {
    id: '3',
    title: 'Продвинутая эндоскопия',
    description: 'Углублённый курс по современным эндоскопическим методикам для опытных специалистов.',
    topic: 'Эндоскопия',
    duration: '6 часов',
    lessonsCount: 12,
    completedLessons: 0,
    isLocked: true,
    requiredXP: 2000,
  },
]

// Demo AI Summary
export const demoAISummaries: AISummary[] = [
  {
    id: '1',
    eventId: '3',
    title: 'Конспект: Мастер-класс по эндоскопии',
    content: 'На мастер-классе были продемонстрированы современные техники капсульной эндоскопии и хромоэндоскопии. Особое внимание уделено раннему выявлению неопластических изменений.',
    keyPoints: [
      'Капсульная эндоскопия - gold standard для тонкой кишки',
      'NBI-технология повышает выявляемость на 23%',
      'Важность подготовки пациента: новые протоколы',
      'AI-ассистенты в эндоскопии: первые результаты',
      'Персонализированный подход к частоте наблюдения',
    ],
    generatedAt: '2026-01-10T15:30:00',
    materials: ['Презентация спикера.pdf', 'Протокол подготовки.docx'],
  },
]

// Demo Community Members
export const demoCommunityMembers: CommunityMember[] = [
  {
    id: '1',
    name: 'Иванов Алексей',
    specialization: 'Гастроэнтеролог',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
    rating: 4.9,
    city: 'Минск',
  },
  {
    id: '2',
    name: 'Сидорова Елена',
    specialization: 'Терапевт',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face',
    rating: 4.7,
    city: 'Гродно',
  },
  {
    id: '3',
    name: 'Козлов Дмитрий',
    specialization: 'Эндоскопист',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    city: 'Брест',
  },
  {
    id: '4',
    name: 'Новикова Анна',
    specialization: 'Гастроэнтеролог',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    rating: 4.6,
    city: 'Витебск',
  },
]
