const bookItem = document.getElementById('book-list');
    let bookList = [
        {   
            key: 1,
            title: 'Anna Karenyna',
            author: 'Leo Tolstoy'
        },
        {
            key: 2,
            title: 'Histories',
            author: 'Herodotus'
        },
        {
            key: 3,
            title: 'The name of the rose',
            author: 'Umberto Eco'
        }
    
]
function displayBooks(bookList){
    bookList.forEach(book => {
        bookItem.insertAdjacentHTML('afterend', `
        <li>
        <p>Author: ${book.author}</p>
        <p>Title: ${book.title}</p>
        <button id="${book.key}"class="btnRemove" type="button">Remove</button>
      </li>
      <hr>`)}
)};

console.log(displayBooks(bookList));