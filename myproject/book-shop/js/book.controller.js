'use strict'
// is it isModalOpen or GismodalOpen? 
var isModalOpen = false;

function onInit() {
    renderBooks();
}


function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(function (book) {
        console.log('books', book.imgUrl);
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td><img src="img/${book.imgUrl}.jpg"></td>
        <td><button class="read" onclick="onToggleModal(false,'${book.id}')">read</button></td>
        <td><button class="update" onclick="onToggleUpdate('${book.id}')">update</button></td>
        <td><button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        <td>${book.rate}</td>
        </tr>
    `
    })
    document.querySelector('.books').innerHTML = strHtmls.join('')
}

function onAddBook() {
    var bookSummary = document.querySelector('textarea').value;
    var bookPrice = document.querySelector('input[name=book-price]').value;
    var bookName = document.querySelector('input[name=book-name]').value;
    var summary = bookSummary.trim();
    var price = bookPrice.trim();
    var name = bookName.trim();
    console.log('summary', name);
    if (!summary  || price === '' || name === '') {
        alert('you have missing line')
    } else {
        addBook(name, price, summary);
        onToggleModal();
    }
    renderBooks();
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onToggleModal(condition, bookId) {
    var elmodl = document.querySelector('.modal');
    elmodl.classList.toggle('open')
    if (isModalOpen) {
        isModalOpen = false;
        return;
    }
    renderModal(condition, bookId);
    isModalOpen = true;
}

function renderModal(condition, bookId) {
    var books = getBooks();
    var strHtml = '';
    if (condition) {
        strHtml =
            `<h3>Please enter details to create a new book on the shelf</h3>
        <input type="text" name="book-name" placeholder="name of the book?" /><br>
        <h4>please enter the book prise</h4>
        <input type="text" name="book-price" placeholder="price of the book?" /><br>
        <h4>book summary</h4>
        <textarea></textarea><br>
        <button onclick="onAddimg()">Add image...</button><br>
        <hr>
        <button onclick="onAddBook()">Add</button>`
    } else {

        var book = books.filter(book => {
            return (book.id === bookId)
        });
        // console.log('book', book[0].name);
        (strHtml =
            ` <p>book id : ${bookId}</p>
            <h2>${book[0].name}</h2>
            <img src="img/${book[0].imgUrl}.jpg"><br>
            <span>this book is only ${book[0].price} </span><hr>
            <p>${book[0].summary}</p><hr>
            <button onclick="onputrate(true,'${bookId}')">+</button><span class="rate"></span> <button onclick="onputrate(false,'${bookId}')">-</button>   `
        )

    }
    document.querySelector('.main-modal').innerHTML = strHtml;
    document.querySelector('.rate').innerText = book[0].rate;
}

function onToggleUpdate(bookId) {
    var elmodalUpdate = document.querySelector('.modal-update');
    // console.log('elmodalUpdate', elmodalUpdate);
    elmodalUpdate.classList.add('open-update');
    var books = getBooks();
    var book = books.filter(book => {
        return (book.id === bookId)
    });
    elmodalUpdate.innerHTML =
        `
    <h3>${book[0].name}</h3>
    <h2>price: ${book[0].price}</h2>
    <h2>new price</h2>
    <input type="number" name="update-price" placeholder="enter new price" />
    <br>
    <button onclick="onUpdate('${bookId}')">update</button>
    `
}

function onUpdate(bookId) {
    var newPrice = document.querySelector('input[name=update-price]').value;
    if (newPrice > 0) {
        console.log(newPrice + 5);
        update(bookId, +newPrice);
        renderBooks();
    }
    document.querySelector('.modal-update').classList.remove('open-update');
}

function onputrate(condition, bookId) {
    var books = getBooks();
    var book = books.find(book => book.id === bookId);
    var rate = book.rate;
    if (condition) {
        rate++
        if (rate > 10) rate = 10
    } else {
        rate--
        if (rate < 1) rate = 1
    }
    putRate(bookId, rate);
    document.querySelector('.rate').innerText = rate;
    renderBooks();
}

function onFilterList(indication, elTitle) {
    elTitle.classList.add('choose');
    filterList(indication)
    setTimeout(function () {
        elTitle.classList.remove('choose');
    }, 300);
    renderBooks();
}

function onNextPage(condition) {
    setNextPage(condition)
    renderBooks()
}
