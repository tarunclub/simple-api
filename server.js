require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8001;

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello ,World",
  });
});

app.get("/api/courses", (req, res) => {
  res.status(200).send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    res.status(404).json({
      success: false,
      message: "Object with the same id is not available",
    });

  res.status(200).send(course);
  //   res.status(200).send(req.query)
});

// HTTP POST request
app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.status(201).send(course);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
