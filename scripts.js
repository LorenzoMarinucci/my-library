let myLibrary = [];

function Book(name, author, year, description, image) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.description = description;
    this.image = image;
}

function addBookToLibrary() {
    name = prompt("Book's name");
    author = prompt("Book's author");
    year = prompt("Book's year");
    description = prompt("Book's description");
    image = prompt("Book's image");
    myLibrary.push(new Book(name, author, year, description, image));
}