import {
  connection,
  checkError,
  useDatabase,
  executeQueries,
} from "./initialization.js";

const queries = [
  `SELECT
     e1.author_name, e2.author_name AS mentor_name
     FROM authors AS e1
     JOIN authors AS e2
     ON e1.mentor = e2.author_no`,
  `SELECT 
     authors.*, paper_title
     FROM authors
     LEFT JOIN matching_projects
     ON author_no = project_author
     LEFT JOIN research_Papers
     ON project_paper = paper_id`,
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
