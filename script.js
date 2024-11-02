document.addEventListener('DOMContentLoaded', function() {
  // using array to store all the books in the library
  const myLibrary = [];
  const addBookBtn = document.querySelector(".add-book-btn");
  const bookStatCheckBox = document.getElementById("book-status");
  const ratingsDiv = document.querySelector(".rating-group");
  const addBookForm = document.getElementById("add-book-form");
  const cancelBtn = document.querySelector(".cancel-book-btn");
  const reviewDiv = document.querySelector(".book-review-div");
  let bookCollection = document.querySelector(".book-collection");

  function Book(title, author, genre, synopsis, pages, review, hasRead, rating) {
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.synopsis = synopsis;
      this.pages = pages;
      this.review = review;
      this.hasRead = hasRead;
      this.rating = rating;
  }

  function addBookToLibrary(data) {
    if (data.has("book-status")) {
      newBook = new Book(data.get("title"), data.get("author"), data.get("genre"), data.get("synopsis"), data.get("pages"), data.get("review"), true, data.get("rating2"));
    }
    else {
      newBook = new Book(data.get("title"), data.get("author"), data.get("genre"), data.get("synopsis"), data.get("pages"), null, false, null);
    }
    myLibrary.push(newBook);
    console.log(myLibrary);
    cancelBtn.dispatchEvent(new Event("click"));
    displayBooks();
  }

  function displayBooks() {
    myLibrary.forEach(book => {
      const card = document.createElement("div");
      card.classList = "card-body";
    });
  }

  addBookBtn.addEventListener("click", function() {
    addBookForm.style.display = "grid";
  });

  cancelBtn.addEventListener("click", function() {
    addBookForm.style.display = "none";
    addBookForm.reset();
    bookStatCheckBox.dispatchEvent(new Event("change"));
  });

  bookStatCheckBox.addEventListener("change", function() {
    if (this.checked) {
      ratingsDiv.style.display = "inline-flex";
      reviewDiv.style.display = "flex";
      reviewDiv.style.gridColumn = "1/7";
      reviewDiv.style.gridRow = "span 6";
      reviewDiv.style.padding = "0 1rem";
      reviewDiv.style.marginBottom = "0.3rem";
    } else {
      ratingsDiv.style.display = "none";
      reviewDiv.style.display = "none";
    }
  });

  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(addBookForm);
  })

  addBookForm.addEventListener("formdata", (e) => {
    const data = e.formData;
    addBookToLibrary(data);
  })

});