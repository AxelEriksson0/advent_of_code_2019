import fs from 'fs'

/* const inputs = fs.readFileSync('./day_14_input', 'utf8') */
const inputs = fs.readFileSync('./day_14_input_31', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_165', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_13312', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_180697', 'utf8')

const listOfReactions = inputs
  .toString()
  .split('\n')
  .map(input => input.split(/[,(=>)]+/))
  .map(input => {
    const [amount, outputChemical] = input.splice(-1)[0].trim().split(' ')
    return {
      inputChemicals: input.map(material => {
        const [amount, name] = material.trim().split(' ')
        return {
          name: name,
          amount: Number(amount)
        }
      }),
      outputChemical: outputChemical,
      amount: Number(amount)
    }
  })

const listOfOREReactions = listOfReactions.filter(reaction => {
  return reaction.inputChemicals[0].name === 'ORE'
})

const amountOfORE = listOfOREReactions.map(reaction => {
  return {
    amountOfORENeeded: reaction.inputChemicals[0].amount,
    amountOfORE: 0,
    outputChemical: reaction.outputChemical,
    amountOfOutputChemical: reaction.amount
  }
})

let materialNeeded = [{ name: 'FUEL', amount: 1 }]
let newMaterialNeeded = []
const listOfAllMaterialNeeded = {}
const leftOvers = {}

const findMaterialNeeded = (materialNeeded, newMaterialNeeded) => {
  materialNeeded.forEach(material => {
    const reaction = listOfReactions.find(reaction => reaction.outputChemical === material.name)
    reaction.inputChemicals.forEach(inputChemical => {
      if (inputChemical.name === 'ORE') {
        const OREReaction = amountOfORE.find(reaction => reaction.outputChemical === material.name)
        const multiplier = material.amount / OREReaction.amountOfOutputChemical
        OREReaction.amountOfORE += multiplier * OREReaction.amountOfORENeeded
      } else {
        const multiplier = material.amount / reaction.amount
        newMaterialNeeded.push({
          name: inputChemical.name,
          amount: inputChemical.amount * multiplier
        })
        if (listOfAllMaterialNeeded[inputChemical.name]) {
          listOfAllMaterialNeeded[inputChemical.name] += inputChemical.amount * multiplier
        } else {
          listOfAllMaterialNeeded[inputChemical.name] = inputChemical.amount * multiplier
        }
      }
    })
  })
  return [newMaterialNeeded, []]
}

[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE)
console.log(amountOfORE)

let oreFinal = 0

amountOfORE.forEach(OREReaction => {
  const multiplier = Math.ceil(OREReaction.amountOfORE / OREReaction.amountOfORENeeded)
  oreFinal += multiplier * OREReaction.amountOfORENeeded
})

console.log(oreFinal)
console.log(listOfAllMaterialNeeded)
