// using array to store all the books in the library
const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = function() {
        return title + ", by " + author + " is " + pages + " pages - " + (hasRead ? 'Completed' : 'Not read yet');
    }
}

function addBookToLibrary() {
  // do stuff here
}


const theHobbit  = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());