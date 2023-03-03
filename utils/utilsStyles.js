export async function createStyleLink (url, isFont = false) {
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  head.appendChild(style)

  style.type = 'text/css'

  const req = await fetch(url)
  console.log('-U- createStyleLink > createStyleLink > req :', req)
  const css = req && await req.text()

  console.log('-U- createStyleLink > createStyleLink > css :', css)
  if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
}