import {
  connection,
  checkError,
  useDatabase,
  insertTableContent,
  jsonReader,
} from "./initialization.js";

const authors = jsonReader("./data_authors.json");
const research_papers = jsonReader("./data_research_papers.json");
const matching_projects = jsonReader("./data_matching_projects.json");

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week2_homework`);
insertTableContent(`authors`, authors);
insertTableContent(`research_papers`, research_papers);
insertTableContent(`matching_projects`, matching_projects);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
