const moons = [
  { name: 'IO', x_position: 3, y_position: 2, z_position: -6, x_velocity: 0, y_velocity: 0, z_velocity: 0 },
  { name: 'Europa', x_position: -13, y_position: 18, z_position: 10, x_velocity: 0, y_velocity: 0, z_velocity: 0 },
  { name: 'Ganymede', x_position: -8, y_position: -1, z_position: 13, x_velocity: 0, y_velocity: 0, z_velocity: 0 },
  { name: 'Callisto', x_position: 5, y_position: 10, z_position: 4, x_velocity: 0, y_velocity: 0, z_velocity: 0 }
]

const changeInXPosition = 0
const changeInYPosition = 0
const changeInZPosition = 0
const changeInXVelocity = 0
const changeInYVelocity = 0
const changeInZVelocity = 0

/* for (let i = 0; i < 1000; i++) {
} */

moons.forEach(moon => {
  moons.forEach(moonToCompare => {
    if (moonToCompare !== moon) {
      if (moon.x_position > moonToCompare.x_position) {
        moon.x_velocity -= 0.5
        moonToCompare.x_velocity += 0.5
      }
      if (moon.x_position < moonToCompare.x_position) {
        moon.x_velocity -= 0.5
        moonToCompare.x_velocity += 0.5
      }
    }
  })
})

console.log(moons)

// What is the total energy in the system after simulating the moons given in your scan for 1000 steps?
