import fs from 'fs'

const input = fs.readFileSync('./day_8_input', 'utf8')
const encodedImage = input.toString().split('').map(Number)

const layers = []

for (let i = 0; i < encodedImage.length; i += 150) {
  layers.push([
    encodedImage.slice((i), (i + 25)),
    encodedImage.slice((i + 25), (i + 50)),
    encodedImage.slice((i + 50), (i + 75)),
    encodedImage.slice((i + 75), (i + 100)),
    encodedImage.slice((i + 100), (i + 125)),
    encodedImage.slice((i + 125), (i + 150))
  ])
}

const numberOfZeros = layers.map(layer => {
  let zeros = 0
  layer.forEach(image => {
    image.forEach(number => {
      if (number === 0) {
        zeros += 1
      }
    })
  }
  )
  return zeros
})

console.log(numberOfZeros)
// 15 index has the fewest zeros

let numberOfOnes = 0
let numberOfTwos = 0

layers[15].forEach(image => {
  image.forEach(number => {
    if (number === 1) {
      numberOfOnes += 1
    }
    if (number === 2) {
      numberOfTwos += 1
    }
  })
})

console.log(numberOfOnes * numberOfTwos)
