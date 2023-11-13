import  express  from "express";
import oracledb from 'oracledb';
import bodyParser from 'body-parser';
import cors from 'cors'
const app=express()
app.use(cors());
app.use(bodyParser.json());
const port='8800';



const dbConfig = {
  user: 's2020015668',
  password: 'db2023',
  connectString: '103.221.254.51:1521/pdbdbms2023.cse.du.ac.bd', // e.g., 'remote-oracle-server:1521/your_service_name'
};




  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


  


// API Routes
app.post('/create-event', async (req, res) => {
  try {
    // Get a connection from the Oracle pool
    const connection = await oracledb.getConnection(dbConfig);

    // Extract data from the request body
    const { eventName, eventDate, eventLocation, eventDescription } = req.body;

    // Execute the SQL query to insert a new event
    const randomEventId = Math.floor(Math.random() * 1000000) + 1;

    // Insert the event with the generated event_id
    const result = await connection.execute(
      `INSERT INTO Events (event_id, event_name, event_date, event_location, event_description) 
       VALUES (:eventId, :eventName, TO_DATE(:eventDate, 'YYYY-MM-DD'), :eventLocation, :eventDescription)`,
      { eventId: randomEventId, eventName, eventDate, eventLocation, eventDescription },
      { autoCommit: true } // Commit the transaction immediately
    );

    // Release the connection
    await connection.close();

    res.json({ success: true, message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Error creating event' });
  }
});

// Endpoint to fetch all events
app.get('/get-events', async (req, res) => {
  try {
    // Get a connection from the Oracle pool
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to retrieve all events
    const result = await connection.execute(
      'SELECT * FROM Events'
    );
    console.log(result);

    // Release the connection
    await connection.close();

    // Send the retrieved events as JSON response
    res.json({ success: true, events: result.rows });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Error fetching events' });
  }
});
  
 app.get('/',(req,res)=>{
        res.json('Hello from data base');
 })