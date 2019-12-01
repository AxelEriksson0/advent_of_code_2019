import fs from 'fs'

const input = fs.readFileSync('./day_1_input', 'utf8')
const masses = input.toString().split('\n')
let totalFuel = 0

masses.forEach(mass => {
  mass = Number(mass)
  let fuelRemaining = mass
  let fuelRequiredForThisMass = 0

  while (fuelRemaining > 0) {
    const fuel = Math.floor(fuelRemaining / 3) - 2
    if (fuel <= 0) {
      break
    }
    fuelRequiredForThisMass += fuel
    fuelRemaining = fuel
  }
  totalFuel += fuelRequiredForThisMass
})

console.log(totalFuel)
