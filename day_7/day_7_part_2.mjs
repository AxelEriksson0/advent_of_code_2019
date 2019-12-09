import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

/* const input = fs.readFileSync('./day_7_input', 'utf8')
const programCodes = input.toString().split(',').map(Number) */

/* const input18216 = fs.readFileSync(path.resolve(__dirname, 'day_7/day_7_input_part_2_18216'), 'utf8') */
const input18216 = fs.readFileSync('./day_7_input_part_2_18216', 'utf8')
const programCodes18216 = input18216.toString().split(',').map(Number)

const input139629729 = fs.readFileSync('./day_7_input_part_2_139629729', 'utf8')
const programCodes139629729 = input139629729.toString().split(',').map(Number)

const IntcodeComputer = (programCodes, phaseSetting, inputSignal, loopIndex) => {
  let outputSignal = 0
  let newIndex = 0
  let firstTimeOpcode3 = true

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

      if (instructions.length === 3 && instructions[0] === 1) {
        value1 = programCodes[i + 1]
      }
      if (instructions.length === 4) {
        if (instructions[0] === 1) { value2 = programCodes[i + 2] }
        if (instructions[1] === 1) { value1 = programCodes[i + 1] }
      }
    }

    if (opCode === 99) {
      console.log('Encountered opCode 99. Exiting...')
      break
    }

    if (opCode !== 1 && opCode !== 2 && opCode !== 3 && opCode !== 4 && opCode !== 5 && opCode !== 6 && opCode !== 7 && opCode !== 8 && opCode !== 99) {
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
  }
  return [outputSignal, newIndex]
}

const getAllPermutations = arrayToPermutate => {
  const allPermutations = []
  for (let i = 0; i < arrayToPermutate.length; i = i + 1) {
    const rest = getAllPermutations(arrayToPermutate.slice(0, i).concat(arrayToPermutate.slice(i + 1)))
    if (!rest.length) { allPermutations.push([arrayToPermutate[i]]) } else { for (let j = 0; j < rest.length; j = j + 1) { allPermutations.push([arrayToPermutate[i]].concat(rest[j])) } }
  }
  return allPermutations
}

/* let inputSignal = 0
let highestOutputSignal = 0
const phaseSequence = [9, 7, 8, 5, 6]

phaseSequence.forEach(phaseSetting => {
  inputSignal = IntcodeComputer(programCodes, phaseSetting, inputSignal)
})
if (highestOutputSignal < inputSignal) { highestOutputSignal = inputSignal }
console.log(`Final output: ${highestOutputSignal}`)

phaseSequence.forEach(phaseSetting => {
  inputSignal = IntcodeComputer(programCodes, phaseSetting, inputSignal)
})
if (highestOutputSignal < inputSignal) { highestOutputSignal = inputSignal }
console.log(`Final output: ${highestOutputSignal}`) */

/// //////////////
/// Test cases ///
/// //////////////

/* let inputSignal18216 = 0
const phaseSequence18216 = [9, 7, 8, 5, 6]
phaseSequence18216.forEach(phaseSetting => {
  inputSignal18216 = IntcodeComputer(programCodes18216, phaseSetting, inputSignal18216)
})

console.log(inputSignal18216) */

let inputSignal139629729 = 0
const phaseSequence139629729 = [9, 8, 7, 6, 5]
const amplifier1 = [...programCodes139629729]
const amplifier2 = [...programCodes139629729]
const amplifier3 = [...programCodes139629729]
const amplifier4 = [...programCodes139629729]
const amplifier5 = [...programCodes139629729]
const amplifiers = [amplifier1, amplifier2, amplifier3, amplifier4, amplifier5]
const loopIndexes = [0, 0, 0, 0, 0]

phaseSequence139629729.forEach((phaseSetting, index) => {
  [inputSignal139629729, loopIndexes[index]] = IntcodeComputer(amplifiers[index], phaseSetting, inputSignal139629729, loopIndexes[index])
})

phaseSequence139629729.forEach((phaseSetting, index) => {
  [inputSignal139629729, loopIndexes[index]] = IntcodeComputer(amplifiers[index], inputSignal139629729, inputSignal139629729, loopIndexes[index])
})

phaseSequence139629729.forEach((phaseSetting, index) => {
  [inputSignal139629729, loopIndexes[index]] = IntcodeComputer(amplifiers[index], inputSignal139629729, inputSignal139629729, loopIndexes[index])
})

phaseSequence139629729.forEach((phaseSetting, index) => {
  [inputSignal139629729, loopIndexes[index]] = IntcodeComputer(amplifiers[index], inputSignal139629729, inputSignal139629729, loopIndexes[index])
})

phaseSequence139629729.forEach((phaseSetting, index) => {
  [inputSignal139629729, loopIndexes[index]] = IntcodeComputer(amplifiers[index], inputSignal139629729, inputSignal139629729, loopIndexes[index])
})

phaseSequence139629729.forEach((phaseSetting, index) => {
  [inputSignal139629729, loopIndexes[index]] = IntcodeComputer(amplifiers[index], inputSignal139629729, inputSignal139629729, loopIndexes[index])
})

console.log(inputSignal139629729)
console.log(loopIndexes)
