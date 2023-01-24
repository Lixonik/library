let rentedBtn = document.getElementById("rented");
let availableBtn = document.getElementById("available");
let grid;

rentedBtn.addEventListener("click", changeGroup, false);
availableBtn.addEventListener("click", changeGroup, false);

postGrid();

function changeGroup(e) {
    if (this == rentedBtn) {
        availableBtn.disabled = false;
        rentedBtn.disabled = true;
    } else if (this == availableBtn) {
        availableBtn.disabled = true;
        rentedBtn.disabled = false;
    }

    showGrid();
}

function postGrid() {
    fetch("/books", {
        method: "POST"
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            grid = res;
            showGrid();
        })
        .catch((err) => {
            console.log(err);
        });
}

function getGridElement(book, opacity) {
    let template = document.getElementById("book-template").text.trim();
    let gridElement = document.createElement("li");
    gridElement.classList.add("book");
    gridElement.innerHTML = template;
    gridElement.querySelector("h2").innerHTML = book.title;
    gridElement.querySelector("a").href = "/books/" + book.id;
    let img = gridElement.querySelector("img");
    img.src = book.pathToImg;
    img.style.opacity = opacity;
    let p = gridElement.querySelectorAll("p");
    p[0].innerHTML = "Author: " + book.author;
    p[1].innerHTML = "Genre: " + book.genre;
    p[2].innerHTML = "Release: " + book.release;
    if (book.status === "rented") {
        p[3].innerHTML = "Renter: " + book.renter;
    }

    return gridElement;
}

function showGrid() {
    document.getElementById("grid").innerHTML = "";

    grid.forEach((book) => {
        let status = "available";
        let opacity = 1;
        if (rentedBtn.disabled === true) {
            status = "rented";
            opacity = 0.8;
        }
        if (book.status === status)
            document.getElementById("grid").appendChild(getGridElement(book, opacity));
    });
}
