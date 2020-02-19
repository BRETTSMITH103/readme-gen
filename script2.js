const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");



// ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)

//   Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing.Check out the badges hosted by[shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your github username?",
      name: "username"
    },
    {
      message: "What is your email?",
      type: "input",
      name: "email"
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
    
  ])

// inquirer
//   .prompt({
//     message: "Enter your GitHub username:",
//     name: "username"
//   })
  .then(ansFunction => {
    const queryUrl = `https://api.github.com/users/${ansFunction.username}`;


    // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.


  // map used to pull all repositories for user and populate new array


      // then(function (res) {
    axios.get(queryUrl).then(({data:{avatar_url}}) => {
    
        // .then(({ username }) => {
        //   const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
        //   return axios.get(queryUrl);

// Template literals are enclosed by the backtick (` `)  (grave accent) character instead of double or single quotes.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals


      const readMeGen = readMeAns => {
        return `

  #Avatar

  ![avatar photo](${readMeAns.avatar_url})

  ## Email
  ${readMeAns.email}


  ## UserName
  ${readMeAns.username} 


  ### Communication  
  ${readMeAns.communication} 


  ### Languages
  ${readMeAns.languages}


  [badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)

  `;
      };
        

      const readMeAns = { ...ansFunction, avatar_url };

      // new readme values (readMeAns) are filled into the readMeGen const
      const newReadMe = readMeGen(readMeAns);



  //     const readMeGen = readMeAns => {
  //       return `[
  // ##${readMeAns.avatar_url}
  // ##${readMeAns.email}
  //  ## ${readMeAns.username} 
  //  ##${readMeAns.communication}  
  // ##${readMeAns.languages}
  // ]`;
  //     };


      // fs.writeFile("./newreadme.md", newReadMe, err function {err}
      //   if (err) {
      //     console.log(err);

      fs.writeFile("./newreadme.md", newReadMe, err => {
        if (err) {
          return console.log(err);
        }
      });
    });
  });