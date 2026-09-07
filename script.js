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

const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    const readStatus = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}.`
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook
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
    const read = readInput.value;

    const newBook = addBookToLibrary(title, author, pages, read);

    const card = document.createElement("div")
    const cardTitle = document.createElement("h2");
    const cardAuthor= document.createElement("h3");
    const cardPages = document.createElement("p");
    const cardStatus = document.createElement("p");
    const removeBtn = document.createElement("button");
    const statusBtn = document.createElement("button");

    card.dataset.id = newBook.id;

    card.classList.add("card")

    cardTitle.textContent = `Title: ${title}`;
    cardTitle.classList.add("title");

    cardAuthor.textContent = `Author: ${author}`;
    cardAuthor.classList.add("author");

    cardPages.textContent = `Pages: ${pages}`;
    cardPages.classList.add("pages");

    cardStatus.textContent = `Status: ${read}`;
    cardStatus.classList.add("read");

    removeBtn.textContent = "Remove";
    removeBtn.classList.add("delete");

    statusBtn.textContent = "Change Status";
    statusBtn.classList.add("change-status");

    card.append(cardTitle, cardAuthor, cardPages, cardStatus, removeBtn, statusBtn)

    container.appendChild(card)

    statusBtn.addEventListener("click", () => {
        const bookId = card.dataset.id;
        const targetBook = myLibrary.find(book => book.id === bookId);

        if (targetBook) {
            if (targetBook.read === "read") {
                targetBook.read = "not read yet";
            } else {
                targetBook.read = "read";
            }
            cardStatus.textContent = `Status: ${targetBook.read}`
        }
    })

    removeBtn.addEventListener("click", () => {
        const bookId = card.dataset.id;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);

        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
        }

        card.remove();
        console.log("Updated Library:", myLibrary);
    });
    bookForm.reset();

    
    console.table(myLibrary)
});