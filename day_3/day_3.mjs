import fs from 'fs'

const input = fs.readFileSync('./day_3_input', 'utf8')
const wires = input.toString().split('\n')

const wire1 = wires[0].split(',')
const wire2 = wires[1].split(',')
const wire1Presence = []
const wire1Location = {
  x: 0,
  y: 0
}

const wire2Presence = []
const wire2Location = {
  x: 0,
  y: 0
}

wire1.forEach(direction => {
  const letter = direction[0]
  const number = Number(direction.substr(1))

  if (letter === 'R') {
    for (let i = 1; i <= number; i++) {
      wire1Presence.push({
        x: wire1Location.x + i,
        y: wire1Location.y
      })
    }
    wire1Location.x += number
  }

  if (letter === 'L') {
    for (let i = 1; i <= number; i++) {
      wire1Presence.push({
        x: wire1Location.x - i,
        y: wire1Location.y
      })
    }
    wire1Location.x -= number
  }

  if (letter === 'U') {
    for (let i = 1; i <= number; i++) {
      wire1Presence.push({
        x: wire1Location.x,
        y: wire1Location.y + i
      })
    }
    wire1Location.y += number
  }

  if (letter === 'D') {
    for (let i = 1; i <= number; i++) {
      wire1Presence.push({
        x: wire1Location.x,
        y: wire1Location.y - i
      })
    }
    wire1Location.y -= number
  }
})

wire2.forEach(direction => {
  const letter = direction[0]
  const number = Number(direction.substr(1))

  if (letter === 'R') {
    for (let i = 1; i <= number; i++) {
      wire2Presence.push({
        x: wire2Location.x + i,
        y: wire2Location.y
      })
    }
    wire2Location.x += number
  }

  if (letter === 'L') {
    for (let i = 1; i <= number; i++) {
      wire2Presence.push({
        x: wire2Location.x - i,
        y: wire2Location.y
      })
    }
    wire2Location.x -= number
  }

  if (letter === 'U') {
    for (let i = 1; i <= number; i++) {
      wire2Presence.push({
        x: wire2Location.x,
        y: wire2Location.y + i
      })
    }
    wire2Location.y += number
  }

  if (letter === 'D') {
    for (let i = 1; i <= number; i++) {
      wire2Presence.push({
        x: wire2Location.x,
        y: wire2Location.y - i
      })
    }
    wire2Location.y -= number
  }
})

// Taken from part 1
const fastestIntersection = { x: 525, y: -543 }

const stepsWire1 = wire1Presence.findIndex(obj => obj.x === fastestIntersection.x && obj.y === fastestIntersection.y) + 1
const stepsWire2 = wire2Presence.findIndex(obj => obj.x === fastestIntersection.x && obj.y === fastestIntersection.y) + 1
console.log(`Total steps is ${stepsWire1 + stepsWire2}`)

// Part 1 code
/* const matchingObjects = wire1Presence.filter((object1, index) => {
  console.log(index)
  return wire2Presence.some(object2 => {
    if (object1.x === object2.x && object1.y === object2.y) {
      return object2
    }
  })
})

console.log(matchingObjects) */
