const { Select } = require('enquirer')

export default new Select({
  type: 'list',
  name: 'package-manager',
  message: 'Which package manager do you use?',
  choices: [
    {
      message: 'Yarn',
      name: 'yarn',
    },
    {
      message: 'NPM',
      name: 'npm',
    },
  ],
})
