document.addEventListener('DOMContentLoaded', function() {
  // using array to store all the books in the library
  const myLibrary = [];
  const addBookBtn = document.querySelector(".add-book-btn");

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
    let title = prompt("Enter book title:");
    let author = prompt("Enter author:");
    let pages = prompt("how many pages does it have?");
    let hasRead = prompt("have you read it?");
    console.log(title + ", " + author + ", " + pages + ", " + hasRead);

    
  }

  addBookBtn.addEventListener("click", addBookToLibrary);

  // const theHobbit  = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

  // myLibrary.push(theHobbit);
  // console.log(theHobbit.info());
});