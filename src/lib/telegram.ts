// Telegram Web App API integration

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  isExpanded: boolean
  isFullscreen?: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  setHeaderColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  enableClosingConfirmation: () => void
  disableClosingConfirmation: () => void
  requestFullscreen?: () => void
  exitFullscreen?: () => void
  disableVerticalSwipes?: () => void
  enableVerticalSwipes?: () => void
  lockOrientation?: () => void
  unlockOrientation?: () => void
  BackButton: {
    isVisible: boolean
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    setText: (text: string) => void
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    showProgress: (leaveActive?: boolean) => void
    hideProgress: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      photo_url?: string
    }
  }
  colorScheme: 'light' | 'dark'
  themeParams: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
  }
  platform: string
  version: string
}

// Get Telegram WebApp instance
export const getTelegram = (): TelegramWebApp | null => {
  return window.Telegram?.WebApp || null
}

// Initialize Telegram WebApp
export const initTelegram = () => {
  const tg = getTelegram()
  if (!tg) {
    console.log('Telegram WebApp not available')
    return
  }

  // Signal that the app is ready
  tg.ready()

  // Expand to full height
  tg.expand()

  // Request true fullscreen mode (API v7.7+)
  if (tg.requestFullscreen) {
    tg.requestFullscreen()
    document.body.classList.add('tg-fullscreen')
  }

  // Disable vertical swipes to prevent accidental closing (API v7.7+)
  if (tg.disableVerticalSwipes) {
    tg.disableVerticalSwipes()
  }

  // Set colors to match our theme
  tg.setHeaderColor('#0a0a0a')
  tg.setBackgroundColor('#0a0a0a')

  console.log('Telegram WebApp initialized', {
    platform: tg.platform,
    version: tg.version,
    colorScheme: tg.colorScheme,
    isExpanded: tg.isExpanded,
    isFullscreen: tg.isFullscreen,
    viewportHeight: tg.viewportHeight,
    viewportStableHeight: tg.viewportStableHeight,
  })
}

// Back Button helpers
export const backButton = {
  show: (callback: () => void) => {
    const tg = getTelegram()
    if (!tg) return

    tg.BackButton.onClick(callback)
    tg.BackButton.show()
  },

  hide: () => {
    const tg = getTelegram()
    if (!tg) return

    tg.BackButton.hide()
  },

  isVisible: () => {
    const tg = getTelegram()
    return tg?.BackButton.isVisible || false
  },
}

// Main Button helpers
export const mainButton = {
  show: (text: string, callback: () => void) => {
    const tg = getTelegram()
    if (!tg) return

    tg.MainButton.setText(text)
    tg.MainButton.onClick(callback)
    tg.MainButton.show()
  },

  hide: () => {
    const tg = getTelegram()
    if (!tg) return

    tg.MainButton.hide()
  },

  showProgress: () => {
    const tg = getTelegram()
    if (!tg) return

    tg.MainButton.showProgress()
  },

  hideProgress: () => {
    const tg = getTelegram()
    if (!tg) return

    tg.MainButton.hideProgress()
  },
}

// Haptic feedback helpers
export const haptic = {
  light: () => getTelegram()?.HapticFeedback.impactOccurred('light'),
  medium: () => getTelegram()?.HapticFeedback.impactOccurred('medium'),
  heavy: () => getTelegram()?.HapticFeedback.impactOccurred('heavy'),
  success: () => getTelegram()?.HapticFeedback.notificationOccurred('success'),
  error: () => getTelegram()?.HapticFeedback.notificationOccurred('error'),
  warning: () => getTelegram()?.HapticFeedback.notificationOccurred('warning'),
  selection: () => getTelegram()?.HapticFeedback.selectionChanged(),
}

// Get user info
export const getTelegramUser = () => {
  const tg = getTelegram()
  return tg?.initDataUnsafe?.user || null
}

// Close the app
export const closeApp = () => {
  const tg = getTelegram()
  tg?.close()
}
