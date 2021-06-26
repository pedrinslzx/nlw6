export function randomChar(length: number = 5) {
  const result = ['']
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charactersLength = characters.length

  for (var i = 0; i < length; i++) {
    const char = characters[Math.floor(Math.random() * charactersLength)]
    result.push(char)
  }

  return result.join('')
}

export function formatPlural(amount: number): 's' | '' | null {
  if (typeof amount !== 'number') return null
  if (amount > 1 || amount === 0) return 's'
  return ''
}

export { default as cx } from 'classnames'
