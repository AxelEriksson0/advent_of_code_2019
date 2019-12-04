import fs from 'fs'

const input = fs.readFileSync('./day_4_input', 'utf8')
const [lowerRange, upperRange] = input.toString().split('-').map(Number)
const possiblePasswords = []

for (let i = lowerRange; i <= upperRange; i++) {
  const digits = i.toString().split('').map(Number)
  const sorted = [...digits].sort((a, b) => a - b)
  if (digits.join() !== sorted.join()) {
    continue
  }
  if (digits[0] !== digits[1] && digits[1] !== digits[2] && digits[2] !== digits[3] && digits[3] !== digits[4] && digits[4] !== digits[5]) {
    continue
  }
  if (digits[0] === digits[1] && digits[1] !== digits[2]) {
    possiblePasswords.push(digits)
    continue
  }
  if (digits[1] === digits[2] && digits[0] !== digits[1] && digits[2] !== digits[3]) {
    possiblePasswords.push(digits)
    continue
  }
  if (digits[2] === digits[3] && digits[1] !== digits[2] && digits[3] !== digits[4]) {
    possiblePasswords.push(digits)
    continue
  }
  if (digits[3] === digits[4] && digits[2] !== digits[3] && digits[4] !== digits[5]) {
    possiblePasswords.push(digits)
    continue
  }
  if (digits[4] === digits[5] && digits[3] !== digits[4]) {
    possiblePasswords.push(digits)
    continue
  }
}

console.log(possiblePasswords.length)
