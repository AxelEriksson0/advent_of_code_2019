import fs from 'fs'
const inputs = fs.readFileSync('./day_14_input', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_custom', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_31', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_165', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_13312', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_180697', 'utf8')
// const inputs = fs.readFileSync('./day_14_input_2210736', 'utf8')

const listOfReactions = inputs
  .toString()
  .split('\n')
  .map(input => input.split(/[,(=>)]+/))
  .map(input => {
    const [quantity, outputChemical] = input.splice(-1)[0].trim().split(' ')
    return {
      inputChemicals: input.map(material => {
        const [quantity, name] = material.trim().split(' ')
        return {
          name: name,
          quantity: Number(quantity)
        }
      }),
      outputChemical: outputChemical,
      quantity: Number(quantity)
    }
  })

const leftOvers = listOfReactions.map(reaction => ({
  name: reaction.outputChemical,
  quantity: 0
}))

const calculcateAmountOfOreNeeded = (reaction, leftOvers, materialNeeded) => {
  let ore = 0
  let materialNeededAfterLeftOver = 0
  const leftOver = leftOvers.find(leftOver => leftOver.name === reaction.outputChemical)

  if (leftOver.quantity === 0) {
    materialNeededAfterLeftOver = materialNeeded
  } else if (leftOver.quantity > materialNeeded) {
    leftOver.quantity -= materialNeeded
    materialNeededAfterLeftOver = 0
  } else {
    materialNeeded -= leftOver.quantity
    leftOver.quantity = 0
    materialNeededAfterLeftOver = materialNeeded
  }

  const multiplier = Math.ceil(materialNeededAfterLeftOver / reaction.quantity)
  leftOver.quantity += multiplier * reaction.quantity - materialNeededAfterLeftOver

  reaction.inputChemicals.forEach(inputChemical => {
    if (inputChemical.name === 'ORE') {
      ore += inputChemical.quantity * multiplier
    } else {
      const newReaction = listOfReactions.find(reaction => reaction.outputChemical === inputChemical.name)
      ore += calculcateAmountOfOreNeeded(newReaction, leftOvers, inputChemical.quantity * multiplier)
    }
  })

  return ore
}

const fuelReaction = listOfReactions.find(reaction => reaction.outputChemical === 'FUEL')
const oreNeeded = calculcateAmountOfOreNeeded(fuelReaction, leftOvers, fuelReaction.quantity)
console.log(`Amount of ORE needed: ${oreNeeded}`)
