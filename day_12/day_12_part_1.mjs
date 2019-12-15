const moons = [
  { name: 'IO', x_position: 3, y_position: 2, z_position: -6, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Europa', x_position: -13, y_position: 18, z_position: 10, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Ganymede', x_position: -8, y_position: -1, z_position: 13, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Callisto', x_position: 5, y_position: 10, z_position: 4, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 }
]

/* const moons = [
  { name: 'IO', x_position: -1, y_position: 0, z_position: 2, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Europa', x_position: 2, y_position: -10, z_position: -7, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Ganymede', x_position: 4, y_position: -8, z_position: 8, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 },
  { name: 'Callisto', x_position: 3, y_position: 5, z_position: -1, x_velocity: 0, y_velocity: 0, z_velocity: 0, change_in_x_velocity: 0, change_in_y_velocity: 0, change_in_z_velocity: 0 }
] */

for (let i = 0; i < 1000; i++) {
  moons.forEach(moon => {
    moons.forEach(moonToCompare => {
      if (moonToCompare !== moon) {
        if (moon.x_position > moonToCompare.x_position) {
          moon.change_in_x_velocity -= 1
        }
        if (moon.x_position < moonToCompare.x_position) {
          moon.change_in_x_velocity += 1
        }

        if (moon.y_position > moonToCompare.y_position) {
          moon.change_in_y_velocity -= 1
        }
        if (moon.y_position < moonToCompare.y_position) {
          moon.change_in_y_velocity += 1
        }

        if (moon.z_position > moonToCompare.z_position) {
          moon.change_in_z_velocity -= 1
        }
        if (moon.z_position < moonToCompare.z_position) {
          moon.change_in_z_velocity += 1
        }
      }
    })
  })
  moons.forEach(moon => {
    moon.x_velocity += moon.change_in_x_velocity
    moon.y_velocity += moon.change_in_y_velocity
    moon.z_velocity += moon.change_in_z_velocity
    moon.x_position += moon.x_velocity
    moon.y_position += moon.y_velocity
    moon.z_position += moon.z_velocity
    moon.change_in_x_velocity = 0
    moon.change_in_y_velocity = 0
    moon.change_in_z_velocity = 0
  })
}

console.log(moons)

let totalEnergy = 0

moons.forEach(moon => {
  totalEnergy += (Math.abs(moon.x_position) + Math.abs(moon.y_position) + Math.abs(moon.z_position)) * (Math.abs(moon.x_velocity) + Math.abs(moon.y_velocity) + Math.abs(moon.z_velocity))
})

console.log(totalEnergy)

// What is the total energy in the system after simulating the moons given in your scan for 1000 steps?
