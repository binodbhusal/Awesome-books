const bookItem = document.getElementById("book-list");
const addBtn = document.getElementById("addBtn");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const error = document.getElementById("error");
const form = document.getElementById("form");

class Book {
  constructor() {
    this.bookList = JSON.parse(localStorage.getItem("storage-book")) || [];
  }
  //add book
  addNewBook(author, title) {
    const updatedBook = [
      ...this.bookList,
      { id: `${Math.random()}${author.split(" ")[0]}`, author, title },
    ];
    //it needs to update the storage
    updateStorage(updatedBook);
  }
  //remove book
  removeBook(id) {
    const updatedBook = this.bookList.filter((it) => it.id !== id);
    this.updateStorage(updatedBook);
  }
  //get book from storage
  getBook() {
    return this.bookList;
  }
  //update the storage
  updateStorage(data) {
    localStorage.setItem("storage-book", JSON.stringify(data));
    this.bookList = data;
  }
}

//instntiate book class
const books = new Book();

