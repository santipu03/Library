
// Me falta:
//     1. remove button
//     2. Read or not button
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



// array that will store the books
myLibrary = [];
// number of identification for every book
let serialNumber = 0;
//constructor of the books
function Book (author, title, pages, read, num) {
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.read = read,
    this.num = num
};


// Modal Event Listeners
addBtn.addEventListener("click", () => {
    modal.classList.add("show");
})
closeBtnModal.addEventListener("click", () => {
    modal.classList.remove("show");
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

// clean the form
const cleanForm = () => {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.checked = false;
}


// add book to the array
const addBookToLibrary = (author, title, pages, read) => {

    // create book from constructor
    let book = new Book(author, title, pages, read, serialNumber);
    
    // if there's no books in the array, push it and finish
    if (myLibrary.length == 0) {
        myLibrary.push(book);
        serialNumber++;
        return book;
    }

    // verify that the title of the book is not in the array, push it and increment serial number. Otherwise, display error and clean form
    let push;
    myLibrary.forEach(item => {
        (item.title === book.title) ? push = false : push = true
    });
            
    if (push) {
            myLibrary.push(book);
            serialNumber++;
            return book;
    } else {
        displayErrorMsg();
        cleanForm();
        return undefined; 
    }
}

// create a new card with all the classes and attributes and return it
const createCard = () => {
    let newCard = document.createElement("div");
    let newTitle = document.createElement("div");
    let newAuthor = document.createElement("div");
    let newPages = document.createElement("div");
    let newRemoveBtn = document.createElement("button");
    let newReadBtn = document.createElement("button");

    newCard.classList.add("card");
    newCard.setAttribute("data-num", serialNumber)
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

// add the values of the new book in the array to the element created before and append it to the main HTML
const displayBook = (book) => {
    let newCard = createCard();
    newCard.children[0].textContent = book.title;
    newCard.children[1].textContent = book.author;
    newCard.children[2].textContent = book.pages;
    newCard.children[3].textContent = book.read;
    newCard.children[4].textContent = "Remove";
    main.appendChild(newCard);
}

// verify if the addButton element is not in last place and move it
const moveAddButton = () => (addBtn.nextElementSibling !== null)? main.appendChild(addBtn): 0;


// update every click to get all the "remove" classes, add a listener for a click and remove the parent of the button clicked
window.addEventListener("click", () => {
    const removeBtns = document.querySelectorAll(".remove");
    removeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        });
    });
})




submitBook.addEventListener("click", (e)=> {
    e.preventDefault();
    let transactionFormData = new FormData(form);
    let readCheck;
    (transactionFormData.get("read") == "on") ? readCheck = "read" : readCheck = "not read"

    let newBook = addBookToLibrary(transactionFormData.get("author"),transactionFormData.get("title"),transactionFormData.get("pages"),readCheck);
    if (newBook !== undefined) {
        displayBook(newBook);
        moveAddButton();
        modal.classList.remove("show");
        cleanForm();
    }
    
    
})










