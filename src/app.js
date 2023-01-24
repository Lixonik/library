import express from 'express'
import booksRouter from "./routes/booksRouter.js";

const PORT = 5000;
const app = express();

app.use("/public", express.static("public"));
app.set("view engine", "pug")
app.set("views", "/views")
app.use(express.json())

app.use("/", booksRouter)
app.use("/", (req, res) => {
    res.redirect('books')
})

async function startApp() {
    try {
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

await startApp()
