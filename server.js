// Install dependencies: express, body-parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// LED states and modes
let ledState = "off"; // Possible states: "on", "off", "blink_square", "blink_dual"

// Track the last access time
let lastAccess = Date.now(); // Initialize with the current time

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// API to get the LED state
app.get('/api/led', (req, res) => {
  res.json({ state: ledState });
  lastAccess = Date.now(); // Update last access timestamp
});

// API to check if the Pi is hooked
app.get('/api/pi_hooked', (req, res) => {
  res.json({ lastAccess: Math.floor(lastAccess / 1000) }); // Send time in seconds
});

// API to update the LED state
app.post('/api/led', (req, res) => {
  const { action } = req.body;
  if (["on", "off", "blink_square", "blink_dual"].includes(action)) {
    ledState = action;
    res.json({ state: ledState });
    lastAccess = Date.now(); // Update last access timestamp
  } else {
    res.status(400).json({ error: "Invalid action" });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
