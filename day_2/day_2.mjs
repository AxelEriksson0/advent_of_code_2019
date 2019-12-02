import fs from 'fs'

const input = fs.readFileSync('./day_2_input', 'utf8')
const programCodes = input.toString().split(',').map(Number)

programCodes[1] = 12
programCodes[2] = 2

for (let i = 0; i < programCodes.length; i += 4) {
  if (programCodes[i] === 99) {
    break
  }

  const position1 = programCodes[i + 1]
  const position2 = programCodes[i + 2]
  const positionToChange = programCodes[i + 3]

  if (programCodes[i] === 1) {
    programCodes[positionToChange] = programCodes[position1] + programCodes[position2]
  }

  if (programCodes[i] === 2) {
    programCodes[positionToChange] = programCodes[position1] * programCodes[position2]
  }
}

console.log(programCodes)
