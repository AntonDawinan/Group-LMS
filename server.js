const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Redirect root URL to index.html inside public/html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Sample API Endpoint
app.get('/api/courses', (req, res) => {
  const courses = [
    { id: 1, title: 'Web Development 101', description: 'HTML, CSS, & JavaScript Basics' },
    { id: 2, title: 'Database Systems', description: 'Intro to Relational Databases & SQL' },
    { id: 3, title: 'PHP Programming', description: 'Backend Web Development' }
  ];
  res.json(courses);
});

// Fallback for 404 routes
app.use((req, res) => {
  res.status(404).send('404: Resource Not Found');
});

app.listen(PORT, () => {
  console.log(`LMS Server running at http://localhost:${PORT}`);
});