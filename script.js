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
    bookCollection.innerHTML = '';
    myLibrary.forEach(book => {
      const card = document.createElement("div");
      card.classList.add("card-body");

      const titleAuthorContainer = document.createElement("div");
      titleAuthorContainer.classList.add("title-author-container");

      const title = document.createElement('h1');
      title.classList.add('card-title');
      title.textContent = book.title;

      const italicSection = document.createElement('div');
      italicSection.classList.add('card-italic-section');

      const author = document.createElement("h3");
      author.classList.add("card-author")
      author.textContent = `by ${book.author}`;

      const ratingWrapper = document.createElement('h3');
      const ratingContainer = document.createElement('div');
      ratingContainer.classList.add('card-rating');

      let ratingNum = parseFloat(book.rating);
      let fixedNumber = ratingNum.toFixed(10); 
      let parts = fixedNumber.split('.'); 
      let integerPart = parseInt(parts[0]); 
      let decimalPart = parseFloat('0.' + parts[1]);
      // add all the full stars
      for (let index = 0; index < integerPart; index++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('fa-solid', 'fa-star', 'italic-star');
        ratingContainer.appendChild(starIcon);
      }
      // add any half stars if there is one
      if (decimalPart > 0) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('fa-solid', 'fa-star-half', 'italic-star');
        ratingContainer.appendChild(starIcon);
      }
      ratingWrapper.appendChild(document.createTextNode('( '));
      ratingWrapper.appendChild(ratingContainer);
      ratingWrapper.appendChild(document.createTextNode(' )'));

      italicSection.appendChild(author);
      italicSection.appendChild(ratingWrapper);

      titleAuthorContainer.appendChild(title);
      titleAuthorContainer.appendChild(italicSection);

      const synopsis = document.createElement('p');
      synopsis.classList.add('card-synopsis');
      synopsis.textContent = book.synopsis;

      const readMoreCheckbox = document.createElement('input');
      readMoreCheckbox.type = 'checkbox';
      readMoreCheckbox.classList.add('icon', 'icon-solid', 'read-more');
      card.appendChild(readMoreCheckbox);

      const genre = document.createElement("div");
      genre.classList.add("card-genre");
      genre.textContent = `Genre: ${book.genre}`;

      // Pages
      const pages = document.createElement('div');
      pages.classList.add('card-pages');
      pages.innerHTML = `${book.pages} <i class="italic-book fa-solid fa-book-open" style="color: #33846c;"></i>`;

      card.appendChild(titleAuthorContainer);
      card.appendChild(synopsis);
      card.appendChild(readMoreCheckbox);
      card.appendChild(genre);
      card.appendChild(pages);

      bookCollection.appendChild(card);
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