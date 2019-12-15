const moonsX = [
  { name: 'IO', x_position: 3, y_position: 2, z_position: -6, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Europa', x_position: -13, y_position: 18, z_position: 10, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Ganymede', x_position: -8, y_position: -1, z_position: 13, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Callisto', x_position: 5, y_position: 10, z_position: 4, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 }
]

const moonsY = [
  { name: 'IO', x_position: 3, y_position: 2, z_position: -6, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Europa', x_position: -13, y_position: 18, z_position: 10, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Ganymede', x_position: -8, y_position: -1, z_position: 13, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Callisto', x_position: 5, y_position: 10, z_position: 4, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 }
]

const moonsZ = [
  { name: 'IO', x_position: 3, y_position: 2, z_position: -6, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Europa', x_position: -13, y_position: 18, z_position: 10, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Ganymede', x_position: -8, y_position: -1, z_position: 13, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Callisto', x_position: 5, y_position: 10, z_position: 4, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 }
]

const initialStateX = JSON.parse(JSON.stringify(moonsX))
const initialStateY = JSON.parse(JSON.stringify(moonsY))
const initialStateZ = JSON.parse(JSON.stringify(moonsZ))

let stepsX = 0
let stepsY = 0
let stepsZ = 0

do {
  stepsX += 1
  moonsX.forEach(moon => {
    moonsX.forEach(moonToCompare => {
      if (moonToCompare !== moon) {
        if (moon.x_position > moonToCompare.x_position) {
          moon.change_in_x_velocity -= 1
        }
        if (moon.x_position < moonToCompare.x_position) {
          moon.change_in_x_velocity += 1
        }
      }
    })
  })
  moonsX.forEach(moon => {
    moon.x_velocity += moon.change_in_x_velocity
    moon.x_position += moon.x_velocity
    moon.change_in_x_velocity = 0
  })
}
while (JSON.stringify(initialStateX) !== JSON.stringify(moonsX))

do {
  stepsY += 1
  moonsY.forEach(moon => {
    moonsY.forEach(moonToCompare => {
      if (moonToCompare !== moon) {
        if (moon.y_position > moonToCompare.y_position) {
          moon.change_in_y_velocity -= 1
        }
        if (moon.y_position < moonToCompare.y_position) {
          moon.change_in_y_velocity += 1
        }
      }
    })
  })
  moonsY.forEach(moon => {
    moon.y_velocity += moon.change_in_y_velocity
    moon.y_position += moon.y_velocity
    moon.change_in_y_velocity = 0
  })
}
while (JSON.stringify(initialStateY) !== JSON.stringify(moonsY))

do {
  stepsZ += 1
  moonsZ.forEach(moon => {
    moonsZ.forEach(moonToCompare => {
      if (moonToCompare !== moon) {
        if (moon.z_position > moonToCompare.z_position) {
          moon.change_in_z_velocity -= 1
        }
        if (moon.z_position < moonToCompare.z_position) {
          moon.change_in_z_velocity += 1
        }
      }
    })
  })
  moonsZ.forEach(moon => {
    moon.z_velocity += moon.change_in_z_velocity
    moon.z_position += moon.z_velocity
    moon.change_in_z_velocity = 0
  })
}
while (JSON.stringify(initialStateZ) !== JSON.stringify(moonsZ))

console.log(stepsX)
console.log(stepsY)
console.log(stepsZ)

function gcd2 (a, b) {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN
  return gcd2(b, a % b)
}
function gcd (array) {
  // Greatest common divisor of a list of integers
  var n = 0
  for (var i = 0; i < array.length; ++i) { n = gcd2(array[i], n) }
  return n
}

function lcm2 (a, b) {
  // Least common multiple of 2 integers
  return a * b / gcd2(a, b)
}

function lcm (array) {
  // Least common multiple of a list of integers
  var n = 1
  for (var i = 0; i < array.length; ++i) { n = lcm2(array[i], n) }
  return n
}

const test = lcm([186028, 84032, 286332])
console.log(test)
