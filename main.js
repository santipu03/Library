
// DOM Manipulation
const main = document.querySelector(".main");
const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal-overlay");
const submitBookBtn = document.querySelector(".submit-btn");
const closeBtnModal = document.querySelector(".fa-xmark");
const form = document.getElementById("form");
const modalOverlay = document.querySelector(".modal-overlay");



// array that will store the books
myLibrary = [];
// number of identification for every book
let serialNumber = 0;

class Book {
    constructor (author, title, pages, read, num) {
        this.author = author,
        this.title = title,
        this.pages = pages,
        this.read = read,
        this.num = num
    }
    changeReadStatus () {
        (this.read === "read") ? this.read = "not read" : this.read = "read";
    }
}

// Modal Event Listeners to open and close it
addBtn.addEventListener("click", () => {
    modal.classList.add("show");
})
closeBtnModal.addEventListener("click", () => {
    modal.classList.remove("show");
    form.reset();
})
window.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modal.classList.remove("show");
        form.reset();
    }
})

// Verify that the error message isn't already displayed, create it and display it in the form
const displayErrorMsg = (text) => {
    let message = document.createElement("div");
    message.textContent = text
    message.style.color = "red";
    form.appendChild(message);
    if (message.previousElementSibling !== submitBookBtn){
        message.previousElementSibling.remove()
    }
}

// add book to the array
const addBookToLibrary = (author, title, pages, read) => {

    // create book from constructor
    let book = new Book(author, title, pages, read, serialNumber);
    
    // if there's no books in the array, push it and finish
    if (myLibrary.length == 0) {
        myLibrary.push(book);
        return book;
    }

    // verify that the title of the book is not already in the array and push it. Otherwise, display error and clear form
    let push;
    myLibrary.forEach(item => {
        (item.title === book.title) ? push = false : push = true
    });
            
    if (push) {
            myLibrary.push(book);
            return book;
    } else {
        displayErrorMsg("This book has already been added");
        form.reset();
        return undefined; 
    }
}

// create a new card with all the classes and attributes and return it
const createCard = () => {
    let newCard = document.createElement("div");
    let newTitle = document.createElement("div");
    let newAuthor = document.createElement("div");
    let newPages = document.createElement("div");
    
    newCard.classList.add("card");
    newCard.setAttribute("data-num", serialNumber);
    newTitle.classList.add("title");
    newAuthor.classList.add("author");
    newPages.classList.add("pages");
    
    newCard.appendChild(newTitle);
    newCard.appendChild(newAuthor);
    newCard.appendChild(newPages);
    
    return newCard;
}


const renderBook = (book) => {

    // create card
    let newCard = createCard();
    
    //define and create buttons to handle events
    let newRemoveBtn = document.createElement("button");
    let newReadBtn = document.createElement("button");
    newRemoveBtn.classList.add("remove-btn");
    newReadBtn.classList.add("read-btn");
    newCard.appendChild(newReadBtn);
    newCard.appendChild(newRemoveBtn);

    // add values of element in array to div and append to main
    newCard.children[0].textContent = book.title;
    newCard.children[1].textContent = book.author;
    newCard.children[2].textContent = book.pages;
    newCard.children[3].textContent = book.read;
    newCard.children[4].textContent = "Remove";
    main.appendChild(newCard);

    // verify if the addButton element is not in last place and move it
    (addBtn.nextElementSibling !== null)? main.appendChild(addBtn): 0;

    // add event listeners to buttons
    newRemoveBtn.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        myLibrary.forEach((item, i) => {
            if (item.num === book.num) {
                myLibrary.splice(i,1);
            }
        })
    });

    newReadBtn.addEventListener("click", (e) => {
        myLibrary.forEach(item => {
            if (item.num === book.num){
                item.changeReadStatus();
                e.target.textContent = item.read;
            }
        })
    })

    // increment serialNumber
    serialNumber++;
}

// validate that all the fields are completed
const formValidation = (title, author, pages) => {
    if (title.length <= 0 || author.length <= 0 || pages.length <= 0){
        displayErrorMsg("Complete all the fields");
        return false
    }
}

// event listener for the submit button of the form
submitBookBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    let transactionFormData = new FormData(form);

    // validate the form
    let validation = formValidation(transactionFormData.get("title"), transactionFormData.get("author"), transactionFormData.get("pages"));
    if (validation === false) {
        return
    }

    // get if the book is read or not
    let readCheck;
    (transactionFormData.get("read") == "on") ? readCheck = "read" : readCheck = "not read"

    // add book to the array and display it in screen
    let newBook = addBookToLibrary(transactionFormData.get("author"),transactionFormData.get("title"),transactionFormData.get("pages"),readCheck);
    if (newBook !== undefined) {
        renderBook(newBook);
        modal.classList.remove("show");
        form.reset();
    }
})