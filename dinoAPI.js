import express from 'express';

import {dinosRouter} from "./dinos.route.js";
//import {quizzesRouter} from "./quizzes/quizzes.route.js";
const app = express();
const PORT = 3005;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths handled by dinosRouter
app.use(dinosRouter)

// new addition!
// paths handled by quizzesRouter
//app.use(quizzesRouter)

app.get("/", (req, res) => res.send("Server 3: Hello World!"));


// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("In dinoAPI.js Server listening on Port", PORT);
});
