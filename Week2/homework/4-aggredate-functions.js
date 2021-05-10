import {
  connection,
  checkError,
  useDatabase,
  executeQueries,
} from "./initialization.js";

//
const queries = [
  `SELECT 
     paper_title, COUNT(project_author) AS authors
     FROM research_Papers
     JOIN matching_projects
     ON paper_id = project_paper
     GROUP BY paper_id`,
  `SELECT
     COUNT(*), gender
     FROM matching_projects
     JOIN authors 
     ON project_author = author_no 
     WHERE gender = 'female'`,
  `SELECT
     university, AVG(h_index)
     FROM authors
     GROUP BY university`,
  `SELECT 
     university, COUNT(project_paper) 
     FROM authors
     JOIN matching_projects
     ON author_no = project_author
     GROUP BY university`,
  `SELECT
     university, MIN(h_index), MAX(h_index)
     FROM authors 
     GROUP BY university`,
];

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week2_homework`);
executeQueries(queries);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
