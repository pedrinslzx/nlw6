export function randomChar(length: number = 5) {
  const result = ['']
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  ]
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
