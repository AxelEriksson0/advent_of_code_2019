import fs from 'fs'

/* const input = fs.readFileSync('./day_14_input', 'utf8') */
/* const input = fs.readFileSync('./day_14_input_test', 'utf8') */
const inputs = fs.readFileSync('./day_14_input_test_2', 'utf8')
  .toString()
  .split('\n')
  .map(input => input.split(/[,(=>)]+/))

const listOfReactions = inputs.map(input => {
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
    amountOfORE: reaction.inputChemicals[0].amount,
    outputChemical: 
  }
})

let amountOfORE = {
  A: {
    amount: 0,
    minimumBuild: 2
  },
  B: {
    amount: 0,
    minimumBuild: 3
  },
  C: {
    amount: 0,
    minimumBuild: 5
  }
}
let materialNeeded = [{ name: 'FUEL', amount: 1 }]
let newMaterialNeeded = []

const findMaterialNeeded = (materialNeeded, newMaterialNeeded, amountOfORE) => {
  materialNeeded.forEach(material => {
    listOfReactions.forEach(reaction => {
      if (reaction.outputChemical === material.name) {
        const multiplier = Math.ceil(reaction.amount / material.amount)
        reaction.inputChemicals.forEach(inputChemical => {
          if (inputChemical.name === 'ORE') {
            if (material.name === 'A') {
              amountOfORE.A.amount += material.amount
            }
            if (material.name === 'B') {
              amountOfORE.B.amount += material.amount
            }
            if (material.name === 'C') {
              amountOfORE.C.amount += material.amount
            }
          } else {
            newMaterialNeeded.push({ name: inputChemical.name, amount: inputChemical.amount * multiplier })
          }
        })
      }
    })
  })

  return [newMaterialNeeded, [], amountOfORE]
}

[materialNeeded, newMaterialNeeded, amountOfORE] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded, amountOfORE] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE);
[materialNeeded, newMaterialNeeded, amountOfORE] = findMaterialNeeded(materialNeeded, newMaterialNeeded, amountOfORE)

console.log(materialNeeded)
console.log(newMaterialNeeded)
console.log(amountOfORE)
/* const finalAmountA = amountOfORE.A.amount % amountOfORE.A.minimumBuild === 0
  ? amountOfORE.A.amount
  : amountOfORE.A.amount - amountOfORE.A.amount % amountOfORE.A.minimumBuild + amountOfORE.A.minimumBuild
const finalAmountB = amountOfORE.B.amount % amountOfORE.B.minimumBuild === 0
  ? amountOfORE.B.amount
  : amountOfORE.B.amount - amountOfORE.B.amount % amountOfORE.B.minimumBuild + amountOfORE.B.minimumBuild
const finalAmountC = amountOfORE.C.amount % amountOfORE.C.minimumBuild === 0
  ? amountOfORE.C.amount
  : amountOfORE.C.amount - amountOfORE.C.amount % amountOfORE.C.minimumBuild + amountOfORE.C.minimumBuild
console.log('Amount of ORE:', finalAmountA + finalAmountB + finalAmountC)
 */
