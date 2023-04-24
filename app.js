let bookList = [];

const bookItem = document.getElementById("book-list");
const addBtn = document.getElementById("addBtn");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const error = document.getElementById("error");
const form = document.getElementById("form");

const updateLocalStorage = (data) => {
  localStorage.setItem("storage-book", JSON.stringify(data));
};

const getLocalStorage = () => JSON.parse(localStorage.getItem("storage-book"));

const displayBooks = () => {
  bookList.forEach((book) => {
    bookItem.insertAdjacentHTML(
      "afterend",
      `
            <li>
            <p>Author: ${book.author}</p>
            <p>Title: ${book.title}</p>
            <button id="${book.key}"class="btnRemove" type="button">Remove</button>
          </li>
          <hr>`
    );
  });
};

const initialize = () => {
  bookList = getLocalStorage() || [];
  displayBooks();
};

// we add new books here
const addNewBook = (title, author) => {
  const book = { title, author };
  const checkBooks = bookList.find((book) => book.title === title);
  const checkAuthors = bookList.find((book) => book.author === author);
  if (checkBooks && checkAuthors) {
    error.innerText = "There is already a duplicate here!!";
  } else {
    error.innerHTML = "";
  }
  bookList.push(book);
  updateLocalStorage(bookList);
  displayBooks();
};

error.innerHTML = "";
initialize();

addBtn.addEventListener("click", (e) => {
  console.log("it is clicked!");
  e.preventDefault();
  if (bookTitle.value.length === 0 || bookAuthor.value.length === 0) {
    error.innerText = `The values you provided are empty`;
  } else {
    addNewBook(bookTitle.value, bookAuthor.value);
    console.log(
      "the values are added to local storage and are displayed above"
    );
    form.reset();
  }
});
