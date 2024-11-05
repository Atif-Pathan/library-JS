document.addEventListener('DOMContentLoaded', function() {
  // using array to store all the books in the library
  let myLibrary = [];
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
  let isEditing = false; 
  let editingBookId = null;
  let currentEditMode = null;

  function openEditModal(book, editMode) {
      isEditing = true;
      editingBookId = book.id;
      currentEditMode = editMode;

      modal.style.display = "block";
      addBookForm.style.display = "grid";
      container.classList.add("blur");

      // Pre-fill the form fields with the book's data
      document.getElementById("title").value = book.title;
      document.getElementById("author").value = book.author;
      document.getElementById("genre").value = book.genre;
      document.getElementById("synopsis").value = book.synopsis;
      document.getElementById("pages").value = book.pages;

      if (editMode) {
        // Set the read status
        document.getElementById("book-status").checked = book.hasRead;
      } else {
        document.getElementById("book-status").checked = true;
      }

      // Show or hide the rating and review fields based on read status
      bookStatCheckBox.dispatchEvent(new Event("change"));

      // Set the rating
      if (book.rating !== null) {
          const ratingInputs = document.getElementsByName("rating2");
          ratingInputs.forEach(input => {
              if (input.value == book.rating) {
                  input.checked = true;
              }
          });
      }

      // Set the review
      if (book.review !== null) {
          document.getElementById("book-review").value = book.review;
      } else {
        document.getElementById("book-review").value = '';
      }

      // Enable or disable form fields based on editMode
      const formElements = addBookForm.elements;
      for (let i = 0; i < formElements.length; i++) {
          const element = formElements[i];
          const fieldId = element.id;
          const fieldType = element.type;

          if (editMode) {
              element.disabled = false;
          } else {
              // Only rating and review are editable, buttons should remain enabled
              const isRatingOrReviewField = fieldId === 'book-review' || fieldId.startsWith('rating2');
              const isButton = fieldType === 'submit' || fieldType === 'button';

              if (isRatingOrReviewField || isButton) {
                  element.disabled = false;
              } else {
                  element.disabled = true;
              }
          }
      }

      // Focus on the first editable field
      if (editMode) {
          document.getElementById("title").focus();
      } else {
          document.getElementById("book-review").focus();
      }

      // Focus on the rating input
      document.getElementsByName("rating2")[0].focus();
  }

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
      this.id = Book.idCounter++;
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.synopsis = synopsis;
      this.pages = pages;
      this.review = review;
      this.hasRead = hasRead;
      this.rating = rating;
  }
  Book.idCounter = 0;

  function addBookToLibrary(data) {

    if (isEditing) {
      // Update the existing book
      const book = myLibrary.find(book => book.id === editingBookId);
      if (book) {
          if (currentEditMode) {
              // Editing all fields
              book.title = data.get("title");
              book.author = data.get("author");
              book.genre = data.get("genre");
              book.synopsis = data.get("synopsis");
              book.pages = data.get("pages");
              book.hasRead = data.has("book-status");
              book.rating = book.hasRead ? data.get("rating2") : null;
              book.review = book.hasRead ? data.get("review") : null;
          } else {
              // Only updating rating and review
              book.hasRead = true;
              book.rating = data.get("rating2");
              book.review = data.get("review");
          }
      }
      isEditing = false;
      editingBookId = null;
      currentEditMode = null;
    } else {
      // Add a new book
      let newBook;
      if (data.has("book-status")) {
          newBook = new Book(
              data.get("title"),
              data.get("author"),
              data.get("genre"),
              data.get("synopsis"),
              data.get("pages"),
              data.get("review"),
              true,
              data.get("rating2")
          );
      } else {
          newBook = new Book(
              data.get("title"),
              data.get("author"),
              data.get("genre"),
              data.get("synopsis"),
              data.get("pages"),
              null,
              false,
              null
          );
      }
      myLibrary.push(newBook);
    }

    console.log(myLibrary);
    cancelBtn.dispatchEvent(new Event("click"));
    displayBooks();
  }

  function displayBooks() {
    bookCollection.innerHTML = '';
    myLibrary.forEach(book => {
      const card = document.createElement("div");
      card.classList.add("card-body");
      card.dataset.id = book.id;

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
        toggleStatusButton.disabled = false;
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

      const deleteBookBtn = document.createElement("button");
      deleteBookBtn.classList.add("delete-book");
      deleteBookBtn.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #949494;"></i>';
      deleteBookBtn.title = "Delete book";
      deleteBookBtn.dataset.id = book.id;

      const editBookBtn = document.createElement("button");
      editBookBtn.classList.add("edit-book-btn");
      editBookBtn.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: #949494;"></i>';
      editBookBtn.title = "Edit book";
      editBookBtn.dataset.id = book.id;

      cardFront.appendChild(deleteBookBtn);
      cardFront.appendChild(editBookBtn);
      card.appendChild(cardFront);

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

        card.appendChild(cardBack);
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

    // Re-enable all form fields
    document.getElementById("title").disabled = false;
    document.getElementById("author").disabled = false;
    document.getElementById("genre").disabled = false;
    document.getElementById("synopsis").disabled = false;
    document.getElementById("pages").disabled = false;
    document.getElementById("book-status").disabled = false;

    // Reset editing flags
    isEditing = false;
    editingBookId = null;
    currentEditMode = null;
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

    if (target.closest('.edit-book-btn')) {
      const editButton = target.closest('.edit-book-btn');
      const card = editButton.closest('.card-body');
      const bookId = parseInt(card.dataset.id);

      // Find the book in the myLibrary array
      const book = myLibrary.find(book => book.id === bookId);

      if (book) {
          openEditModal(book, true);
      }
    }

    // Handle clicks on the toggle status button
    if (target.closest('.toggle-status-btn-not-read')) {
      const toggleButton = target.closest('.toggle-status-btn-not-read');
      const card = toggleButton.closest('.card-body');
      const bookId = parseInt(card.dataset.id);

      // Find the book in the myLibrary array
      const book = myLibrary.find(book => book.id === bookId);

      if (book) {
          // Open the modal to edit the book's rating and review
          openEditModal(book, false);
      }
    }

    // Handle clicks on the delete button
    if (target.closest('.delete-book')) {
      const deleteButton = target.closest('.delete-book');
      const bookId = parseInt(deleteButton.dataset.id);

      const bookIndex = myLibrary.findIndex(book => book.id === bookId);
      if (bookIndex !== -1) {
          myLibrary.splice(bookIndex, 1);
          displayBooks();
      }
    }

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