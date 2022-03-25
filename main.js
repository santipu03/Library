// DOM Manipulation
const main = document.querySelector(".main");
const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal-overlay");
const submitBook = document.querySelector(".submit-btn");
const inputTitle = document.querySelector(".title");
const inputAuthor = document.querySelector(".title");
const inputPages = document.querySelector(".title");
const inputRead = document.querySelector(".title");
const closeBtnModal = document.querySelector(".fa-xmark");



addBtn.addEventListener("click", () => {
    modal.classList.add("show");
})
submitBook.addEventListener("click", ()=> {
    console.log(inputTitle.textContent);
    modal.classList.remove("show");
    addBookToLibrary();
})
closeBtnModal.addEventListener("click", () => {
    modal.classList.remove("show");
})



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


addBookToLibrary("Tolkien","Lord of the Rings","2500","read");
addBookToLibrary("Stephen King","The Shining","750","not read")

console.log(myLibrary);


const createCard = () => {
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
    newReadBtn.classList.add("read-btn");
    newCard.appendChild(newTitle);
    newCard.appendChild(newAuthor);
    newCard.appendChild(newPages);
    newCard.appendChild(newReadBtn);
    newCard.appendChild(newRemoveBtn);
    
    return newCard;
}




const displayBooks = (library) => {
    library.forEach(book => {
        let newCard = createCard();
        newCard.children[0].textContent = book.title;
        newCard.children[1].textContent = book.author;
        newCard.children[2].textContent = book.pages;
        newCard.children[3].textContent = book.read;
        newCard.children[4].textContent = "Remove";
        main.appendChild(newCard);
        console.log(newCard);
    });
}



const moveAddButton = () => (addBtn.nextElementSibling !== null)? main.appendChild(addBtn): 0;



displayBooks(myLibrary);
moveAddButton();




