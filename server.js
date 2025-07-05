const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const statsPath = path.join(__dirname, 'stats.json');
const PORT = 3000;

app.use(express.static('public')); // serve your HTML/CSS/JS
app.use(express.json()); // for parsing application/json

// Endpoint to get stats
app.get('/stats', (req, res) => {
  try {
    const data = fs.readFileSync(statsPath);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Could not read stats.json' });
  }
});

// Endpoint to update stats
app.post('/stats', (req, res) => {
  fs.writeFileSync(statsPath, JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
