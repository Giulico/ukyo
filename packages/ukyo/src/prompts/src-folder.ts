const { Select } = require('enquirer')

export default new Select({
  type: 'list',
  message: "The folder './src' already exists. Override it?",
  name: 'src-folder',
  choices: [
    {
      message: "Yes, remove './src' folder and start with a fresh copy of it",
      name: 'override',
    },
    {
      message: "No, wait! Exit Ukyo, I'll handle this by my self.",
      name: 'exit',
    },
  ],
})
