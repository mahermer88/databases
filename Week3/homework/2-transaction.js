import {
  connection,
  checkError,
  useDatabase,
  executeQueries,
  autoCommit,
  commitOrRollback,
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
];

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week3_homework`);

try {
  autoCommit(0);
  executeQueries(transactionQueries);
  commitOrRollback(`COMMIT`);
  autoCommit(1);
} catch (err) {
  commitOrRollback(`ROLLBACK`);
  checkError(err);
}

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
