let myLibrary;
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

function Book(name, author, year, description, image, read = false) { //constructor del objeto libro
    this.name = name;
    this.author = author;
    this.year = year;
    this.description = description;
    this.image = image;
    this.read = read;
}

Book.prototype.toggleRead = function(e) {  //marcar o no como leido
    if (this.read) 
        e.target.textContent = 'Read';
    else
        e.target.textContent = 'Read ✓';
    this.read = !this.read;
    e.target.toggleAttribute('read');
    localStorage.setItem('array', JSON.stringify(myLibrary));
}

window.addEventListener('load', () => {
    if (localStorage.length>0) {
        myLibrary = JSON.parse(localStorage.getItem('array'));
        myLibrary = myLibrary.map(book => (book) ? new Book(book.name, book.author, book.year, book.description, book.image, book.read) : null);
    }
    else {
        let Book1 = new Book('1984', 'George Orwell', '1949', '1984 (en su versión original en inglés: Nineteen Eighty-Four) es una novela política de ficción distópica, escrita por George Orwell entre 1947 y 1948 y publicada el 8 de junio de 1949. La novela popularizó los conceptos del omnipresente y vigilante Gran Hermano o Hermano Mayor, de la notoria habitación 101, de la ubicua policía del Pensamiento y de la neolengua, adaptación del idioma inglés en la que se reduce y se transforma el léxico con fines represivos, basándose en el principio de que lo que no forma parte de la lengua, no puede ser pensado.', 'https://contentv2.tap-commerce.com/cover/large/9789875669284_1.jpg?id_com=1113');
        let Book2 = new Book('Brave New World', 'Aldous Huxley', '1932', 'Un mundo feliz (en inglés Brave New World) es la novela más famosa del escritor británico Aldous Huxley, publicada por primera vez en 1932. La novela es una distopía que anticipa el desarrollo en tecnología reproductiva, cultivos humanos e hipnopedia, manejo de las emociones por medio de drogas (soma) que, combinadas, cambian radicalmente la sociedad.', 'https://http2.mlstatic.com/book-brave-new-world-aldous-huxley-D_NQ_NP_819086-MLA27844935653_072018-F.jpg');
        myLibrary = []; 
        myLibrary.push(Book1);
        myLibrary.push(Book2);
        localStorage.setItem('array', JSON.stringify(myLibrary));
    }
    myLibrary.forEach((book, index) => render(book, index));
}) //carga inicial del arreglo sobre la pagina


function deleteBook(e) {
       const bookIndex = e.target.parentNode.getAttribute('data-index');
             node = e.target.parentNode.parentNode; // nodo book;
       myLibrary[bookIndex] = null;
       node.parentNode.removeChild(node);
       localStorage.setItem('array', JSON.stringify(myLibrary));
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
    if (elem) {
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
    if (elem.read) {
        markRead.textContent = 'Read ✓';
        markRead.toggleAttribute('read');
    }
    else
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
    list.appendChild(book);
    }
}

addBook.addEventListener('click', appendBook);

function appendBook() {
    form.reset();
    formDiv.toggleAttribute('active');
}

function editBook(e) { 
    edit.status = true;
    edit.id = e.target.parentNode.getAttribute('data-index');
    edit.node = e.target.parentNode.parentNode;
    setForm();
    formDiv.toggleAttribute('active');
}

function setForm() { //establece el form con los datos del libro
    form.querySelectorAll('input, textarea').forEach(node => {
        node.value = myLibrary[edit.id][node.getAttribute('name')];
    });
}

cancel.addEventListener('click', () => { //cancelar el formulario
    edit.status = false;
    formDiv.toggleAttribute('active');
});

submit.addEventListener('click', e => submitBook(e)) 

function submitBook(e){ //guarda informacion del formulario como objeto.
    let formBook = new Book();
    form.querySelectorAll('input, textarea').forEach(node => formBook[node.getAttribute('name')] = node.value);
    if (!formBook.image)
        formBook.image = "https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg";
    else if (!formBook.image.startsWith("https://"))
            formBook.image = "https://" + formBook.image;
    if (edit.status)
        edition(formBook);
    else 
        addition(formBook);
    formDiv.toggleAttribute('active');
    localStorage.setItem('array', JSON.stringify(myLibrary));
}

function addition(formBook) { //agregar nuevo libro al array.
    let bookIndex = myLibrary.indexOf(null);
    if (bookIndex==-1)
        bookIndex = myLibrary.length;
    myLibrary[bookIndex] = formBook;
    render(myLibrary[bookIndex], bookIndex);
}

function edition(formBook) { //editar el html.
    edit.node.getElementsByClassName('cover')[0].setAttribute('src', formBook.image);
    edit.node.getElementsByClassName('title')[0].childNodes[0].textContent = formBook.name;
    edit.node.getElementsByClassName('author')[0].textContent = formBook.author;
    console.log(edit.node);
    edit.node.getElementsByClassName('year')[0].textContent = formBook.year;
    edit.node.getElementsByClassName('description')[0].textContent = formBook.description;
    formBook.read = myLibrary[edit.id].read;
    myLibrary[edit.id] = formBook;
    edit.status = false;
}

//FIREBASE



