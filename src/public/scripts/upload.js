let addBtn = document.getElementById("add");
let popup = document.getElementById("add_popup");
let input = document.querySelectorAll(".popup-input");
let submitBtn = document.getElementById("submit");

for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("input", () => {
        let params = [];
        input.forEach(param => params.push(param.value));
        submitBtn.disabled = params.includes("");
    })
}

submitBtn.addEventListener("click", uploadBook);

addBtn.addEventListener("click", () => {
    setTimeout(() => {
        if (!popup.classList.contains("look")) {
            popup.classList.add("look");
            addBtn.disabled = true;
        }
    }, 50);
});

document.addEventListener("click", (event) => {
    if (!event.target.closest("#add_popup") && popup.classList.contains("look")) {
        clearPopup();
    }
});

function clearPopup() {
    input.forEach(param => param.value = "");
    popup.classList.remove("look");
    addBtn.disabled = false;
}

function uploadBook() {
    let book = JSON.stringify({
        title: input[0].value,
        author: input[1].value,
        genre: input[2].value,
        release: input[3].value,
        status: "available",
        renter: "",
        pathToImg: "/public/images/book_cover_template.jpg",
        id: (parseInt(grid[grid.length - 1].id) + 1).toString()
    });

    fetch("/uploadBook", {
        method: "POST",
        body: book,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(() => {
            clearPopup();
            postGrid();
        })
        .catch((err) => {
            console.error(err);
        });
}
