"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const read_json_1 = require("./utils/read-json");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "templates"));
app.use(body_parser_1.default.json());
app.get("/search/", (req, res) => {
    const booksData = (0, read_json_1.readBooksData)();
    let queryName = req.query.name;
    let books = booksData.filter((book) => book.name.startsWith(queryName));
    if (books.length === 0) {
        return res.json("No books found");
    }
    res.render("bookslist", { books });
    return res.json(books);
});
app.get("/books/:name", (req, res) => {
    const booksData = (0, read_json_1.readBooksData)();
    const bookName = req.params.name;
    console.log(bookName);
    const book = booksData.find((book) => book.name === bookName);
    if (book) {
        res.render("bookdetails", { book });
    }
    else {
        res.status(404).send("Book not found");
    }
});
app.listen(3000, "localhost", () => {
    console.log("server is running on port 3000");
});
