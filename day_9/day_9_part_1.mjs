import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

const input = fs.readFileSync('./day_9_input', 'utf8')
const programCodes = input.toString().split(',').map(Number)

let highestOutputSignalAll = 0

export const IntcodeComputer = (programCodes, phaseSetting, inputSignal, loopIndex) => {
  let outputSignal = 0
  let newIndex = 0
  let firstTimeOpcode3 = true
  let relativeOffset = 0

  for (let i = loopIndex; i < programCodes.length;) {
    let opCode = programCodes[i]

    let value1 = programCodes[programCodes[i + 1]]
    let value2 = programCodes[programCodes[i + 2]]

    if (programCodes[i] >= 100) {
      const instructions = programCodes[i].toString().split('').map(Number)
      opCode = instructions.slice(-1)[0]
      if (opCode === 9 && instructions.slice(-2)[0] === 9) {
        opCode = 99
      }

      if (instructions.length === 3) {
        if (instructions[0] === 1) { value1 = programCodes[i + 1] }
        if (instructions[0] === 2) { value1 = programCodes[programCodes[i + 1 + relativeOffset]] }
      }

      if (instructions.length === 4) {
        if (instructions[1] === 1) { value1 = programCodes[i + 1] }
        if (instructions[1] === 2) { value1 = programCodes[programCodes[i + 1 + relativeOffset]] }
        if (instructions[0] === 1) { value2 = programCodes[i + 2] }
        if (instructions[0] === 2) { value2 = programCodes[programCodes[i + 2 + relativeOffset]] }
      }
    }

    if (opCode === 99) {
      console.log('Encountered opCode 99. Exiting...')
      break
    }

    if (opCode !== 1 && opCode !== 2 && opCode !== 3 && opCode !== 4 && opCode !== 5 && opCode !== 6 && opCode !== 7 && opCode !== 8 && opCode !== 9 && opCode !== 99) {
      console.log(`Bad opcode: ${opCode}`)
      break
    }

    if (opCode === 1) {
      const positionToChange = programCodes[i + 3]
      programCodes[positionToChange] = value1 + value2
      i += 4
      continue
    }

    if (opCode === 2) {
      const positionToChange = programCodes[i + 3]
      programCodes[positionToChange] = value1 * value2
      i += 4
      continue
    }

    if (opCode === 3) {
      const positionToChange = programCodes[i + 1]
      if (!firstTimeOpcode3) {
        programCodes[positionToChange] = inputSignal
      }
      if (firstTimeOpcode3) {
        programCodes[positionToChange] = phaseSetting
        firstTimeOpcode3 = false
      }
      i += 2
      continue
    }

    if (opCode === 4) {
      const positionToOutput = programCodes[i + 1]
      console.log('Opcode 4: ', programCodes[positionToOutput])
      outputSignal = programCodes[positionToOutput]
      if (highestOutputSignalAll < outputSignal) {
        highestOutputSignalAll = outputSignal
      }
      i += 2
      newIndex = i
      break
    }

    if (opCode === 5) {
      value1 !== 0 ? i = value2 : i += 3
      continue
    }

    if (opCode === 6) {
      value1 === 0 ? i = value2 : i += 3
      continue
    }

    if (opCode === 7) {
      const positionToChange = programCodes[i + 3]
      value1 < value2 ? programCodes[positionToChange] = 1 : programCodes[positionToChange] = 0
      i += 4
      continue
    }

    if (opCode === 8) {
      const positionToChange = programCodes[i + 3]
      value1 === value2 ? programCodes[positionToChange] = 1 : programCodes[positionToChange] = 0
      i += 4
      continue
    }

    if (opCode === 9) {
      relativeOffset += value1
      i += 2
      continue
    }
  }
  return [outputSignal, newIndex]
}
