function computeSubtasksCompleted(subtasks) {
  return subtasks.filter((subtask) => subtask.isCompleted).length;
}

function checkIfIsInArray(array, name) {
  return array.some(
    (element) => element.name.toLowerCase() === name.toLowerCase()
  );
}

function returnRandomDescription() {
  const descriptions = [
    "E.g Debug a critical software issue in the production environment.",
    "E.g Conduct a code review for the new feature branch.",
    "E.g Set up a CI/CD pipeline for the project.",
    "E.g Implement OAuth 2.0 authentication for the web application.",
    "E.g Optimize database queries for better performance.",
    "E.g Create user stories for the next sprint in JIRA.",
    "E.g Test the application on multiple browsers and devices.",
    "E.g Research and implement a new JavaScript framework for the front-end.",
    "E.g Write unit tests for the API endpoints.",
    "E.g Deploy the latest updates to the cloud server."
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function returnRandomSubtask() {
  const taskTitles = [
    "E.g Fix a critical bug in the login system",
    "E.g Review and merge pull requests for feature X",
    "E.g Configure a load balancer for the web servers",
    "E.g Upgrade the development environment to Node.js 16",
    "E.g Migrate the database to a NoSQL solution",
    "E.g Create a wireframe for the new mobile app",
    "E.g Perform security scans on the application",
    "E.g Implement multi-factor authentication",
    "E.g Optimize website images for faster loading",
    "E.g Write documentation for the REST API",
    "E.g Integrate a third-party API for payment processing",
    "E.g Set up automated testing with Selenium",
    "E.g Optimize Docker containers for resource efficiency",
    "E.g Conduct a usability test for the user interface",
    "E.g Refactor the legacy codebase",
    "E.g Create a technical presentation for stakeholders",
    "E.g Set up version control with Git",
    "E.g Implement responsive design for the website",
    "E.g Test cross-browser compatibility",
    "E.g Troubleshoot a network issue in the office"
  ];

  return taskTitles[Math.floor(Math.random() * taskTitles.length)];
}

export { computeSubtasksCompleted, checkIfIsInArray, returnRandomDescription, returnRandomSubtask };
