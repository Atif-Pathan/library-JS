document.addEventListener('DOMContentLoaded', function() {
  // using array to store all the books in the library
  const myLibrary = [
    new Book(
        "The Hobbit",
        "J.R.R. Tolkien",
        "Fantasy",
        "Bilbo Baggins, a quiet hobbit, is pulled into an epic quest by the wizard Gandalf to reclaim the lost Dwarven kingdom of Erebor from the dragon Smaug. Along the way, he encounters trolls, elves, and discovers a mysterious ring.",
        310,
        "The Hobbit is a truly timeless adventure. Tolkien’s world-building is enchanting, immersing readers in Middle-earth with such vivid detail that it feels almost real. Bilbo’s journey is not just about physical adventure but also personal growth, as he transforms from a reluctant traveler into a hero of courage and wisdom. The interactions with Gollum, the epic journey through Mirkwood, and the showdown with Smaug are all iconic. This is a book that can be read and reread, finding something new each time. Perfect for any fantasy fan, young or old.",
        true,
        4.5
    ),
    new Book(
        "1984",
        "George Orwell",
        "Dystopian",
        "Winston Smith lives under the oppressive rule of Big Brother, where thoughts are controlled, and privacy is nonexistent. As he begins questioning the Party, he finds himself entangled in rebellion and forbidden love.",
        328,
        "Orwell’s ‘1984’ is an unnervingly relevant commentary on surveillance and authoritarianism. The bleak setting, oppressive control, and deep sense of paranoia create an atmosphere that lingers. Winston’s inner turmoil as he wrestles with his role in this society is hauntingly realistic, and the portrayal of how information is manipulated feels disturbingly accurate in our modern age. This novel is a stark reminder of the value of freedom, individual thought, and human connection.",
        true,
        5
    ),
    new Book(
        "Pride and Prejudice",
        "Jane Austen",
        "Romance",
        "Elizabeth Bennet navigates society’s expectations and family pressures while dealing with her complex feelings towards the proud Mr. Darcy. This beloved classic explores themes of love, class, and reputation.",
        279,
        null,
        false,
        null
    ),
    new Book(
        "The Catcher in the Rye",
        "J.D. Salinger",
        "Literary Fiction",
        "Holden Caulfield, a disaffected teenager, wanders New York City, grappling with issues of identity, belonging, and growing up. His raw narrative reflects the angst and alienation of adolescence.",
        214,
        "Holden Caulfield’s narrative captures teenage angst and a sense of alienation like no other. His voice is both sarcastic and vulnerable, which makes his story deeply relatable. While some find Holden insufferable, others see him as a brutally honest reflection of youth. Salinger’s writing is raw and unfiltered, which gives this novel a timeless quality.",
        true,
        4
    ),
    new Book(
        "The Da Vinci Code",
        "Dan Brown",
        "Thriller",
        "Robert Langdon and cryptologist Sophie Neveu follow a trail of clues tied to famous artworks and hidden codes, uncovering ancient mysteries. This fast-paced thriller combines art, history, and suspense.",
        489,
        "The Da Vinci Code is an exhilarating ride through history, art, and conspiracy. While Brown’s writing style may not be the most literary, his pacing and plot construction are impressive. Each chapter leaves you eager for the next, filled with intriguing puzzles and surprising revelations. For readers who enjoy art history and fast-paced mysteries, this book delivers on suspense, even if it can be polarizing in terms of its historical accuracy.",
        true,
        4.5
    ),
    new Book(
        "Twilight",
        "Stephenie Meyer",
        "Young Adult Fantasy",
        "Bella Swan falls in love with Edward Cullen, a vampire. Their romance faces challenges, from supernatural foes to the perils of their relationship itself, as Bella is pulled deeper into a hidden world.",
        498,
        "Twilight is a cultural phenomenon, but it’s also divisive. For fans of paranormal romance, it captures the intensity of young love and the allure of the supernatural. For others, it may lack depth and complexity in its characters. Bella and Edward’s romance is often criticized for its unrealistic portrayal of relationships. However, it undeniably strikes a chord with its target audience, delivering on escapism and fantasy.",
        true,
        2.5
    ),
    new Book(
        "Fifty Shades of Grey",
        "E.L. James",
        "Erotic Romance",
        "Anastasia Steele meets Christian Grey, a man of wealth and mystery, who introduces her to a complex world of adult relationships and desire. Their relationship explores power and control.Anastasia Steele meets Christian Grey, a man of wealth and mystery, who introduces her to a complex world of adult relationships and desire. Their relationship explores power and control.",
        514,
        "Fifty Shades is both praised and criticized. It broke ground in popularizing a genre often kept private, but it also faces criticism for its prose and character dynamics. For those seeking a straightforward romance with elements of suspense, it delivers, but expectations of literary merit should be tempered.",
        true,
        2
    ),
    new Book(
        "Moby-Dick",
        "Herman Melville",
        "Adventure",
        "Captain Ahab embarks on a relentless quest to hunt down the elusive white whale, Moby-Dick. This tale is both an adventure and an exploration of obsession and revenge.",
        635,
        null,
        false,
        null
    ),
    new Book(
        "The Great Gatsby",
        "F. Scott Fitzgerald",
        "Classic Fiction",
        "Nick Carraway recounts his friendship with the enigmatic Jay Gatsby, who harbors a deep longing for his lost love, Daisy. Set in the Jazz Age, this novel examines the allure and emptiness of wealth.",
        180,
        "A haunting tale of ambition, love, and loss. Gatsby’s pursuit of Daisy and the American Dream is both tragic and mesmerizing. Fitzgerald’s prose is poetic, beautifully capturing the glitz and sorrow of the Roaring Twenties. This book stays with you long after the final page, and it’s one of the most beautifully written novels of the 20th century.",
        true,
        4.5
    ),
    new Book(
        "A Thoughtful Reflection",
        "Anonymous Author",
        "Contemporary",
        "This book provides an introspective journey, offering readers insights into life's quiet moments and the beauty of everyday existence. It's a reflective piece, encouraging the reader to pause and consider the subtle joys around them.",
        250,
        "A profound journey through the ordinary and the extraordinary moments of life. The author’s language is serene, inviting readers to slow down and truly savor each chapter. For those looking for something calming and reflective, this book is a gentle reminder of life’s beauty. However, it’s not for readers looking for action or suspense, as its charm lies in its introspection.",
        true,
        null // Has a review but no rating
    ),
    new Book(
        "An Average Tale",
        "Unknown Author",
        "Fiction",
        "A simple story with predictable twists and an uninspired plot. The characters feel flat, and there’s little emotional engagement. It’s an average read that doesn’t leave a lasting impression.",
        300,
        null,
        true,
        null // Read, but no rating or review given
    )
];


  const tempLibrary = [];
  const addBookBtn = document.querySelector(".add-book-btn");
  const bookStatCheckBox = document.getElementById("book-status");
  const ratingsDiv = document.querySelector(".rating-group");
  const addBookForm = document.getElementById("add-book-form");
  const cancelBtn = document.querySelector(".cancel-book-btn");
  const reviewDiv = document.querySelector(".book-review-div");
  const bookCollection = document.querySelector(".book-collection");
  const reviewBtn = document.querySelector(".review-btn");
  const backToCardBtn = document.querySelector(".back-to-card");

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
    tempLibrary.push(newBook);
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
      }
      else if (book.rating === "0" || book.rating === 0) {
        ratingContainer.textContent = "0 stars";
      }
      else if (book.review !== null && book.rating === null) {
        ratingContainer.textContent = "No rating yet"; 
      }
      else {
        ratingContainer.textContent = "Not read yet";
      }
      ratingWrapper.appendChild(ratingContainer);
      ratingWrapper.appendChild(document.createTextNode(' )'));

      if (book.review !== null) {
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

      // card back stuff
      const cardReview = document.createElement('p');
      cardReview.classList.add('card-review');

      if (book.hasRead && book.review) {
          cardReview.textContent = book.review;
      } else {
          cardReview.textContent = "No review available.";
      }

      const backButton = document.createElement('button');
      backButton.classList.add('back-to-card');
      backButton.innerHTML = '<i class="fa-solid fa-arrow-left fa-xs"></i>back';

      cardBack.appendChild(cardReview);
      cardBack.appendChild(backButton);

      card.appendChild(cardFront);
      card.appendChild(cardBack);

      bookCollection.appendChild(card);
    });
  }

  displayBooks();

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