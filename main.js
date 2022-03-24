let myLibrary = [];

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

console.log(myLibrary)
