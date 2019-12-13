import fs from 'fs'

const input = fs.readFileSync('./day_9_input', 'utf8')
const IntcodeProgram = input.toString().split(',').map(Number)

const IntcodeComputer = (IntcodeProgram, input) => {
  IntcodeProgram = [...IntcodeProgram, ...Array(1000).fill(0)]
  const listOfOpcodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 99]
  let relativeBase = 0
  const outputs = []

  for (let i = 0; i < IntcodeProgram.length;) {
    let opcode = IntcodeProgram[i]
    let parameter1 = IntcodeProgram[IntcodeProgram[i + 1]]
    let parameter2 = IntcodeProgram[IntcodeProgram[i + 2]]
    let positionToChange = IntcodeProgram[i + 3]

    if (IntcodeProgram[i] >= 100) {
      const instruction = IntcodeProgram[i].toString().split('').map(Number)
      if (instruction.slice(-1)[0] === 9 && instruction.slice(-2)[0] === 9) {
        opcode = 99
      } else {
        opcode = instruction.slice(-1)[0]
      }
      if (instruction.length === 3) {
        if (instruction[0] === 1) { parameter1 = IntcodeProgram[i + 1] }
        if (instruction[0] === 2) { parameter1 = IntcodeProgram[(IntcodeProgram[i + 1] + relativeBase)] }
      }
      if (instruction.length === 4) {
        if (instruction[1] === 1) { parameter1 = IntcodeProgram[i + 1] }
        if (instruction[0] === 1) { parameter2 = IntcodeProgram[i + 2] }
        if (instruction[1] === 2) {
          parameter1 = IntcodeProgram[(IntcodeProgram[i + 1] + relativeBase)]
        }
        if (instruction[0] === 2) {
          parameter2 = IntcodeProgram[(IntcodeProgram[i + 2] + relativeBase)]
        }
      }
      if (instruction.length === 5) {
        if (instruction[2] === 1) { parameter1 = IntcodeProgram[i + 1] }
        if (instruction[1] === 1) { parameter2 = IntcodeProgram[i + 2] }
        if (instruction[2] === 2) { parameter1 = IntcodeProgram[IntcodeProgram[i + 1] + relativeBase] }
        if (instruction[1] === 2) { parameter2 = IntcodeProgram[IntcodeProgram[i + 2] + relativeBase] }
        if (instruction[0] === 2) { positionToChange = IntcodeProgram[i + 3] + relativeBase }
      }
    }

    if (!listOfOpcodes.includes(opcode)) {
      console.log('Encountered an incorrect opode! Exiting...')
      break
    }

    if (opcode === 1) {
      IntcodeProgram[positionToChange] = parameter1 + parameter2
      i += 4
      continue
    }

    if (opcode === 2) {
      IntcodeProgram[positionToChange] = parameter1 * parameter2
      i += 4
      continue
    }

    if (opcode === 3) {
      IntcodeProgram[positionToChange] = input
      i += 2
      continue
    }

    if (opcode === 4) {
      outputs.push(parameter1)
      i += 2
      continue
    }

    if (opcode === 5) {
      parameter1 !== 0 ? i = parameter2 : i += 3
      continue
    }

    if (opcode === 6) {
      parameter1 === 0 ? i = parameter2 : i += 3
      continue
    }

    if (opcode === 7) {
      parameter1 < parameter2 ? IntcodeProgram[positionToChange] = 1 : IntcodeProgram[positionToChange] = 0
      i += 4
      continue
    }

    if (opcode === 8) {
      parameter1 === parameter2 ? IntcodeProgram[positionToChange] = 1 : IntcodeProgram[positionToChange] = 0
      i += 4
      continue
    }

    if (opcode === 9) {
      relativeBase += parameter1
      i += 2
      continue
    }

    if (opcode === 99) {
      console.log('Encountered opcode 99! Exiting...')
      break
    }
  }
  return outputs
}

const IntcodeProgramResult = IntcodeComputer(IntcodeProgram, 1)
console.log(IntcodeProgramResult)
