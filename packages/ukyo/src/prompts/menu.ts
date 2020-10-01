const { Select } = require("enquirer");

export default new Select({
  type: "list",
  name: "package-manager",
  message: "How can I help you?",
  choices: [
    {
      message: "I want to install a fresh version of Ukyo on this folder",
      name: "install",
    },
    {
      message: "I want to upgrade Ukyo",
      name: "upgrade",
    },
  ],
});
