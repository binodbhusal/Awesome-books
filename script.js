/* eslint no-const-assign: "error" */
/* eslint-env es6 */
const bookItem = document.getElementById('table');
const addBtn = document.getElementById('addBtn');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const error = document.getElementById('error');

const listBtn = document.getElementById('list-link');
const formBtn = document.getElementById('form-link');
const contactBtn = document.getElementById('contact-link');

const listSection = document.getElementById('list');
const newBookSection = document.getElementById('form');
const contactSection = document.getElementById('contact');

class Book {
  constructor() {
    this.bookList = JSON.parse(localStorage.getItem('storage-book')) || [];
  }

  addNewBook(author, title) {
    const updatedBook = [
      ...this.bookList,
      {
        id: `${Math.trunc(Math.random() * 100000)}${author.split(' ')[0]}`,
        author,
        title,
      },
    ];

    this.updateStorage(updatedBook);
  }

  removeBook(id) {
    const updatedBook = this.bookList.filter((it) => it.id !== id);
    this.updateStorage(updatedBook);
  }

  getBook() {
    return this.bookList;
  }

  updateStorage(data) {
    localStorage.setItem('storage-book', JSON.stringify(data));
    this.bookList = data;
  }
}

const books = new Book();
let bookList = books.getBook();

const displayBooks = () => {
  bookItem.innerHTML = '';
  bookList.forEach((book) => {
    bookItem.insertAdjacentHTML(
      'beforeend',
      `
        <tr>
          <td>${book.title} by ${book.author}</td>
          <td><button class="btnRemove" id=${book.id}>Remove</button></td>
        </tr>`
    );
  });
};

const hideSections = () => {
  listSection.classList.add('hidden');
  newBookSection.classList.add('hidden');
  contactSection.classList.add('hidden');
};

const initialize = () => {
  hideSections();
  listSection.classList.remove('hidden');
  displayBooks();
};

initialize();

const checkEmpty = () => {
  if (bookTitle.value.length === 0 || bookAuthor.value.length === 0) {
    error.innerText = 'The values you provided are empty';
  }
  // return error.innerText;
};

const checkDoubles = () => {
  const checkBooks = bookList.find((book) => book.title === bookTitle.value);
  const checkAuthors = bookList.find(
    (book) => book.author === bookAuthor.value
  );
  if (checkBooks && checkAuthors) {
    error.innerText = 'There is already a duplicate here!!';
  } else {
    error.innerHTML = '';
    books.addNewBook(bookAuthor.value, bookTitle.value);
    bookList = books.getBook();
    hideSections();
    listSection.classList.remove('hidden');
    displayBooks();
  }
};

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkEmpty();
  checkDoubles();
});

document.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('.btnRemove');
  if (deleteButton) {
    books.removeBook(deleteButton.id);
    bookList = books.getBook();
    displayBooks();
  }
});

listBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  listSection.classList.remove('hidden');
});

formBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  newBookSection.classList.remove('hidden');
});

contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  contactSection.classList.remove('hidden');
});

displayBooks();
