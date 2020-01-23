let myLibrary = [];
    edit = {status: true, id: ""};
const list = document.getElementById("list");
      deleteButtons = document.getElementsByClassName('delete');
      editButtons = document.getElementsByClassName('edit');
      markReadButtons = document.getElementsByClassName('markRead');
      addBook = document.getElementById('add');
      cancel = document.getElementById('cancel');
      submit = document.getElementById('submit');
      form = document.querySelector('form');
      formDiv = document.getElementById('form');

function Book(name, author, year, description, image) { //constructor del objeto libro
    this.name = name;
    this.author = author;
    this.year = year;
    this.description = description;
    this.image = image;
    this.read = false;
}

Book.prototype.toggleRead = function(e) {  //marcar o no como leido
    if (this.read) 
        e.target.textContent = 'Read';
    else
        e.target.textContent = 'Read ✓';
    this.read = !this.read;
    e.target.toggleAttribute('read');
}

let Book1 = new Book('1984', 'Orwell', '1940', 'dadsad', 'https://asd');
let Book2 = new Book('Brave New World', 'Huxley', '1950', 'asdas', 'https://none');
myLibrary.push(Book1);
myLibrary.push(Book2);
window.addEventListener('load', () => myLibrary.forEach((book, index) => render(book, index))); //carga inicial del arreglo sobre la pagina

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
    edit.addEventListener('click', e => editBook(e))
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

addBook.addEventListener('click', appendBook);

function appendBook() {
    form.reset();
    formDiv.toggleAttribute('active');
}

function editBook(e) {
    edit.status = true;
    edit.id = e.target.parentNode.getAttribute('data-index');
    setForm(e.target.parentNode.getAttribute('data-index'));
    formDiv.toggleAttribute('active');
    console.log("sda");
}

function setForm(bookIndex) {
    form.childNodes.forEach(node => {
        node.value = myLibrary[bookIndex[getAttribute('name')]];
    });
}

cancel.addEventListener('click', () => {
    edit.status = false;
    formDiv.toggleAttribute('active');
});

submit.addEventListener('click', e => submitBook(e)) 

function submitBook(e){
    let formBook = new Book();
    form.querySelectorAll('input, textarea').forEach(node => formBook[node.getAttribute('name')] = node.value);
    if (!formBook.image)
        formBook.image = "https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg";
    else if (!formBook.image.startsWith("https://"))
            formBook.image = "https://" + formBook.image;
    if (edit.status)
        edition(formBook, e);
    else 
        addition(formBook);
    formDiv.toggleAttribute('active');
}

function addition(formBook) {
    let bookIndex = myLibrary.indexOf(undefined);
    if (bookIndex==-1)
        bookIndex = myLibrary.length;
    myLibrary[bookIndex] = formBook;
    render(myLibrary[bookIndex], bookIndex);
}

function editions(formBook, e) {
    const currentBook = e.target.parentNode.parentNode;
    currentBook.getElementsByClassName('cover').textContent = formBook.image;
    currentBook.getElementsByClassName('title').textContent = formBook.name;
    currentBook.getElementsByClassName('author').textContent = formBook.author;
    currentBook.getElementsByClassName('year').textContent = formBook.year;
    currentBook.getElementsByClassName('description').textContent = formBook.description;
    myLibrary[edit.id] = formBook;
    edit.status = false;
}