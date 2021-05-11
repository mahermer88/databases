import {
  connection,
  checkError,
  useDatabase,
  insertTableContent,
  jsonReader,
} from "./initialization.js";

const authors = jsonReader("./data_authors.json");
const research_Papers = jsonReader("./data_research_Papers.json");
const matching_projects = jsonReader("./data_matching_projects.json");

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week2_homework`);
insertTableContent(`authors`, authors);
insertTableContent(`research_Papers`, research_Papers);
insertTableContent(`matching_projects`, matching_projects);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
