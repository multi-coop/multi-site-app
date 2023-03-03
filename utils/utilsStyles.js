export const createStyleLink = (url, isFont = false) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  if (isFont) {
    link.type = 'font'
    link.as = 'font'
  }
  link.href = url
  document.head.appendChild(link)
}