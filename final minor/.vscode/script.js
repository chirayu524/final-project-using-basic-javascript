// Get the form and book list elements
const createBookForm = document.getElementById('create-book-form');
const bookList = document.getElementById('book-list');

// Create an array to store the books
let books = [];

// Function to create a new book
function createBook(title, author) {
  const book = {
    title,
    author,
    id: Date.now()
  };
  books.push(book);
  renderBookList();
}

// Function to render the book list
function renderBookList() {
  bookList.innerHTML = '';
  books.forEach(book => {
    const bookListItem = document.createElement('li');
    bookListItem.textContent = `${book.title} by ${book.author}`;
    bookListItem.dataset.bookId = book.id; // Set the bookId as a dataset attribute
    bookList.appendChild(bookListItem);
  });
}

// Add event listener to the create book form
createBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  createBook(title, author);
  createBookForm.reset();
});

// Add event listener to the book list
bookList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const bookId = e.target.dataset.bookId;
    const book = books.find(book => book.id === parseInt(bookId));
    if (book) {
      if (e.ctrlKey || e.metaKey) { // Check if Ctrl or Meta key is pressed
        // Delete the book
        books = books.filter(b => b.id !== book.id);
        renderBookList();
      } else {
        // Update the book
        const updatedTitle = prompt('Enter new title:', book.title);
        const updatedAuthor = prompt('Enter new author:', book.author);
        book.title = updatedTitle;
        book.author = updatedAuthor;
        renderBookList();
      }
    }
  }
});