import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

const input = fs.readFileSync('./day_7_input', 'utf8')
const programCodes = input.toString().split(',').map(Number)

/* const input18216 = fs.readFileSync(path.resolve(__dirname, 'day_7/day_7_input_part_2_18216'), 'utf8') */
const input18216 = fs.readFileSync('./day_7_input_part_2_18216', 'utf8')
const programCodes18216 = input18216.toString().split(',').map(Number)

const input139629729 = fs.readFileSync('./day_7_input_part_2_139629729', 'utf8')
const programCodes139629729 = input139629729.toString().split(',').map(Number)

let highestOutputSignalAll = 0

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

const feedbackLoop = (amplifiers, highestOutputSignal, inputSignal) => {
  amplifiers.forEach(amplifier => {
    [inputSignal, amplifier.loopIndex] = IntcodeComputer(amplifier.programCode, inputSignal, inputSignal, amplifier.loopIndex)
  })
  if (highestOutputSignal < inputSignal) {
    highestOutputSignal = inputSignal
    feedbackLoop(amplifiers, highestOutputSignal, inputSignal)
  }
  return highestOutputSignal
}

const allPhaseSequences = getAllPermutations([5, 6, 7, 8, 9])

allPhaseSequences.forEach(phaseSequence => {
  let inputSignal = 0
  let highestOutputSignal = 0
  const amplifiers = [
    { loopIndex: 0, phaseSetting: phaseSequence[0], programCode: [...programCodes] },
    { loopIndex: 0, phaseSetting: phaseSequence[1], programCode: [...programCodes] },
    { loopIndex: 0, phaseSetting: phaseSequence[2], programCode: [...programCodes] },
    { loopIndex: 0, phaseSetting: phaseSequence[3], programCode: [...programCodes] },
    { loopIndex: 0, phaseSetting: phaseSequence[4], programCode: [...programCodes] }
  ]

  amplifiers.forEach(amplifier => {
    [inputSignal, amplifier.loopIndex] = IntcodeComputer(amplifier.programCode, amplifier.phaseSetting, inputSignal, amplifier.loopIndex)
  })
  if (highestOutputSignal < inputSignal) {
    highestOutputSignal = inputSignal
  }
  feedbackLoop(amplifiers, highestOutputSignal, inputSignal)
})

console.log('Highest output signal: ', highestOutputSignalAll)

/// //////////////
/// Test cases ///
/// //////////////

/* let inputSignal18216 = 0
let highestOutputSignal18216 = 0
const amplifiers18216 = [
  { loopIndex: 0, phaseSetting: 9, programCode: [...programCodes18216] },
  { loopIndex: 0, phaseSetting: 7, programCode: [...programCodes18216] },
  { loopIndex: 0, phaseSetting: 8, programCode: [...programCodes18216] },
  { loopIndex: 0, phaseSetting: 5, programCode: [...programCodes18216] },
  { loopIndex: 0, phaseSetting: 6, programCode: [...programCodes18216] }
]

amplifiers18216.forEach(amplifier => {
  [inputSignal18216, amplifier.loopIndex] = IntcodeComputer(amplifier.programCode, amplifier.phaseSetting, inputSignal18216, amplifier.loopIndex)
})
if (highestOutputSignal18216 < inputSignal18216) {
  highestOutputSignal18216 = inputSignal18216
}

feedbackLoop(amplifiers18216, highestOutputSignal18216, inputSignal18216)

let inputSignal139629729 = 0
let highestOutputSignal139629729 = 0
const amplifiers139629729 = [
  { loopIndex: 0, phaseSetting: 9, programCode: [...programCodes139629729] },
  { loopIndex: 0, phaseSetting: 8, programCode: [...programCodes139629729] },
  { loopIndex: 0, phaseSetting: 7, programCode: [...programCodes139629729] },
  { loopIndex: 0, phaseSetting: 6, programCode: [...programCodes139629729] },
  { loopIndex: 0, phaseSetting: 5, programCode: [...programCodes139629729] }
]

amplifiers139629729.forEach(amplifier => {
  [inputSignal139629729, amplifier.loopIndex] = IntcodeComputer(amplifier.programCode, amplifier.phaseSetting, inputSignal139629729, amplifier.loopIndex)
})
if (highestOutputSignal139629729 < inputSignal139629729) {
  highestOutputSignal139629729 = inputSignal139629729
}

feedbackLoop(amplifiers139629729, highestOutputSignal139629729, inputSignal139629729)
 */
