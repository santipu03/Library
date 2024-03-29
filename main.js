
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
    if (this.books.find(book => book.name === newBook.title)) {
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


const setModalEventListeners = () => {
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

  // Set Form Validation while typing in 'title' and 'author' inputs
  let titleInput = document.querySelector('.input-title')
  titleInput.addEventListener('input', () => {
    (!titleInput.checkValidity()) ? displayErrorMsg('Title too short') : clearErrorMsg()
  })

  let authorInput = document.querySelector('.input-author');
  authorInput.addEventListener('input', () => {
    (!authorInput.checkValidity()) ? displayErrorMsg('Author too short') : clearErrorMsg()
  })

  let pagesInput = document.querySelector('.input-pages');
  pagesInput.addEventListener('input', () => {
    (!pagesInput.checkValidity()) ? displayErrorMsg('Unrealistic number of pages') : clearErrorMsg()
  })
}


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


const addBookBtnListeners = (removeBtn, readBtn) => {
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
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.setAttribute('data-num', serialNumber);
  newCard.innerHTML = 
  `<div class="title">${book.title}</div>
  <div class="author">${book.author}</div>
  <div class="pages">${book.pages}</div>`

  //define and create buttons to handle events
  let newRemoveBtn = document.createElement('button');
  let newReadBtn = document.createElement('button');
  newRemoveBtn.classList.add('remove-btn');
  newReadBtn.classList.add('read-btn');
  newCard.appendChild(newReadBtn);
  newCard.appendChild(newRemoveBtn);

  // add values of buttons in array to div and append to main
  newCard.children[3].textContent = book.read;
  newCard.children[4].textContent = 'Remove';
  main.appendChild(newCard);

  // verify if the addButton element is not in last place and move it
  (addBtn.nextElementSibling !== null)? main.appendChild(addBtn): 0;

  addBookBtnListeners(newRemoveBtn,newReadBtn)

  // increment serialNumber
  serialNumber++;
}



// validate that all the fields are completed
const formValidation = (title, author, pages) => {
  if (!title.checkValidity()) {
    displayErrorMsg('Title too short')
    return false
  } else if (!author.checkValidity()) {
    displayErrorMsg('Author too short')
    return false
  } else if (!pages.checkValidity()) {
    displayErrorMsg('Unrealistic number of pages')
    return false
  }
  return true
}

// event listener for the submit button of the form
submitBookBtn.addEventListener('click', (e)=> {
  e.preventDefault();

  const title = document.querySelector('.input-title');
  const author = document.querySelector('.input-author');
  const pages = document.querySelector('.input-pages');

  // validate the form
  if (!formValidation(title, author, pages)) {
    return
  }

  // get if the book is read or not
  let readCheck;
  const transactionFormData = new FormData(form);
  transactionFormData.get('read') == 'on' ? readCheck = 'read' : readCheck = 'not read'


  // add book to the array and display it in screen
  let newBook = createBook(author.value, title.value, pages.value,readCheck);
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

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
  displayBooksInStorage()
  setModalEventListeners()
})
