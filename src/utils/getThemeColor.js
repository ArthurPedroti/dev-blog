const getThemeColor = () => {
  const theme = typeof window !== 'undefined' && window.__theme

  if (theme === 'light') return '#fff'
  if (theme === 'dark') return '#2E3440'
}

export default getThemeColor
