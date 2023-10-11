const path = require("path");
const fs = require("fs");
const { raw } = require("express");

const booksPath = path.join(__dirname, "/books.json");

function readBooksData() {
  try {
    const rawData = fs.readFileSync(booksPath, "utf8");
    const booksData = JSON.parse(rawData);
    if (Array.isArray(booksData)) {
      return booksData;
    } else {
      console.error("Invalid books data structure");
      return [];
    }
  } catch (error) {
    console.error("Error reading books data", error);
    return [];
  }
}
module.exports = { readBooksData };
