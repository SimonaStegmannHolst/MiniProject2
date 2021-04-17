import express from 'express';

const app = express();
const PORT = 3000; 
app.get('/', (req, res) => res.send('Server: Hello World!'));

app.listen(PORT, function(err){ 
    if (err) console.log("Error in server setup") 
    console.log("Server is running and listening on Port", PORT); 
});

//THIS FILE IS MAYBE OBSOLETE?