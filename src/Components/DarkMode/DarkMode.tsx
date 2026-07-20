import { useEffect, useState } from 'react'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  // 1) আগে সেভ করা প্রেফারেন্স থাকলে সেটাই ব্যবহার করো
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  // 2) না থাকলে OS/browser এর প্রেফারেন্স দেখো
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  localStorage.setItem(STORAGE_KEY, theme)
}

const DarkMode = () => {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  // প্রথম মাউন্টেই সঠিক ক্লাস বসিয়ে দাও (ইনডেক্স.html এ ইনলাইন স্ক্রিপ্ট না
  // থাকলে প্রথম রেন্ডারে সংক্ষিপ্ত ফ্ল্যাশ হতে পারে — নিচের নোট দেখো)
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
      className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card text-foreground hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer"
    >
      {theme === 'dark' ? (
        <IoSunnyOutline className="text-lg" />
      ) : (
        <IoMoonOutline className="text-lg" />
      )}
    </button>
  )
}

export default DarkMode
