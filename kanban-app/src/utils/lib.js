/* eslint-disable no-unused-vars */

function computeSubtasksCompleted(subtasks) {
  return subtasks.filter((subtask) => subtask.isCompleted).length;
}

function checkIfIsInArray(array, name) {
  return array.some(
    (element) => element.name.toLowerCase() === name.toLowerCase()
  );
}

function validateSubmit(title, inputFields, setValidationMessage) {
  if (title === "") {
    setValidationMessage("Title cannot be empty");
    return false;
  }
  if (inputFields.length === 0) {
    setValidationMessage("Subtasks cannot be empty");
    return false;
  }
  return true;
}

function returnRandomDescription() {
  const descriptions = [
    "e.g. Debug a critical software issue in the production environment.",
    "e.g. Conduct a code review for the new feature branch.",
    "e.g. Set up a CI/CD pipeline for the project.",
    "e.g. Implement OAuth 2.0 authentication for the web application.",
    "e.g. Optimize database queries for better performance.",
    "e.g. Create user stories for the next sprint in JIRA.",
    "e.g. Test the application on multiple browsers and devices.",
    "e.g. Research and implement a new JavaScript framework for the front-end.",
    "e.g. Write unit tests for the API endpoints.",
    "e.g. Deploy the latest updates to the cloud server."
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function returnRandomSubtask() {
  const taskTitles = [
    "e.g. Fix a critical bug in the login system",
    "e.g. Review and merge pull requests for feature X",
    "e.g. Configure a load balancer for the web servers",
    "e.g. Upgrade the development environment to Node.js 16",
    "e.g. Migrate the database to a NoSQL solution",
    "e.g. Create a wireframe for the new mobile app",
    "e.g. Perform security scans on the application",
    "e.g. Implement multi-factor authentication",
    "e.g. Optimize website images for faster loading",
    "e.g. Write documentation for the REST API",
    "e.g. Integrate a third-party API for payment processing",
    "e.g. Set up automated testing with Selenium",
    "e.g. Optimize Docker containers for resource efficiency",
    "e.g. Conduct a usability test for the user interface",
    "e.g. Refactor the legacy codebase",
    "e.g. Create a technical presentation for stakeholders",
    "e.g. Set up version control with Git",
    "e.g. Implement responsive design for the website",
    "e.g. Test cross-browser compatibility",
    "e.g. Troubleshoot a network issue in the office"
  ];

  return taskTitles[Math.floor(Math.random() * taskTitles.length)];
}

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

export { computeSubtasksCompleted, checkIfIsInArray, returnRandomDescription, returnRandomSubtask, validateSubmit, Right, Left };
