let myLibrary = [];
const list = document.getElementById("list");

function Book(name, author, year, description, image, read) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.description = description;
    this.image = image;
    this.read = read;
}

function addBookToLibrary() {
    name = prompt("Book's name");
    author = prompt("Book's author");
    year = prompt("Book's year");
    description = prompt("Book's description");
    image = prompt("Book's image");
    read = !!prompt("did you read the book?");
    myLibrary.push(new Book(name, author, year, description, image, read));
}

function render(elem) {
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
    markRead.classList.add('markRead');
    if (elem.read) {
        markRead.textContent = "Read ✓";
        markRead.toggleAttribute('read');
    }
    else
        markRead.textContent = "Read";
    edit.classList.add('edit');
    edit.textContent = "Edit";
    deleteButton.classList.add('delete');
    deleteButton.textContent = "Delete";
    options.appendChild(markRead);
    options.appendChild(document.createElement("br"));
    options.appendChild(deleteButton);
    options.appendChild(document.createElement("br"));
    options.appendChild(edit);
    book.appendChild(options);
    console.log(book);
    list.appendChild(document.createElement("br"));
    list.appendChild(book);
}