const id = document.URL.split("/").pop();
let backBtn = document.getElementById("back");
let cancelBtn = document.getElementById("cancel");
let editBtn = document.getElementById("edit");
let confirmBtn = document.getElementById("confirm");
let homeBtn = document.getElementById("home");
let deleteBtn = document.getElementById("delete");
let popup = document.getElementById("delete_popup");
let input = document.querySelectorAll("input");
let status = document.getElementById("status");

let editing = false;

backBtn.onclick = () => homeBtn.click();
cancelBtn.onclick = close;
editBtn.onclick = editBook;
confirmBtn.onclick = deleteBook;

deleteBtn.addEventListener("click", () => {
    setTimeout(() => {
        if (!popup.classList.contains("look")) {
            popup.classList.add("look");
            deleteBtn.disabled = true;
        }
    }, 50);
});

document.addEventListener("click", (event) => {
    if (!event.target.closest("#delete_popup") && popup.classList.contains("look")) {
        close();
    }
});

for (i = 0; i < input.length; i++) {
    if (i !== 3) {
        input[i].addEventListener("input", () => {
            let values = [];
            input.forEach(v => {
                if (v.id !== "renter") values.push(v.value);
            });
            editBtn.disabled = values.includes("");
        });
    }
    else {
        input[i].addEventListener("input", (event) => {
            if (event.target.value.length === 0) {
                status.textContent = "Status: available";
            }
            else {
                status.textContent = "Status: rented";
            }
        });
    }
}

function close() {
    popup.classList.remove("look");
    deleteBtn.disabled = false;
}

function editBook() {
    if (editing) {
        editing = false
        editBtn.textContent = "Edit"
        input.forEach(el => el.disabled = true);
        let book = JSON.stringify({
            title: input[0].value,
            author: input[1].value,
            genre: input[2].value,
            release: input[4].value,
            status: status.textContent.split(" ").pop(),
            renter: input[3].value,
            id: id
        }
        );
        fetch("/books", {
            method: "PUT",
            body: book,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    else if (!editing) {
        editing = true
        editBtn.textContent = "Confirm"
        input.forEach(element => element.disabled = false);
    }
}

function deleteBook() {
    fetch("/books/" + id, {
        method: "DELETE"
    })
        .then(() => {
            close();
            homeBtn.click();
        });
}
