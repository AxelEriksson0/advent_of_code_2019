import fs from 'fs'
import IntcodeComputer from '../util/IntcodeComputer.mjs'

const input = fs.readFileSync('./day_11_input', 'utf8')
const IntcodeProgram = input.toString().split(',').map(Number)

const shipHull = Array(100).fill(Array(100).fill(0))
const position = { x: 50, y: 50, direction: 'up' }
/* const positions = [{ x: 50, y: 50 }] */

const hullPaintingRobot = () => {
  let paint
  let direction
  let IntcodeProgramResult
  let input = 0
  while (direction !== 99 || paint !== 99) {
    paint = IntcodeProgramResult.slice(-2)[0]
    direction = IntcodeProgramResult.slice(-1)[0]

    shipHull[position.y][position.x] = paint

    if (position.direction === 'up') {
      if (direction === 1) {
        position.x += 1
        position.direction = 'right'
      }
      if (direction === 0) {
        position.x -= 1
        position.direction = 'left'
      }
    } else if (position.direction === 'down') {
      if (direction === 1) {
        position.x -= 1
        position.direction = 'left'
      }
      if (direction === 0) {
        position.x += 1
        position.direction = 'right'
      }
    } else if (position.direction === 'right') {
      if (direction === 1) {
        position.y += 1
        position.direction = 'down'
      }
      if (direction === 0) {
        position.y -= 1
        position.direction = 'up'
      }
    } else if (position.direction === 'left') {
      if (direction === 1) {
        position.y -= 1
        position.direction = 'up'
      }
      if (direction === 0) {
        position.y += 1
        position.direction = 'down'
      }
    }
    if (shipHull[position.y][position.x] === 0) {
      input = 0
    } else {
      input = 1
    }
  }
}

hullPaintingRobot()
console.log(shipHull)

/* hullPaintingRobot(IntcodeProgramResult)
console.log(positions)
console.log(positions.length) */

/* for (let i = 0; i < instructions.length; i += 2) {
  const paint = instructions[i]
  const direction = instructions[i + 1]
  shipHull[position.y][position.x] = paint

  if (position.direction === 'up') {
    if (direction === 1) {
      position.x += 1
      position.direction = 'right'
    }
    if (direction === 0) {
      position.x -= 1
      position.direction = 'left'
    }
  } else if (position.direction === 'down') {
    if (direction === 1) {
      position.x -= 1
      position.direction = 'left'
    }
    if (direction === 0) {
      position.x += 1
      position.direction = 'right'
    }
  } else if (position.direction === 'right') {
    if (direction === 1) {
      position.y += 1
      position.direction = 'down'
    }
    if (direction === 0) {
      position.y -= 1
      position.direction = 'up'
    }
  } else if (position.direction === 'left') {
    if (direction === 1) {
      position.y -= 1
      position.direction = 'up'
    }
    if (direction === 0) {
      position.y += 1
      position.direction = 'down'
    }
  }

  for (let i = 0; positions.length; i++) {
    if (positions[i].x !== position.x || positions[i].y !== positions.y) {
      positions.push({ x: position.x, y: position.y })
      break
    }
  }
}
 */
