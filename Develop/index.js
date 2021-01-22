var inquirer = require('inquirer');
var fs = require('fs');


// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [
    generateQuestion('name', 'What is your name?'),
    generateQuestion('project_title', 'What is the title of the project?'),
    generateQuestion('description', 'What is the project description?'),
    generateQuestion('installation', 'What are the steps required to install your project?'),
    generateQuestion('usage', 'Provide instructions and examples for use.'),
    generateQuestion('credits', 'List any collaborators'),
    selectLicenseChoice('license','Please select the license for this project in the list below'),
    generateQuestion('features', 'What features exist for this application?'), 
    generateQuestion('contributing', 'How can other contribute to this application or package?' ),
    generateQuestion( 'tests', 'What tests did you use to reduce the likeliness fo bugs?'),
    generateQuestion( 'question_1', 'What is your Github Username?'),
    generateQuestion( 'question_2', 'What is your email address?')
];

function writeTitle(fileName, projectTitle) {
    fs.writeFile(fileName, "# " + projectTitle , function(err) {
        if (err) {
            console.log("Error occurred while writing to a file.");
            throw err;
        }
        console.log("Successfully wrote data to the given file.");
    } );
}

function appendToReadme(fileName, section, data) {

    fs.appendFile(fileName, "## " + section + "\n\n" + data + "\n\n", function(err) {
        if (err) {
            console.log("Error occurred while writing to a file.");
            throw err;
        }
        console.log("Successfully wrote data to the given file.");
    });
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    writeTitle(fileName, data.project_title + `\n\nAuthor:${data.name}` );

    appendToReadme(fileName, "Description", data.description);
    appendToReadme(fileName, "Table of Contents", generateTableOfContents(["Description","Installation", "Usage", "Credits", "License", "Features", "Contributing","Testing", "Question_1", "Question_2"]));
    appendToReadme(fileName, "Installation", data.installation);
    appendToReadme(fileName, "Usage", data.usage);
    appendToReadme(fileName, "Credits", data.credits);
    appendToReadme(fileName, "License", data.license);
    appendToReadme(fileName, "Features", data.features);
    appendToReadme(fileName, "Contributing", data.contributing);
    appendToReadme(fileName, "Tests", data.tests);
    appendToReadme(fileName, "Question_1", "https://github.com/"+data.question_1);
    appendToReadme(fileName, "Question_2", data.question_2)
    


}


function generateQuestion(name, questionString) {
    return {
        type: 'input',
        message: questionString,
        name: name,
        validate: function (answer) {
          if (answer.length < 1) {
            return 'You must choose at least one topping.';
          }
          return true;
        }
    }
}

function selectLicenseChoice(name, questionString) {
    return {
        type: 'list',
        message: questionString,
        name: name,
        choices: ['Academic Free License v3.0', 'MIT', 'Open Software License 3.0'],
        validate: function (answer) {
          if (answer.length < 1) {
            return 'Please select from the list!';
          }else if (this.choices.indexOf(answer) == -1){
              return "You did not select the correct choice. Try again."
          }
          return true;
        }
    }
}
// Creating a separate function to generate inquirer prompt: 
function runInquirer () {
    inquirer
    .prompt(questions)
    .then((answers) => {
      console.log(JSON.stringify(answers, null, '  '));
      writeToFile("Contributing.md" , answers)
    });
}
var generateTableOfContents = function(table_of_cnts) {
    return table_of_cnts.map(tbl => `* [${tbl}](#${tbl.toLowerCase()})\n`).join("");
}
// TODO: Create a function to initialize app
function init() {
    runInquirer();
}

// Function call to initialize app .the data to print to a file
init();
