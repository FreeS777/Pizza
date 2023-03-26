const express = require("express");
const path = require("path");

const app = express();

// Добавить middleware для обслуживания статических файлов из папки 'build'
app.use(express.static(path.join(__dirname, "build")));

// Добавить обработчик для всех GET-запросов, которые не соответствуют другим маршрутам
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Запустить сервер на порту 5000
app.listen(5000);
