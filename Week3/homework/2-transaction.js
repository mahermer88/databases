import {
  connection,
  checkError,
  useDatabase,
  executeQueries,
} from "./initialization.js";

const amount = 1000;
const sending_account = 101;
const receiving_account = 102;

const queries = [
  `START TRANSACTION`,
  `UPDATE account 
    SET balance = balance - ${amount}
    WHERE account_number = ${sending_account}`,
  `UPDATE account 
    SET balance = balance + ${amount}
    WHERE account_number = ${receiving_account}`,
  `INSERT INTO account_changes
    (account_number, amount, remark)
    VALUE
    (${sending_account}, ${amount}, 'OUT'),
    (${receiving_account}, ${amount}, 'IN')`,
  `COMMIT`,
];

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week3_homework`);
executeQueries(queries);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
