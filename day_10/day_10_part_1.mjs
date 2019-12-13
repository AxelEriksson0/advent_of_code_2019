import fs from 'fs'

const input = fs.readFileSync('./day_10_input', 'utf8').toString().split('')
const asteroidMap = []

console.log(input)

let row = []
input.forEach((entry, index) => {
  if (entry === '.' || entry === '#') {
    row.push(entry)
  }
  if (entry === '\r') {
    asteroidMap.push(row)
    row = []
  }
  if (index + 1 === input.length) {
    asteroidMap.push(row)
  }
})

const asteroidIndex = []

asteroidMap.forEach((row, rowIndex) => {
  row.forEach((column, columnIndex) => {
    if (column === '#') {
      asteroidIndex.push({
        x: columnIndex,
        y: rowIndex
      })
    }
  })
})

asteroidIndex.forEach(monitoringAsteroid => {
  const angle = []
  asteroidIndex.forEach(asteroidSeen => {
    if (monitoringAsteroid === asteroidSeen) {
    } else {
      const angleDegree = Math.atan2(monitoringAsteroid.y - asteroidSeen.y, monitoringAsteroid.x - asteroidSeen.x) * 180 / Math.PI
      if (!angle.includes(angleDegree)) {
        angle.push(angleDegree)
      }
    }
  })
  monitoringAsteroid.asteroidSeen = angle.length
})

const sortedAsteroid = asteroidIndex.sort((a, b) => a.asteroidSeen - b.asteroidSeen)
sortedAsteroid.forEach(asteroid => {
  console.log(asteroid)
})
