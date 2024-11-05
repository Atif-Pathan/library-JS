document.addEventListener('DOMContentLoaded', function() {
  // using array to store all the books in the library
  const myLibrary = [];
  const addBookBtn = document.querySelector(".add-book-btn");
  const bookStatCheckBox = document.getElementById("book-status");
  const ratingsDiv = document.querySelector(".rating-group");
  const addBookForm = document.getElementById("add-book-form");
  const cancelBtn = document.querySelector(".cancel-book-btn");
  const reviewDiv = document.querySelector(".book-review-div");
  const bookCollection = document.querySelector(".book-collection");
  const reviewBtn = document.querySelector(".review-btn");
  const backToCardBtn = document.querySelector(".back-to-card");
  const modal = document.getElementById("add-book-modal");
  const container = document.querySelector(".container");

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
          container.classList.remove("blur");
          addBookForm.reset();
          bookStatCheckBox.dispatchEvent(new Event("change"));
      }
  });

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

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");

      // front card stuff:
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
      ratingWrapper.textContent = '( ';
      const ratingContainer = document.createElement('div');
      ratingContainer.classList.add('card-rating');

      const toggleStatusButton = document.createElement("button");

      if (book.rating !== null && book.rating > 0) {
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
        ratingWrapper.appendChild(ratingContainer);
        ratingWrapper.appendChild(document.createTextNode(' )'));
        toggleStatusButton.innerHTML = 'Status: <i class="fa-solid fa-circle-check" style="color: #228b22;"></i>';
        toggleStatusButton.classList.add('toggle-status-btn-read');
        toggleStatusButton.disabled = true;
        toggleStatusButton.title = "The book has been marked as read - press edit button to edit rating/review";
      }
      else if (book.rating === "0" || book.rating === 0) {
        ratingContainer.textContent = "0 stars";
        ratingWrapper.appendChild(ratingContainer);
        ratingWrapper.appendChild(document.createTextNode(' )'));
        toggleStatusButton.innerHTML = 'Status: <i class="fa-solid fa-circle-check" style="color: #228b22;"></i>';
        toggleStatusButton.classList.add('toggle-status-btn-read');
        toggleStatusButton.disabled = true;
        toggleStatusButton.title = "The book has been marked as read - press edit button to edit rating/review";
      }
      else {
        ratingContainer.textContent = "No rating yet";
        ratingWrapper.appendChild(ratingContainer);
        ratingWrapper.appendChild(document.createTextNode(' )'));
        toggleStatusButton.innerHTML = 'Status: <i class="fa-solid fa-circle-xmark" style="color: #ff0000;"></i>';
        toggleStatusButton.classList.add('toggle-status-btn-not-read');
        toggleStatusButton.title = "Press to mark this book as read and add a rating/review";
      }
      
      if (book.review !== null && book.review  !== "") {
        const reviewButton = document.createElement('button');
        reviewButton.classList.add('review-btn');
        reviewButton.innerHTML = 'review<i class="fa-solid fa-arrow-right fa-xs"></i>';

        italicSection.appendChild(author);
        italicSection.appendChild(ratingWrapper);
        italicSection.appendChild(reviewButton);
      }
      else {
        italicSection.appendChild(author);
        italicSection.appendChild(ratingWrapper);
      }

      titleAuthorContainer.appendChild(title);
      titleAuthorContainer.appendChild(italicSection);

      const synopsis = document.createElement('p');
      synopsis.classList.add('card-synopsis');
      synopsis.textContent = book.synopsis;

      const readMoreCheckbox = document.createElement('input');
      readMoreCheckbox.type = 'checkbox';
      readMoreCheckbox.classList.add('icon', 'icon-solid', 'read-more');
      cardFront.appendChild(readMoreCheckbox);

      const genre = document.createElement("div");
      genre.classList.add("card-genre");
      genre.textContent = `Genre: ${book.genre}`;

      // Pages
      const pages = document.createElement('div');
      pages.classList.add('card-pages');
      pages.innerHTML = `${book.pages} <i class="italic-book fa-solid fa-book-open" title= "no. of pages" style="color: #33846c;"></i>`;

      cardFront.appendChild(titleAuthorContainer);
      cardFront.appendChild(synopsis);
      cardFront.appendChild(readMoreCheckbox);
      cardFront.appendChild(genre);
      cardFront.appendChild(pages);
      cardFront.appendChild(toggleStatusButton);

      // card back stuff
      if (book.hasRead && (book.review !== null || book.review !== "")) {
        const cardReview = document.createElement('p');
        cardReview.classList.add('card-review');
        cardReview.textContent = book.review;

        const backButton = document.createElement('button');
        backButton.classList.add('back-to-card');
        backButton.innerHTML = '<i class="fa-solid fa-arrow-left fa-xs"></i>back';

        cardBack.appendChild(cardReview);
        cardBack.appendChild(backButton);

        card.appendChild(cardFront);
        card.appendChild(cardBack);
      }  
      else {
        card.appendChild(cardFront);
      }

      bookCollection.appendChild(card);
    });
  }

  addBookBtn.addEventListener("click", function() {
    modal.style.display = "block";
    addBookForm.style.display = "grid";
    container.classList.add("blur");
    document.getElementById("title").focus(); 
  });

  cancelBtn.addEventListener("click", function() {
    addBookForm.style.display = "none";
    modal.style.display = "none";
    container.classList.remove("blur");
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

  bookCollection.addEventListener('click', function(event) {
    const target = event.target;

    // Handle clicks on the review button
    if (target.closest('.review-btn')) {
        const reviewButton = target.closest('.review-btn');
        const card = reviewButton.closest('.card-body');
        const cardBack = card.querySelector('.card-back');
        const cardFront = card.querySelector('.card-front');
        // Get the computed height of card-back
        const cardBackHeight = cardBack.scrollHeight;
        const cardFrontHeight = cardFront.scrollHeight;
        // Set the height of the card-body to match the card-back
        card.style.height = (cardFrontHeight < cardBackHeight) ? cardBackHeight + 'px' : cardFrontHeight + 'px' ;
        cardFront.style.height = (cardFrontHeight < cardBackHeight) ? cardBackHeight + 'px' : cardFrontHeight + 'px' ;
        cardBack.style.height = (cardFrontHeight < cardBackHeight) ? cardBackHeight + 'px' : cardFrontHeight + 'px' ;
        card.classList.add('flipped');
    }

    // Handle clicks on the back button
    else if (target.closest('.back-to-card')) {
        const backButton = target.closest('.back-to-card');
        const card = backButton.closest('.card-body');
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');

        // Reset the height of the card-body
        card.style.height = '';
        cardFront.style.height = '';
        cardBack.style.height = '';
        card.classList.remove('flipped');
    }
  });

});