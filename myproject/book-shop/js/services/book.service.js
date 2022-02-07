'use strict'

const STORAGE_KEY = 'bookDB';
const PAGE_SIZE = 4;
const BOOKS_NAME = ['books of color', 'books and ather stuff', 'The Book Trail', 'Lost in the library']
var gPageIdx = 0;
var gBooks;
// var gFilterBy = rate;

_createBooks();

function setNextPage(condition) {
    if(condition){
        gPageIdx++
        if (gPageIdx * PAGE_SIZE >= gBooks.length) {
            gPageIdx--
        }
    } else {
        gPageIdx--
        if (gPageIdx * PAGE_SIZE < 0) {
            gPageIdx++
        }
    }

}

function _createBook(name, summary, imgName) {
    // var books = loadFromStorage(STORAGE_KEY)
    // if(books.some(book => book))
    return {
        id: makeId(),
        name: name,
        price: getRandomIntInclusive(50, 250),
        imgUrl: imgName,
        summary: summary,
        rate: getRandomIntInclusive(1, 10)
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []

        for (let i = 0; i < BOOKS_NAME.length; i++) {
            var name = BOOKS_NAME[i]
            // var  = gs[getRandomIntInclusive(0, gs.length - 1)]
            var summary = makeLorem();
            var imgName = name;
            books.push(_createBook(name, summary, imgName))
        }
    }
    gBooks = books
    _saveCarsToStorage()
}

function getBooks() {
    var books = gBooks

    // var cars = gCars.filter((car) => car.vendor.includes(gFilterBy.vendor) && car.maxSpeed >= gFilterBy.minSpeed)
    const startIdx = gPageIdx * PAGE_SIZE

    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}

function addBook(name, price, summary, img = 'nopic') {
    var newBook = {
        id: makeId(),
        name: name,
        price: +price,
        imgUrl: img,
        summary: summary,
        rate: 5
    }
    console.log('newBook',newBook);
    gBooks.push(newBook);
    _saveCarsToStorage();

}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id);
    if (bookIdx < 0) return;
    gBooks.splice(bookIdx, 1);
    _saveCarsToStorage();
}

function update(bookId, newPrice) {
    var bookIDX = gBooks.findIndex(book => {
        return (book.id === bookId)
    });
    console.log('bookIDX', gBooks[bookIDX].price);
    gBooks[bookIDX].price = newPrice;
    _saveCarsToStorage()
}

function putRate(bookId, newRate) {
    var book = gBooks.find(book => book.id === bookId)
    book.rate = newRate;
    _saveCarsToStorage()
}

function filterList(indication) {
    switch (indication) {
        case 'abc':
            gBooks.sort(function (a, b) {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
            break;
        case 'price':
            gBooks.sort(function (a, b) {
                return b.price - a.price;
            })
            break;
        case 'rate':
            gBooks.sort(function (a, b) {
                return b.rate - a.rate;
            })
            break;
            // const queryStringParams = `?price=${gFilterBy.vendor}&minSpeed=${gFilterBy.minSpeed}`
            // const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
            // window.history.pushState({ path: newUrl }, '', newUrl)
        }
}
function _saveCarsToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)














}
