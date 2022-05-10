
// DOM Manipulation
const main = document.querySelector('.main');
const addBtn = document.querySelector('.add-btn');
const modal = document.querySelector('.modal-overlay');
const submitBookBtn = document.querySelector('.submit-btn');
const closeBtnModal = document.querySelector('.fa-xmark');
const form = document.getElementById('form');
const modalOverlay = document.querySelector('.modal-overlay');


// number of identification for every book
let serialNumber = 0;

class Library {
  constructor () {
    this.books = []
  }

  getBooks () {
    return this.books
  }
  setBooks (books) {
    this.books = books
  }
  addBook (newBook) {
    if (this.books.find(book => book.name === newBook.name)) {
      return false
    } 
    this.books.push(newBook)
    return true
  }
  deleteBook (bookTitle) {
    const bookToDelete = this.books.find(book => book.name === bookTitle)
    this.books.splice(this.books.indexOf(bookToDelete), 1)
  }
}

class Book {
  constructor (author, title, pages, read, num) {
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.read = read,
    this.num = num
  }
  changeReadStatus () {
    (this.read === 'read') ? this.read = 'not read' : this.read = 'read';
  }
}


// LOCAL STORAGE FUNCTIONS
const displayBooksInStorage = () => getLocalStorage().getBooks().forEach(book => renderBook(book))

const setLocalStorage = (library) => localStorage.setItem('library',JSON.stringify(library))

const getLocalStorage = () => {
  // Get the library array and assign it the methods
  const library = Object.assign(
      new Library(), 
      JSON.parse(localStorage.getItem('library'))
  )
  
  // Map the array of books to assign the methods to each one of the books
  library.setBooks(
    library
      .getBooks()
      .map(book => Object.assign(new Book(), book))
  )
  
  return library
}

const setBookInStorage = (book) => {
  const library = getLocalStorage()
  let isAdded = library.addBook(book)
  setLocalStorage(library)
  return isAdded
}

// Modal Event Listeners to open and close it
addBtn.addEventListener('click', () => {
  modal.classList.add('show');
})
closeBtnModal.addEventListener('click', () => {
  modal.classList.remove('show');
  form.reset();
  clearErrorMsg();
})
window.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modal.classList.remove('show');
    form.reset();
    clearErrorMsg();
  }
})

// Window Event to load localStorage
window.addEventListener('DOMContentLoaded', displayBooksInStorage)

// Verify that the error message isn't already displayed, create it and display it in the form
const displayErrorMsg = (text) => {
  let message = document.createElement('div');
  message.textContent = text
  message.style.color = 'red';
  form.appendChild(message);
  if (message.previousElementSibling !== submitBookBtn){
    message.previousElementSibling.remove()
  }
}

const clearErrorMsg = () => {
  if (form.lastElementChild.style.color == 'red'){
    form.removeChild(form.lastChild);
  }
}

const createBook = (author,title,pages,read) => {
  return new Book(author, title, pages, read, serialNumber);
}

// create a new card with all the classes and attributes and return it
const createCard = () => {
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.setAttribute('data-num', serialNumber);

  newCard.innerHTML = 
  `<div class="title"></div>
  <div class="author"></div>
  <div class="pages"></div>`

  return newCard;
}

const addBookEventListeners = (removeBtn, readBtn) => {
  removeBtn.addEventListener('click', (e) => {
    e.target.parentElement.remove()
    let library = getLocalStorage()
    library.deleteBook(e.target.parentElement.firstElementChild.textContent)
    setLocalStorage(library)
  });

  readBtn.addEventListener('click', (e) => {
    let bookTitle = e.target.parentElement.firstElementChild.textContent
    let library = getLocalStorage()
    let bookToChange = library.getBooks().find(book => book.title === bookTitle)
    bookToChange.changeReadStatus()
    setLocalStorage(library)
    e.target.textContent = bookToChange.read
  })
}


const renderBook = (book) => {

  // create card
  let newCard = createCard();
    
  //define and create buttons to handle events
  let newRemoveBtn = document.createElement('button');
  let newReadBtn = document.createElement('button');
  newRemoveBtn.classList.add('remove-btn');
  newReadBtn.classList.add('read-btn');
  newCard.appendChild(newReadBtn);
  newCard.appendChild(newRemoveBtn);

  // add values of element in array to div and append to main
  newCard.children[0].textContent = book.title;
  newCard.children[1].textContent = book.author;
  newCard.children[2].textContent = book.pages;
  newCard.children[3].textContent = book.read;
  newCard.children[4].textContent = 'Remove';
  main.appendChild(newCard);

  // verify if the addButton element is not in last place and move it
  (addBtn.nextElementSibling !== null)? main.appendChild(addBtn): 0;

  addBookEventListeners(newRemoveBtn,newReadBtn)

  // increment serialNumber
  serialNumber++;
}

// validate that all the fields are completed
const formValidation = (title, author, pages) => {
  if (title.length <= 0 || author.length <= 0 || pages.length <= 0){
    displayErrorMsg('Complete all the fields');
    return false
  }
}

// event listener for the submit button of the form
submitBookBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  let transactionFormData = new FormData(form);

  // validate the form
  let validation = formValidation(transactionFormData.get('title'), transactionFormData.get('author'), transactionFormData.get('pages'));
  if (validation === false) {
    return
  }

  // get if the book is read or not
  let readCheck;
  (transactionFormData.get('read') == 'on') ? readCheck = 'read' : readCheck = 'not read'

  // add book to the array and display it in screen
  let newBook = createBook(transactionFormData.get('author'),transactionFormData.get('title'),transactionFormData.get('pages'),readCheck);
  if (setBookInStorage(newBook)) {
    renderBook(newBook);
    modal.classList.remove('show');
    form.reset();
    clearErrorMsg();
  } else {
    displayErrorMsg('This book has already been added');
    form.reset();
  }
})