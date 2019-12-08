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

const image = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
]

let numberOfChanges = 0

layers.forEach(layer => {
  layer.forEach((row, rowIndex) => {
    row.forEach((color, colorIndex) => {
      if (image[rowIndex][colorIndex] === 2 && color !== 2) {
        numberOfChanges += 1
        image[rowIndex][colorIndex] = color
      }
    })
  })
})

console.log(numberOfChanges)

image.forEach(row => {
  // Read the message in the console
  console.log(row.join(''))
})
