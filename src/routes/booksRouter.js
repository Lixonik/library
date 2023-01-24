import Router from 'express'
import path from 'path'
import table from "../database/books.json" assert {type: 'json'}


const __dirname = path.resolve()
const indexPath = path.join(__dirname, '/public/index.html')

let books = table
console.log(indexPath)

const router = new Router()

router.get("/books", (req, res) => {
    res.sendFile(indexPath)
});


router.post("/books", (req, res) => {
    res.status(200).json(books);
})

router.post("/uploadBook", (req, res) => {
    books.push(req.body);
    res.writeHead(200, {
        "Content-Type": "application/message"
    });
    res.end();
}) // добавление новой книги

router.delete("/books/:id", (req, res) => {
    let deleteBookIndex = books.findIndex(book => book.id === req.params.id);
    books.splice(deleteBookIndex, 1);
    res.end();
}) // удаление какой-то книги

router.get("/books/:id", (req, res) => {
    let book = books.find(book => book.id === req.params.id);
    res.render("book", {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        release: book.release,
        status: "Status: " + book.status,
        renter: book.renter,
        pathToImg: ".." + book.pathToImg,
    });
}) // получение какой-то книги

router.put("/books", (req, res) => {
    let index = books.findIndex(book => book.id === req.body.id);
    books[index].title = req.body.title;
    books[index].author = req.body.author;
    books[index].genre = req.body.genre;
    books[index].release = req.body.release;
    books[index].status = req.body.status;
    books[index].renter = req.body.renter;
    res.end();
}) // редактирование какой-то книги

export default router
