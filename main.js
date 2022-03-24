// DOM Manipulation
const main = document.querySelector(".main");






myLibrary = [];

function Book (author, title, pages, read) {
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.read = read
};


const addBookToLibrary = (author, title, pages, read) => {
    let book = new Book(author, title, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("JK Rowling","Harry Potter","250",false);
addBookToLibrary("Tolkien","Lord of the Rings","2500",true);
addBookToLibrary("Stephen King","The Shining","750",false)

console.log(myLibrary);


// creation of a new card
let newCard = document.createElement("div");
let newTitle = document.createElement("div");
let newAuthor = document.createElement("div");
let newPages = document.createElement("div");
let newRemoveBtn = document.createElement("button");
let newReadBtn = document.createElement("button");

newCard.classList.add("card");
newTitle.classList.add("title");
newAuthor.classList.add("author");
newPages.classList.add("pages");
newRemoveBtn.classList.add("button");
newRemoveBtn.classList.add("remove");
newReadBtn.classList.add("button");
newReadBtn.classList.add("read");
newCard.appendChild(newTitle);
newCard.appendChild(newAuthor);
newCard.appendChild(newPages);
newCard.appendChild(newRemoveBtn);
newCard.appendChild(newReadBtn);
