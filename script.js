//Modal
const dialog = document.querySelector("#myDialog");
const openBtn = document.querySelector("#openModalBtn");
const closeBtn = document.querySelector("#closeModalBtn");

//Form
const bookForm = document.querySelector("#bookForm")
const titleInput = document.querySelector("#addTitle");
const authorInput = document.querySelector("#addAuthor");
const pagesInput = document.querySelector("#addPages");
const readInput = document.querySelector("#addStatus");
const addBookBtn = document.querySelector("#addBookBtn");

//DOM
const container = document.querySelector(".content");
const allBooksBtn = document.querySelector("#allBooksBtn");
const readBooksBtn = document.querySelector("#readBooksBtn");
const unreadBooksBtn = document.querySelector("#unreadBooksBtn");

const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    const readStatus = this.read ? "Read" : "Not Read Yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}.`
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook
}

function renderFilteredLibrary(booksArray) {
    container.textContent = "";

    booksArray.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;

        const title = document.createElement("h2");
        title.classList.add("title");
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement("h3");
        author.classList.add("author");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.classList.add("pages");
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement("p");
        read.classList.add("read");
        read.textContent = `Status: ${book.read ? "Read" : "Not Read Yet"}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("delete");

        const statusBtn = document.createElement("button");
        statusBtn.textContent = "Change Status";
        statusBtn.classList.add("change-status");

        card.append(title, author, pages, read, removeBtn, statusBtn);
        container.appendChild(card);

        removeBtn.addEventListener("click", () => {
            const bookIndex = myLibrary.findIndex(b => b.id === book.id);
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
            }
            card.remove();
        });

        statusBtn.addEventListener("click", () => {
            const updateStatus = myLibrary.find(b => b.id === book.id);
            if (updateStatus) {
                updateStatus.read = !updateStatus.read;

                read.textContent = `Status: ${updateStatus.read ? "Read" : "Not Read Yet"}`
            } 
        })
    });
}

openBtn.addEventListener("click", () => {
    dialog.showModal()
});

closeBtn.addEventListener("click", () => {
    dialog.close();
    bookForm.reset();
});

addBookBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const isRead = readInput.value === "true";

    addBookToLibrary(title, author, pages, isRead);
    renderFilteredLibrary(myLibrary);

    bookForm.reset();
});

allBooksBtn.addEventListener("click", () => {
    renderFilteredLibrary(myLibrary)
})

readBooksBtn.addEventListener("click", () => {

    const readBooks = myLibrary.filter(book => book.read === true);
    renderFilteredLibrary(readBooks)
})

unreadBooksBtn.addEventListener("click", () => {

    const unreadBooks = myLibrary.filter(book => book.read === false);
    renderFilteredLibrary(unreadBooks)
})

const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#bookSearch");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput.value.trim().toLowerCase();
    container.textContent = "";

    if (!query) {
        renderFilteredLibrary(myLibrary);
        return
    }

    const searchResults = myLibrary.filter(book => {
        return book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    });
    renderFilteredLibrary(searchResults)
})

renderFilteredLibrary(myLibrary)
