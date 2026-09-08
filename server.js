const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Main Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'main.html'));
});

// Route handling for HTML files inside public/html/
app.get('/:page.html', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, 'public', 'html', `${page}.html`));
});

app.use((req, res) => {
  res.status(404).send('404: Resource Not Found');
});

app.listen(PORT, () => {
  console.log(`LMS Server running at http://localhost:${PORT}`);
});