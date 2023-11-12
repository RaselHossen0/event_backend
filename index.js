import  express  from "express";
import oracledb from 'oracledb';
const app=express()

app.listen(8800,()=>{
    console.log('server connected');
})
const dbConfig = {
    user: 's2020015668',
    password: 'db2023',
    connectString: '103.221.254.51:1521/pdbdbms2023.cse.du.ac.bd', // e.g., 'remote-oracle-server:1521/your_service_name'
  };
  oracledb.getConnection(dbConfig, (err, connection) => {
    if (err) {
      console.error('Error connecting to Oracle:', err);
      return;
    }
    connection.execute('CREATE TABLE users (name VARCHAR2(50), id NUMBER)', (createTableErr, result) => {
      if (createTableErr) {
        console.error('Error creating table:', createTableErr);
      } else {
        console.log('Table created successfully');
      }
    });
    // Connection successful - you can now execute SQL queries here
  

  });
  
 app.get('/',(req,res)=>{
        res.json('Hello from data base');
 })