document.addEventListener('DOMContentLoaded', function() {
  // using array to store all the books in the library
  const myLibrary = [
    new Book(
        "The Hobbit",
        "J.R.R. Tolkien",
        "Fantasy",
        "Bilbo Baggins, a quiet hobbit, is pulled into an epic quest by the wizard Gandalf to reclaim the lost Dwarven kingdom of Erebor from the dragon Smaug. Along the way, he encounters trolls, elves, and discovers a mysterious ring. This enchanting story of courage and friendship introduces readers to the richly imaginative world of Middle-earth.",
        310,
        "A timeless tale of adventure with humor and heart. Tolkien's world-building is unparalleled, making it a must-read for fantasy fans.",
        true,
        4.5
    ),
    new Book(
        "1984",
        "George Orwell",
        "Dystopian, Political Fiction",
        "Winston Smith lives under the oppressive regime of Big Brother, where even thoughts are controlled. As he begins questioning the Party’s totalitarian rule, he finds himself drawn into a dangerous world of rebellion, love, and forbidden truths. Orwell's chilling vision of a world without freedom or privacy continues to provoke and warn about unchecked power.",
        328,
        "A masterful and haunting portrayal of control. Orwell’s work remains relevant, encouraging readers to value individual freedoms.",
        true,
        5
    ),
    new Book(
        "Pride and Prejudice",
        "Jane Austen",
        "Romance, Classic",
        "In Regency-era England, Elizabeth Bennet is a spirited young woman who clashes with the enigmatic Mr. Darcy. As they navigate society’s rules and prejudices, Elizabeth learns that first impressions can be misleading. Austen’s novel is both a charming romance and a biting critique of class and social expectations, filled with wit and insight.",
        279,
        null,
        false,
        null
    ),
    new Book(
        "The Da Vinci Code",
        "Dan Brown",
        "Thriller, Mystery",
        "After a murder at the Louvre, symbologist Robert Langdon and cryptologist Sophie Neveu uncover a series of coded messages within famous artworks. Their quest reveals secrets tied to ancient mysteries and religious history, sending them across Europe in a race against time. Brown’s thriller combines art, history, and suspense in an exhilarating puzzle.",
        489,
        "An intense page-turner filled with suspense and intrigue. Perfect for those who enjoy historical mysteries with modern twists.",
        true,
        4.5
    ),
    new Book(
        "Twilight",
        "Stephenie Meyer",
        "Fantasy, Romance, Young Adult",
        "When Bella Swan moves to Forks, Washington, she meets Edward Cullen, a mysterious classmate who reveals himself to be a vampire. Drawn into a world of supernatural beings and forbidden love, Bella’s life takes a dangerous turn. Meyer’s novel captivated young readers with its unique take on romance, mystery, and vampires.",
        498,
        "Captivating for some, but the writing and characterization can feel lacking. The romance is strong, but may not appeal to everyone.",
        true,
        2.5
    ),
    new Book(
        "Fifty Shades of Grey",
        "E.L. James",
        "Romance, Erotic Fiction",
        "Anastasia Steele meets wealthy entrepreneur Christian Grey, whose allure is as intense as his lifestyle. She finds herself pulled into a relationship that tests her boundaries and desires. E.L. James’s book sparked much debate, becoming a cultural phenomenon with its exploration of complex adult relationships and power dynamics.",
        514,
        "A polarizing read with mixed reviews. While popular, it’s often criticized for its writing style and portrayal of relationships.",
        true,
        2
    ),
    new Book(
        "Eragon",
        "Christopher Paolini",
        "Fantasy, Young Adult",
        "Eragon, a young farm boy, stumbles upon a dragon egg and is thrust into a world of magic, danger, and destiny. With his dragon, Saphira, Eragon must face powerful foes and allies as he trains to become one of the last Dragon Riders. Paolini’s debut novel is a coming-of-age story that blends fantasy elements with classic heroism.",
        503,
        null,
        false,
        0
    ),
    new Book(
        "The Catcher in the Rye",
        "J.D. Salinger",
        "Literary Fiction, Coming-of-Age",
        "Holden Caulfield, a disaffected teenager, narrates his journey through New York City after being expelled from prep school. Searching for meaning in a world he views as phony, Holden’s struggles with identity, alienation, and growing up are both relatable and poignant. Salinger’s novel remains a staple of American literature.",
        214,
        "A compelling portrayal of teenage angst. Holden's character captures the confusion and frustration of adolescence beautifully.",
        true,
        4
    ),
    new Book(
        "The Great Gatsby",
        "F. Scott Fitzgerald",
        "Fiction, Classic",
        "Nick Carraway recounts his time on Long Island, where he befriends the mysterious Jay Gatsby, a man with a tragic obsession for Daisy Buchanan. Set against the backdrop of the Jazz Age, Fitzgerald’s novel explores themes of wealth, love, and the elusive American Dream, capturing the decadence and disillusionment of the 1920s.",
        180,
        "A beautifully written tragedy that reflects on ambition and loss. Fitzgerald’s style is poetic and hauntingly captures the era.",
        true,
        4.5
    ),
    new Book(
        "Moby-Dick",
        "Herman Melville",
        "Adventure, Classic",
        "Captain Ahab, driven by a relentless quest for revenge, leads his crew on a dangerous journey to hunt the elusive white whale, Moby-Dick. Melville’s epic tale is a profound exploration of obsession, nature, and humanity’s place in the universe. Combining adventure with philosophical depth, it challenges readers to think beyond the story.",
        635,
        null,
        false,
        null
    )
];
  const addBookBtn = document.querySelector(".add-book-btn");
  const bookStatCheckBox = document.getElementById("book-status");
  const ratingsDiv = document.querySelector(".rating-group");
  const addBookForm = document.getElementById("add-book-form");
  const cancelBtn = document.querySelector(".cancel-book-btn");
  const reviewDiv = document.querySelector(".book-review-div");
  let bookCollection = document.querySelector(".book-collection");
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
    myLibrary.push(newBook);
    console.log(myLibrary);
    cancelBtn.dispatchEvent(new Event("click"));
    displayBooks();
  }

  function displayBooks() {
    // bookCollection.innerHTML = '';
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
      else {
        ratingContainer.textContent = "No rating yet";
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
      pages.innerHTML = `${book.pages} <i class="italic-book fa-solid fa-book-open" title= "no. of pages" style="color: #33846c;"></i>`;

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

  reviewBtn.addEventListener("click", function() {
    const cardBody = document.querySelector(".card-body");
    cardBody.style.transform = "rotateY(180deg)";
  });

  backToCardBtn.addEventListener("click", function() {
    const cardBody = document.querySelector(".card-body");
    cardBody.style.transform = "rotateY(0deg)";
  });

  // displayBooks();
});