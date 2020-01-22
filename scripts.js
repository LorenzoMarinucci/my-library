let myLibrary = [];
const list = document.getElementById("list");
      deleteButtons = document.getElementsByClassName('delete');
      editButtons = document.getElementsByClassName('edit');
      markReadButtons = document.getElementsByClassName('markRead');
      addBook = document.getElementById('add');

function Book(name, author, year, description, image) { //constructor del objeto libro
    this.name = name;
    this.author = author;
    this.year = year;
    this.description = description;
    this.image = image;
    this.read = false;
}

Book.prototype.toggleRead = function(e) {
    if (this.read) 
        e.target.textContent = 'Read';
    else
        e.target.textContent = 'Read ✓';
    this.read = !this.read;
    e.target.toggleAttribute('read');
}

let Book1 = new Book('1984', 'Orwell', '1940', 'dadsad', 'asd');

let Book2 = new Book('Brave New World', 'Huxley', '1950', 'asdas', 'none');

myLibrary.push(Book1);
myLibrary.push(Book2);

window.addEventListener('load', () => myLibrary.forEach((book, index) => render(book, index)));

markReadButtons.forEach(button => button.addEventListener('click', e => myLibrary[e.target.parentNode.getAttribute('data-index')].toggleRead(e)));
deleteButtons.forEach(button => button.addEventListener('click', e => deleteBook(e)));

function deleteBook(e) {
       const bookIndex = e.target.parentNode.getAttribute('data-index');
             node = e.target.parentNode.parentNode; // nodo book;
       delete myLibrary[bookIndex];
       node.parentNode.removeChild(node);
}

function addBookToLibrary() {  //función temporal para añadir libros.
    name = prompt("Book's name");
    author = prompt("Book's author");
    year = prompt("Book's year");
    description = prompt("Book's description");
    image = prompt("Book's image");
    myLibrary.push(new Book(name, author, year, description, image));
    render(myLibrary[myLibrary.length-1], myLibrary.length-1);
}

function render(elem, index) {  //creacion de los elementos HTML pertenecientes a cada libro
    let book = document.createElement('div');
    book.classList.add('book');
    let img = document.createElement('img');
    img.setAttribute('src', elem.image);
    img.setAttribute('alt', "Book cover");
    img.classList.add('cover');
    book.appendChild(img);
    let info = document.createElement('info');
    info.classList.add('info');
    let title = document.createElement('div');
        description = document.createElement('div');
        author = document.createElement('div');
        year = document.createElement('span');
    title.classList.add('title');
    title.textContent = elem.name;
    year.classList.add('year');
    year.textContent = elem.year;
    title.appendChild(year);
    author.classList.add('author');
    author.textContent = elem.author;
    description.classList.add('description');
    description.textContent = elem.description;
    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(description);
    book.appendChild(info);
    let options = document.createElement('div')
        markRead = document.createElement('button');
        edit = document.createElement('button');
        deleteButton = document.createElement('button');
    options.classList.add('options');
    options.setAttribute('data-index', index);
    markRead.classList.add('markRead');
    markRead.textContent = 'Read';
    markRead.addEventListener('click', e => myLibrary[index].toggleRead(e));
    edit.classList.add('edit');
    edit.textContent = "Edit";
    deleteButton.classList.add('delete');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', e => deleteBook(e));
    options.appendChild(markRead);
    options.appendChild(document.createElement("br"));
    options.appendChild(deleteButton);
    options.appendChild(document.createElement("br"));
    options.appendChild(edit);
    book.appendChild(options);
    console.log(book);
    //list.appendChild(document.createElement("br"));
    list.appendChild(book);
}