import  express  from "express";
import oracledb from 'oracledb';
const app=express()

app.listen(8800,()=>{
    console.log('server connected');
})

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