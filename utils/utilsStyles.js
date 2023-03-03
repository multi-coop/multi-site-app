export const createStyleLink = (url, isFont = false) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.as = 'style'
  if (isFont) {
    link.type = 'font'
    link.as = 'font'
  } else {
    link.onload = "this.rel='stylesheet'"
  }
  link.href = url
  document.head.appendChild(link)
}