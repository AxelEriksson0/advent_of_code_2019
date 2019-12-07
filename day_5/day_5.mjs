import fs from 'fs'

/* import path from 'path' */
/* const __dirname = path.resolve() */
/* const input = fs.readFileSync(path.resolve(__dirname, 'day_5/day_5_input'), 'utf8') */
const input = fs.readFileSync('./day_5_input', 'utf8')
const programCodes = input.toString().split(',').map(Number)

const runProgram = (programCodes, input) => {
  for (let i = 0; i < programCodes.length;) {
    if (programCodes[i] === 99) {
      console.log('Encountered opCode 99. Exiting...')
      break
    }

    let opCode = programCodes[i]
    let value1 = programCodes[programCodes[i + 1]]
    let value2 = programCodes[programCodes[i + 2]]
    const positionToChange = programCodes[i + 3]

    if (programCodes[i] >= 100) {
      const instructions = programCodes[i].toString().split('').map(Number)
      opCode = instructions.slice(-1)[0]

      if (opCode !== 1 && opCode !== 2 && opCode !== 3 && opCode !== 4 && opCode !== 5 && opCode !== 6 && opCode !== 7 && opCode !== 8 && opCode !== 99) {
        console.log('Bad opcode: ', opCode)
        break
      }

      if (instructions.length === 3) {
        if (instructions[0] === 1) {
          value1 = programCodes[i + 1]
        }
      }
      if (instructions.length === 4) {
        if (instructions[0] === 1) {
          value2 = programCodes[i + 2]
        }
        if (instructions[1] === 1) {
          value1 = programCodes[i + 1]
        }
      }
    }

    if (opCode !== 1 && opCode !== 2 && opCode !== 3 && opCode !== 4 && opCode !== 5 && opCode !== 6 && opCode !== 7 && opCode !== 8 && opCode !== 99) {
      console.log('Bad opcode: ', opCode)
      break
    }

    if (opCode === 1) {
      programCodes[positionToChange] = value1 + value2
      i += 4
      continue
    }

    if (opCode === 2) {
      programCodes[positionToChange] = value1 * value2
      i += 4
      continue
    }

    if (opCode === 3) {
      programCodes[programCodes[i + 1]] = input
      i += 2
      continue
    }

    if (opCode === 4) {
      const positionToOutput = programCodes[i + 1]
      console.log('Opcode 4: ', programCodes[positionToOutput])
      i += 2
      continue
    }

    if (opCode === 5) {
      if (value1 !== 0) {
        i = value2
      } else {
        i += 3
      }
    }

    if (opCode === 6) {
      if (value1 === 0) {
        i = value2
      } else {
        i += 3
      }
    }

    if (opCode === 7) {
      if (value1 < value2) {
        programCodes[positionToChange] = 1
      } else {
        programCodes[positionToChange] = 0
      }
      i += 4
    }

    if (opCode === 8) {
      if (value1 === value2) {
        programCodes[positionToChange] = 1
      } else {
        programCodes[positionToChange] = 0
      }
      i += 4
    }
  }
}

runProgram(programCodes, 5)
