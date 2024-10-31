document.addEventListener('DOMContentLoaded', function() {
  // using array to store all the books in the library
  const myLibrary = [];
  const addBookBtn = document.querySelector(".add-book-btn");
  const bookStatCheckBox = document.getElementById("book-status");
  const ratingsDiv = document.querySelector(".rating-group");
  const addBookForm = document.querySelector(".add-book-form");
  const cancelBtn = document.querySelector(".cancel-book-btn");

  function Book(title, author, pages, hasRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.hasRead = hasRead;
      this.rating = 0;
      this.info = function() {
          return title + ", by " + author + " is " + pages + " pages - " + (hasRead ? 'Completed' : 'Not read yet');
      }
  }

  function addBookToLibrary() {
    addBookForm.style.display = "grid";
  }

  addBookBtn.addEventListener("click", addBookToLibrary);
  cancelBtn.addEventListener("click", function() {
    addBookForm.style.display = "none";
  });
  bookStatCheckBox.addEventListener("change", function() {
    if (this.checked) {
      ratingsDiv.style.display = "inline-flex";
    } else {
      ratingsDiv.style.display = "None";
    }
  });

  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(addBookForm);

  })

  addBookForm.addEventListener("formdata", (e) => {
    const data = e.formData;
    for (const value of data.values()) {
      console.log(value);
    }
  })

});