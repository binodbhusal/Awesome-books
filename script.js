/* eslint no-const-assign: "error" */
/* eslint-env es6 */
const bookItem = document.getElementById('table');
const addBtn = document.getElementById('addBtn');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const error = document.getElementById('error');
const form = document.getElementById('form');

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
        </tr>`,
    );
  });
};

const emptyCell = () => {
  if (bookTitle.value.length === 0 || bookAuthor.value.length === 0) {
    error.innerText = 'The values you provided are empty';
  }
  // return error.innerText;
};

const checkDoubles = () => {
  const checkBooks = bookList.find((book) => book.title === bookTitle.value);
  const checkAuthors = bookList.find(
    (book) => book.author === bookAuthor.value,
  );
  if (checkBooks && checkAuthors) {
    error.innerText = 'There is already a duplicate here!!';
  } else {
    error.innerHTML = '';
    books.addNewBook(bookAuthor.value, bookTitle.value);
    bookList = books.getBook();
    displayBooks();
  }
};

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  emptyCell();
  checkDoubles();
  form.reset();
});

document.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('.btnRemove');
  if (deleteButton) {
    books.removeBook(deleteButton.id);
    bookList = books.getBook();
    displayBooks();
  }
});

displayBooks();
