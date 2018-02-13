const fs = require('fs')

const contents = fs.readFileSync('rawr.json', 'utf8')
const craContents = fs.readFileSync('package.json', 'utf8')

const jsonContents = JSON.parse(contents)
const craJsonContents = JSON.parse(craContents)

const dependencies = jsonContents.dependencies
const craDependencies = craJsonContents.dependencies

// console.log(dependencies)
// console.log(craDependencies)

const newDependencies = {
  ...craDependencies,
  ...dependencies
}

const newPackageJson = {
  ...craJsonContents,
  dependencies: { ...newDependencies },
}

// console.log('dependencies: ', newDependencies, '\n')
// console.log('package: ', newPackageJson, '\n')

fs.writeFileSync(
  'new-package.json',
  JSON.stringify(newPackageJson, null, 2),
  'utf8'
)

// fs.stat('new-package.json', (err, status) => {
//   if (err) {
//     console.log(err.code)
//     return
//   }
//   if (stats.isFile()) {
//     console.log('Removing existing json file')
//     unlinkSync('new-package.json')
//   } else {
//     fs.writeFileSync(
//       'new-package.json',
//       JSON.stringify(newPackageJson, null, 2),
//       'utf8'
//     )
//   }
// })

// if (fs.stats.isFile('new-package.json')) {
//   fs.unlinkSync('new-package.json')
// }



// Object.keys(dependencies).forEach(key => console.log(key, dependencies[key]))
