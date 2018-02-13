const jsonfile = require('jsonfile')

const file = 'rawr.json'

const fileObj = jsonfile.readFileSync(file)

const obj = {
  template: 'rawr',
  url: 'github.com',
}

const obj2 = {
  template: 'eslint',
  url: 'airbnb',
}

const newFileObj = {
  ...fileObj,
  templates: {
    ...fileObj.templates,
    [obj.template]: obj.url,
    [obj2.template]: obj2.url,
  }
}

console.log(newFileObj)

jsonfile.writeFile('new-to-delete.json', newFileObj, { spaces: 2 }, function (err) {
  console.error(err)
})
