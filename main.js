
// Me falta:

//     3. comprovaciones del form vía JS
//     4. style buttons of cards
//     5. mejorar display de books en la pantalla 






// DOM Manipulation
const main = document.querySelector(".main");
const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal-overlay");
const submitBook = document.querySelector(".submit-btn");
const inputTitle = document.querySelector(".title");
const inputAuthor = document.querySelector(".author");
const inputPages = document.querySelector(".pages");
const inputRead = document.querySelector(".read-check");
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
    deleteBook () {
        this
    }
}



// Modal Event Listeners
addBtn.addEventListener("click", () => {
    modal.classList.add("show");
})
closeBtnModal.addEventListener("click", () => {
    modal.classList.remove("show");
})
window.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modal.classList.remove("show");
        form.reset();
    }
})

// Verify that the error message isn't already displayed, create it and display it in the form
const displayErrorMsg = () => {
    if (!form.lastChild.textContent.startsWith("This")){
        let message = document.createElement("div");
        message.textContent = "This book has already been added";
        message.style.color = "red";
        form.appendChild(message);
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

    // verify that the title of the book is not in the array, push it and increment serial number. Otherwise, display error and clear form
    let push;
    myLibrary.forEach(item => {
        (item.title === book.title) ? push = false : push = true
    });
            
    if (push) {
            myLibrary.push(book);
            return book;
    } else {
        displayErrorMsg();
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
    newRemoveBtn.classList.add("remove");
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


submitBook.addEventListener("click", (e)=> {
    e.preventDefault();
    let transactionFormData = new FormData(form);
    let readCheck;
    (transactionFormData.get("read") == "on") ? readCheck = "read" : readCheck = "not read"

    let newBook = addBookToLibrary(transactionFormData.get("author"),transactionFormData.get("title"),transactionFormData.get("pages"),readCheck);
    if (newBook !== undefined) {
        renderBook(newBook);
        modal.classList.remove("show");
        form.reset();
    }
})

let shit = addBookToLibrary("Tolkien","Lord of the Rings","986","not read");
renderBook(shit);









