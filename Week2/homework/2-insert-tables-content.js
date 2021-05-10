import {
  connection,
  checkError,
  useDatabase,
  insertTableContent,
} from "./initialization.js";
import { authors, research_Papers, matching_projects } from "./data.js";

//chosen columns of table authors to insert content init:
const authorsColumns = `author_name, university, date_of_birth, h_index, gender, mentor`;

//chosen columns of table research_Papers to insert content init:
const researchPapersColumns = `paper_title, conference, publish_date`;

//chosen columns of table matching_projects to insert content init:
const matchingColumns = `project_author, project_paper`;

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week2_homework`);
insertTableContent(`authors`, authorsColumns, authors);
insertTableContent(`research_Papers`, researchPapersColumns, research_Papers);
insertTableContent(`matching_projects`, matchingColumns, matching_projects);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
