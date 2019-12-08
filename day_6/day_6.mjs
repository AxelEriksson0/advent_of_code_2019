import fs from 'fs'

const input = fs.readFileSync('./day_6_input', 'utf8')
const orbitRelationships = input.toString().split('\n')
const orbits = {}
let numberOfOrbits = 0

orbitRelationships.forEach(orbit => {
  const [parent, child] = orbit.split(')')

  if (!{}.hasOwnProperty.call(orbits, parent)) {
    orbits[parent] = []
  }
  orbits[parent].push(child.trim())
})

const countOrbits = children => {
  if (children) {
    children.forEach(child => {
      const childrensChildren = orbits[child.trim()]
      if (childrensChildren) {
        const directOrbits = childrensChildren.length
        numberOfOrbits += directOrbits
      }
      console.log(numberOfOrbits)
      countOrbits(childrensChildren)
    })
  }
}

/* Object.keys(orbits).forEach(parent => {
  const children = orbits[parent]
  const directOrbits = children.length
  numberOfOrbits += directOrbits

  countOrbits(children)
}) */

const rootToYOU = 0
const rootToYOUOrbits = []
const rootToSAN = 0
const rootToSANOrbits = []

const rootToTarget = (target, targetOrbit, propertyToFind) => {
  Object.entries(orbits).forEach(orbit => {
    const [newPropertyToFind, children] = [...orbit]
    if (children.includes(propertyToFind)) {
      target += 1
      targetOrbit.push(propertyToFind)

      rootToTarget(target, targetOrbit, newPropertyToFind)
    }
  })
}

Object.entries(orbits).forEach(orbit => {
  const [parentProperty, children] = [...orbit]
  if (children.includes('YOU')) {
    rootToTarget(rootToYOU, rootToYOUOrbits, parentProperty)
  }
})

Object.entries(orbits).forEach(orbit => {
  const [parentProperty, children] = [...orbit]
  if (children.includes('SAN')) {
    rootToTarget(rootToSAN, rootToSANOrbits, parentProperty)
  }
})

let commonOrbit = null

for (let i = 0; i < rootToYOUOrbits.length; i++) {
  if (rootToSANOrbits.includes(rootToYOUOrbits[i])) {
    commonOrbit = rootToYOUOrbits[i]
    break
  }
}

const indexOfFirst = rootToYOUOrbits.indexOf(commonOrbit)
const indexOfSecond = rootToSANOrbits.indexOf(commonOrbit)

console.log('Orbits separating them: ', indexOfFirst + indexOfSecond)
