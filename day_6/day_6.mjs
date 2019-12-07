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
  orbits[parent].push(child)
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

Object.keys(orbits).forEach(parent => {
  const children = orbits[parent]
  const directOrbits = children.length
  numberOfOrbits += directOrbits

  countOrbits(children)
})
