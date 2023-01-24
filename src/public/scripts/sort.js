const sortGroups = document.querySelector(".dropdown-content").querySelectorAll("a");
sortGroups.forEach(a => a.onclick = sortBooks)

function sortBooks(e) {
    switch (this) {
        case sortGroups[0]:
            grid.sort((a, b) => {
                return (a.title).localeCompare(b.title);
            });
            break;
        case sortGroups[1]:
            grid.sort((a, b) => {
                return (a.author).localeCompare(b.author);
            });
            break;
        case sortGroups[2]:
            grid.sort((a, b) => {
                return (a.genre).localeCompare(b.genre);
            });
            break;
        case sortGroups[3]:
            grid.sort((a, b) => {
                A = new Date(a.release)
                B = new Date(b.release)
                if (A > B)
                    return 1;
                if (A < B)
                    return -1;
                return 0;
            });
            break;
    }

    showGrid();
    grid.sort((a, b) => {
        return (a.id).localeCompare(b.id);
    });
}
