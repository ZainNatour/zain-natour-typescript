import express, { Request, Response } from "express";
import { readBooksData } from "./utils/read-json";
import path from "path";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "templates"));
app.use(bodyParser.json());

app.get("/search/", (req: Request, res: Response) => {
  const booksData = readBooksData();
  let queryName = req.query.name as string;
  let books = booksData.filter((book) => book.name.startsWith(queryName));

  if (books.length === 0) {
    return res.json("No books found");
  }
  res.render("bookslist", { books });
  return res.json(books);
});

app.get("/books/:name", (req: Request, res: Response) => {
  const booksData = readBooksData();
  const bookName = req.params.name;
  console.log(bookName);
  const book = booksData.find((book) => book.name === bookName);
  if (book) {
    res.render("bookdetails", { book });
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(3000, "localhost", () => {
  console.log("server is running on port 3000");
});
