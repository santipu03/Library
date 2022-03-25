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
const form = document.getElementById("form");


// Modal Event Listeners
addBtn.addEventListener("click", () => {
    modal.classList.add("show");
})
closeBtnModal.addEventListener("click", () => {
    modal.classList.remove("show");
})


const displayErrorMsg = () => {

    // Verify that the message isn't already displayed, create it and display it in the form
    if (!form.lastChild.textContent.startsWith("This")){
        let message = document.createElement("div");
        message.textContent = "This book has already been added";
        message.style.color = "red";
        form.appendChild(message);
    }
}



myLibrary = [];
let serialNumber = 0;

function Book (author, title, pages, read, num) {
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.read = read,
    this.num = num
};


const addBookToLibrary = (author, title, pages, read) => {

    let book = new Book(author, title, pages, read, serialNumber);
    


    if (myLibrary.length == 0) {
        myLibrary.push(book);
        serialNumber++;
        return book;
    }
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
    }


    
}


// addBookToLibrary("Tolkien","Lord of the Rings","2500","read");
// addBookToLibrary("Stephen King","The Shining","750","not read")



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




const displayBook = (book) => {

    let newCard = createCard();
    newCard.children[0].textContent = book.title;
    newCard.children[1].textContent = book.author;
    newCard.children[2].textContent = book.pages;
    newCard.children[3].textContent = book.read;
    newCard.children[4].textContent = "Remove";
    main.appendChild(newCard);
    console.log(newCard);

    
}



submitBook.addEventListener("click", (e)=> {
    e.preventDefault();
    let transactionFormData = new FormData(form);
    let readCheck;
    (transactionFormData.get("read") == "on") ? readCheck = "read" : readCheck = "not read"

    let newBook = addBookToLibrary(transactionFormData.get("author"),transactionFormData.get("title"),transactionFormData.get("pages"),readCheck);
    displayBook(newBook);
    moveAddButton();
    modal.classList.remove("show");
})






const moveAddButton = () => (addBtn.nextElementSibling !== null)? main.appendChild(addBtn): 0;







