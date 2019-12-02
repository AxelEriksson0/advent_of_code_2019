import fs from 'fs'

const input = fs.readFileSync('./day_2_input', 'utf8')
const originalProgramCodes = input.toString().split(',').map(Number)

const runProgram = (programCodes, noun, verb) => {
  programCodes[1] = noun
  programCodes[2] = verb
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

  if (programCodes[0] === 19690720) {
    console.log(`You found the solution!
    ProgramCodes[0] = ${programCodes[0]}
    Noun = ${noun}
    Verb = ${verb}
    `)
  }
}

const nouns = Array.from(Array(10000).keys())
const verbs = Array.from(Array(10000).keys())

nouns.forEach(noun => {
  verbs.forEach(verb => {
    runProgram([...originalProgramCodes], noun, verb)
  })
})

/* runProgram([...originalProgramCodes], 12, 2) */
