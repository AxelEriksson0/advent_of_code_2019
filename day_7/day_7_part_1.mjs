import fs from 'fs'
/* import path from 'path' */
/* const __dirname = path.resolve() */
/* const input = fs.readFileSync(path.resolve(__dirname, 'day_7/day_7_input'), 'utf8') */
const input = fs.readFileSync('./day_7_input', 'utf8')
const programCodes = input.toString().split(',').map(Number)

const input43210 = fs.readFileSync('./day_7_input_part_1_43210', 'utf8')
const programCodes43210 = input43210.toString().split(',').map(Number)
const input54321 = fs.readFileSync('./day_7_input_part_1_54321', 'utf8')
const programCodes54321 = input54321.toString().split(',').map(Number)
const input65210 = fs.readFileSync('./day_7_input_part_1_65210', 'utf8')
const programCodes65210 = input65210.toString().split(',').map(Number)

const IntcodeComputer = (programCodes, phaseSetting, inputSignal) => {
  let outputSignal = null
  let firstTimeOpcode3 = true
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
      if (!firstTimeOpcode3) {
        programCodes[programCodes[i + 1]] = inputSignal
      }

      if (firstTimeOpcode3) {
        programCodes[programCodes[i + 1]] = phaseSetting
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
  return outputSignal
}

const getAllPermutations = arrayToPermutate => {
  const allPermutations = []
  for (let i = 0; i < arrayToPermutate.length; i = i + 1) {
    const rest = getAllPermutations(arrayToPermutate.slice(0, i).concat(arrayToPermutate.slice(i + 1)))
    if (!rest.length) { allPermutations.push([arrayToPermutate[i]]) } else { for (let j = 0; j < rest.length; j = j + 1) { allPermutations.push([arrayToPermutate[i]].concat(rest[j])) } }
  }
  return allPermutations
}

const allPhaseSettings = getAllPermutations([0, 1, 2, 3, 4])
let inputSignal = 0
let highestOutputSignal = 0
allPhaseSettings.forEach(phaseSettings => {
  phaseSettings.forEach(phaseSetting => {
    inputSignal = IntcodeComputer([...programCodes], phaseSetting, inputSignal)
  })
  if (highestOutputSignal < inputSignal) {
    highestOutputSignal = inputSignal
  }
  inputSignal = 0
})
console.log(`Final output: ${highestOutputSignal}`)

/// //////////////
/// Test cases ///
/// //////////////

/* const phaseSetting43210 = [4, 3, 2, 1, 0]
let inputSignal43210 = 0
phaseSetting43210.forEach(phaseSetting => {
  inputSignal43210 = IntcodeComputer(programCodes43210, phaseSetting, inputSignal43210)
})
console.log(`Final output 43210: ${inputSignal43210}`)

const phaseSetting54321 = [0, 1, 2, 3, 4]
let inputSignal54321 = 0
phaseSetting54321.forEach(phaseSetting => {
  inputSignal54321 = IntcodeComputer(programCodes54321, phaseSetting, inputSignal54321)
})
console.log(`Final output 54321: ${inputSignal54321}`)

const phaseSetting65210 = [1, 0, 4, 3, 2]
let inputSignal65210 = 0
phaseSetting65210.forEach(phaseSetting => {
  inputSignal65210 = IntcodeComputer(programCodes65210, phaseSetting, inputSignal65210)
})
console.log(`Final output 65210: ${inputSignal65210}`) */
