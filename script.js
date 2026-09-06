//Modal
const dialog = document.querySelector("#myDialog");
const openBtn = document.querySelector("#openModalBtn");
const closeBtn = document.querySelector("#closeModalBtn");

//Form
const titleInput = document.querySelector("#addTitle");
const authorInput = document.querySelector("#addAuthor");

const addBookBtn = document.querySelector("#addBookBtn");

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
}

addBookToLibrary("On the Road", "Jack Karouac", 267, true)
console.log(myLibrary);

openBtn.addEventListener("click", () => {
    dialog.showModal()
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});

addBookBtn.addEventListener("click", (e) => {
    e.preventDefault();

    
})