import {
  connection,
  checkError,
  useDatabase,
  executeQueries,
} from "./initialization.js";

const amount = 1000;
const sending_account = 101;
const receiving_account = 102;

const transactionQueries = [
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
const rollbackQueries = [`ROLLBACK`];

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week3_homework`);

try {
  executeQueries(transactionQueries);
} catch (err) {
  executeQueries(rollbackQueries);
  checkError(err);
}

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
