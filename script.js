// import dependencies
const axios = require("axios");
const inquirer = require('inquirer');
const fs = require('fs');

// prompt user for information
inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is your name?',
      name: 'username',
      default: 'Alex'
    },
    {
      type: 'checkbox',
      message: 'What languages do you know?',
      name: 'languages',
      choices: ['HTML', 'CSS', 'JavaScript', 'SQL', 'Mongo']
    },
    {
      type: 'list',
      message: 'What is your preferred method of communication?',
      name: 'communication',
      choices: ['Electronic Mail', 'Phone', 'Text', 'Carrier Pigeon', 'Fox', 'Slack']
    },
    {
      type: 'number',
      message: 'What is your age?',
      name: 'age',
      validate: function (ageInput) {
        if (ageInput > 0 && ageInput < 150) {
          return true;
        } else {
          console.log('You need to give an age between 1 and 149');
          return false;
        }
      }
    }
  ])

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function (res) {
      const repoNames = res.data.map(function (repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function (err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });
  .then(function (response) {
    fs.writeFile(`${response.username}.json`, JSON.stringify(response, null, 2), err => {
      if (err) {
        return console.log(err);
      }

      console.log('Success!');
    });
  })
