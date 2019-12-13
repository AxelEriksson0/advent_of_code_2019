import fs from 'fs'

const input = fs.readFileSync('./day_10_input', 'utf8').toString().split('')
const asteroidMap = []
let row = []
input.forEach((entry, index) => {
  if (entry === '.' || entry === '#') {
    row.push(entry)
  }
  if (entry === '\r' || index + 1 === input.length) {
    asteroidMap.push(row)
    row = []
  }
})

let asteroidIndex = []
const monitoringStation = { x: 17, y: 22 }
// { x: 17, y: 22 }
asteroidMap.forEach((row, rowIndex) => {
  row.forEach((column, columnIndex) => {
    if (column === '#' && (columnIndex !== monitoringStation.x || rowIndex !== monitoringStation.y)) {
      asteroidIndex.push({
        x: columnIndex,
        y: rowIndex
      })
    }
  })
})

const asteroidsRemoved = []
let lowestDistanceFound = 1337
let lowestAngleFound = 360
let minimumAngle = -0.001
let asteroidToRemove = { x: null, y: null }

for (let i = 0; i < 500; i++) {
  asteroidIndex.forEach(asteroid => {
    let angle = (Math.atan2(monitoringStation.y - asteroid.y, monitoringStation.x - asteroid.x) * 180 / Math.PI) + 270
    if (angle >= 360) { angle = angle - 360 }

    const distance = Math.hypot((monitoringStation.x - asteroid.x), (monitoringStation.y - asteroid.y))

    if (angle <= lowestAngleFound && angle > minimumAngle) {
      if (angle === lowestAngleFound && distance < lowestDistanceFound) {
        lowestDistanceFound = distance
        asteroidToRemove = asteroid
      } else {
        lowestAngleFound = angle
        lowestDistanceFound = distance
        asteroidToRemove = asteroid
      }
    }
  })

  asteroidIndex = asteroidIndex.filter(asteroid => {
    if (asteroid.x === asteroidToRemove.x && asteroid.y === asteroidToRemove.y) {
      asteroidsRemoved.push(asteroidToRemove)
    } else {
      return asteroid
    }
  })

  asteroidToRemove.x === null && asteroidToRemove.y === null ? minimumAngle = -0.001 : minimumAngle = lowestAngleFound
  lowestAngleFound = 360
  lowestDistanceFound = 1337
  asteroidToRemove = { x: null, y: null }
}

console.log(asteroidsRemoved)
console.log(asteroidsRemoved[199])
