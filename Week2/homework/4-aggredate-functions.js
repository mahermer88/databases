import {
  connection,
  checkError,
  useDatabase,
  executeQueries,
} from "./initialization.js";

//
const queries = [
  `SELECT 
     paper_title, COUNT(author_no) AS authors
     FROM research_papers
     JOIN author_paper
     ON research_papers.paper_id = author_paper.paper_id 
     GROUP BY author_paper.paper_id`,
  `SELECT DISTINCT
     COUNT(*), gender
     FROM author_paper
     JOIN authors 
     ON author_paper.author_no = authors.author_no 
     WHERE authors.gender = 'Female'`,
  `SELECT
     university, AVG(h_index)
     FROM authors
     GROUP BY authors.university`,
  `SELECT DISTINCT
     university, COUNT(paper_id ) 
     FROM authors
     JOIN author_paper
     ON authors.author_no = author_paper.author_no
     GROUP BY authors.university`,
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
