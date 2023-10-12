import * as path from "path";
import * as fs from "fs";

const booksPath = path.join(__dirname, "/books.json");

export function readBooksData() {
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
