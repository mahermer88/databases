import {
  connection,
  checkError,
  useDatabase,
  insertTableContent,
  jsonReader,
} from "./initialization.js";

const account = jsonReader("./2-transactions-data-table1.json");
const account_changes = jsonReader("./2-transactions-data-table2.json");

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week3_homework`);
insertTableContent(`account`, account);
insertTableContent(`account_changes`, account_changes);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
