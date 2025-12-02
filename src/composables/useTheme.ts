import { ref, watch } from 'vue'

const theme = ref<'light' | 'dark'>(
  (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
)

// Aplikuj tému na document
const applyTheme = (newTheme: 'light' | 'dark') => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', newTheme)
}

// Aplikuj tému pri načítaní
applyTheme(theme.value)

// Sleduj zmeny témy
watch(theme, (newTheme) => {
  applyTheme(newTheme)
})

export function useTheme() {
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    setTheme,
    toggleTheme
  }
}