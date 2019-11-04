import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const createTables = () => {
  const users = `
    CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(250) PRIMARY KEY,
        firstname VARCHAR(250) NOT NULL,
        lastname VARCHAR(250) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        reminder VARCHAR(250) NOT NULL, 
        created_date VARCHAR(250) NOT NULL,
        password VARCHAR(250) NOT NULL
    );`;
  const entries = `
    CREATE TABLE IF NOT EXISTS entries(
        id VARCHAR(250) PRIMARY KEY,
        title VARCHAR (250) NOT NULL,
        description VARCHAR (250) NOT NULL,
        created_by VARCHAR (250) NOT NULL,
        created_date VARCHAR (250) NOT NULL,
        modified_date VARCHAR (250) NOT NULL
    );`;
  const createUser1 = `
    INSERT INTO 
    users(id, firstname, lastname, email,reminder, created_date, password) 
    VALUES(
      '9011eecd-6575-420b-8705-cd2aa1bd58f7',
      'firstname',
     'lastname',
     'email@gmail.com',
     'off',
     'Monday, November 4, 2019 11:05 AM',
     '$2b$10$XwBcl5JnZumu8D0oNRF81eWkIelL5VZ36lmYy38rJtJwSDCQuGxOS');`;
  const createUser2 = `
     INSERT INTO 
     users(id, firstname, lastname, email,reminder, created_date, password) 
     VALUES(
       '9011eecd-6575-420b-8705-cd2aa1bd58f4',
       'firstname2',
      'lastname2',
      'email2@gmail.com',
      'off',
      'Monday, November 4, 2019 11:05 AM',
      '$2b$10$XwBcl5JnZumu8D0oNRF81eWkIelL5VZ36lmYy38rJtJwSDCQuGxOS');`;
  const createEntry1 = `
    INSERT INTO
    entries(id, title, description, created_by,created_date, modified_date)
    VALUES('63835241-9fee-435f-a4ce-2bbb99fc896b',
    'my first entry',
    'my description',
    'email@gmail.com',
    'Monday, November 4, 2019 9:02 AM',
    'Monday, November 4, 2019 9:02 AM');
    `;
  const createEntry2 = `
    INSERT INTO
    entries(id, title, description, created_by,created_date, modified_date)
    VALUES('39b252f5-77b9-4231-8965-ffef1b8b510c',
    'my first entry 2',
    'my description 2',
    'email2@gmail.com',
    'Monday, November 4, 2019 9:02 AM',
    'Monday, November 4, 2019 9:02 AM');
    `;
  const queries = `${users};${entries};${createUser1};${createUser2};${createEntry1};${createEntry2}`;
  pool.query(queries).then((res) => {
    console.log(res);
    pool.end();
    return res;
  })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
export const dropTables = () => {
  const drop = `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS entries CASCADE;
    `;
  const Queries = `${drop}`;
  pool.query(Queries).then((res) => {
    pool.end();
    return res;
  })
    .catch((error) => {
      console.log(error);
      pool.end();
    });
};

require('make-runnable');
