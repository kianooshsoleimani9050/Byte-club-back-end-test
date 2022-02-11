const mongoos = require("mongoose");

const contectToDatabase = (url) =>
  mongoos.connect(url, {
    useNewUrlParser: true,
  });
module.exports = contectToDatabase;
