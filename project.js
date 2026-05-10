const myLibrary = [];
const display = document.getElementsByClassName("content")[0];
const addBookBtn = document.getElementById("addBookBtn");


function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");

    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();



    Book.prototype.bookInfo = function () {
        console.log(`The ${this.title} by ${this.author} , ${this.pages} pages and ${this.read ? "read" : "not read yet"} `)
    }

}
Book.prototype.toggleRead = function () {
    this.read = !this.read;
}


function addBookToLibrary(title, author, pages, read) {
    if (myLibrary.some(book => book.title.toLowerCase() === title.toLowerCase())) {
        throw Error("Book Already Exists In The Library!");
    }
    if (title === "" || author === "" || pages === "") {
        alert("Please fill all fields");
        return;
    }
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {

    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i].title)
    }
}

function showLibrary() {
    addBookToLibrary("hello", "test", 100, false);
    displayBooks();
}

// addBookBtn.addEventListener("click", function () {

//     const addScreen = document.createElement("div");
//     addScreen.classList.add("addScreen");
//     addScreen.innerHTML = `
//     <div class="mb-3">
//         <label for="title" class="form-label">Title</label>
//         <input type="text" class="form-control" id="title">
//     </div>
//     <div class="mb-3">
//         <label for="author" class="form-label">Author</label>
//         <input type="text" class="form-control" id="author">
//     </div>
//     <div class="mb-3">
//         <label for="pages" class="form-label">Pages</label>
//         <input type="number" class="form-control" id="pages">
//     </div>
//     <div class="mb-3">
//         <label for="read" class="form-label">Read</label>
//         <input type="checkbox" class="form-check-input" id="read">
//     </div>
//     `;
//     display.appendChild(addScreen);

//     addBookToLibrary(document.getElementById("title").value, document.getElementById("author").value, document.getElementById("pages").value, document.getElementById("read").checked);

// });
const myModal = new bootstrap.Modal(document.getElementById("bookModal"));

addBookBtn.addEventListener("click", function () {
    myModal.show();
});

document.getElementById("saveBookBtn").addEventListener("click", function () {

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    renderLibrary();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;

    myModal.hide();
});

function renderLibrary() {
    display.innerHTML = "";

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card",
            "p-3",
            "mb-3",
            "bg-dark",
            "text-white",
            "shadow",
            "border-0"
        );
        bookCard.dataset.id = book.id;
        bookCard.style.width = "18rem";
        bookCard.innerHTML = `
            
                <h3>${book.title}</h3>
                <p>${book.author}</p >
                <p>Pages: ${book.pages} </p>
                <p>${book.read ? "Read" : "Not Read Yet"}</p>

                <button class="toggle-btn btn btn-warning">
                     Toggle Read
                 </button>
                    <br>
                  <button class="delete-btn btn btn-danger">
                     Delete
                  </button>
                `;
        const deleteBtn = bookCard.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function () {

            const bookId = bookCard.dataset.id;

            const bookIndex = myLibrary.findIndex(
                book => book.id === bookId
            );

            myLibrary.splice(bookIndex, 1);

            renderLibrary();
        });

        const toggleBtn = bookCard.querySelector(".toggle-btn");

        toggleBtn.addEventListener("click", function () {

            const bookId = bookCard.dataset.id;

            const selectedBook = myLibrary.find(
                book => book.id === bookId
            );

            selectedBook.toggleRead();

            renderLibrary();
        });
        display.appendChild(bookCard);
    });


}