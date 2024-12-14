// Install dependencies: express, body-parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// LED states and modes
let ledState = "off"; // Possible states: "on", "off", "blink_square", "blink_dual"

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/led', (req, res) => {
  res.json({ state: ledState });
});


app.post('/api/led', (req, res) => {
  const { action } = req.body;
  if (["on", "off", "blink_square", "blink_dual"].includes(action)) {
    ledState = action;
    res.json({ state: ledState });
  } else {
    res.status(400).json({ error: "Invalid action" });
  }
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
