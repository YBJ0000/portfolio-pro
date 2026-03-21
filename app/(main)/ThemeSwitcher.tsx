'use client'

import { motion } from 'framer-motion'
import { Moon, Sun, Zap } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme, theme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return null
  }

  const Icon =
    theme === 'light' ? Sun : theme === 'dark' ? Moon : Zap

  return (
    <motion.div
      className="pointer-events-auto"
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      <button
        type="button"
        aria-label="Toggle color theme"
        title="Toggle theme"
        className="group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        onClick={toggleTheme}
      >
        <Icon className="h-6 w-6 stroke-zinc-500 p-0.5 transition group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-200" />
      </button>
    </motion.div>
  )
}
