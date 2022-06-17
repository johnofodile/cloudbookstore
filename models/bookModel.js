var db = require.main.require('./models/config');

var getAll = (callback) => {
    var sql = "SELECT * FROM bookshop.books ";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var searchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM bookshop.books WHERE "+searchBy+" = ?";
    db.executeQuery(sql, [word], function(result) {
        callback(result);
    });
};

var createBook = (book, callback) => {
    var date = new Date();
    var sql = "INSERT INTO bookshop.books VALUES(?, ?, ?, ?, ?,?,?)";
    db.executeQuery(sql, [book.id, book.title, book.author, book.genre,book.description, book.edition, book.isbn], function(result) {
        callback(result);
    });
};

var getBook = (id, callback) => {
    var sql = "SELECT * FROM bookshop.books WHERE books.id=?";
    db.executeQuery(sql, [id], function(result) {
        callback(result[0]);
    });
};

var updateBook = (id, book, callback) => {
    var sql = "UPDATE bookshop.books SET genre = ?, title = ?, author = ?, edition = ?, isbn = ?  WHERE books.id = ?";
    db.executeQuery(sql, [book.genre, book.title, book.author, book.edition, book.isbn, id], function(result) {
        callback(result);
    });
};

var deleteBook = (id, callback) => {
    var sql = "DELETE FROM bookshop.books WHERE book.id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};

var issueBook = (book_id, customer_id, callback) => {
    var date = new Date();
    var sql = "UPDATE bookshop.issue_books SET issue_books.users_id = ? WHERE issue_books.books_id = ?";
    db.executeQuery(sql, [customer_id, book_id], function(result) {
        callback(result);
    });
};





var getUnborrowedBooks = (callback) => {
    var sql = "SELECT bookshop.books.*, issue_books.books_id FROM bookshop.issue_books INNER JOIN bookshop.books ON issue_books.books_id != books.id";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var bookRequest = (customer_id, book, callback) => {
    var date = new Date();
    var sql = "INSERT INTO bookshop.request_books VALUES( null,?, ?, ?, ?, ?, ?, ?)";
    db.executeQuery(sql, [customer_id, book.title, book.author, book.genre, book.edition, book.isbn, date], function(result) {
        callback(result);
    });
};

var customerSearch = ( word, callback) => {
    var sql = "SELECT * FROM bookshop.books WHERE title = ? ";
    db.executeQuery(sql, [word], function(result) {
        callback(result);
    });
};

var getRequestedBooks = (callback) => {
    var sql = "SELECT * FROM bookshop.request_books";
    db.executeQuery(sql, null, function (result) {
        callback(result);
    });
};


var setIssueDate = (book_id, customer_id, callback) => {
    var date = new Date();
    var sql = "INSERT INTO bookshop.issue_books VALUES( ?, ?, ?)";
    db.executeQuery(sql, [book_id, customer_id, date], function (result) {
        callback(result);
    });
};

var booksIssuedByCustomer = (customer_id, callback) => {
    var sql = "SELECT * FROM bookshop.users WHERE users.id = ?";
    db.executeQuery(sql, [customer_id], function (result) {
        callback(result);
    });
};

var getAllBorrowedBooks = (callback) => {
    var sql = "SELECT * FROM bookshop.issue_books";
    db.executeQuery(sql, null, function (result) {
        callback(result);
    });
};

var totalBorrowed30 = (callback) => {
    var result = new Date();
    var newDate = result.setDate(result.getDate() + 30);
    var sql = "SELECT bookshop.books.*, issue_books.books_id FROM bookshop.issue_books INNER JOIN bookshop.books ON bookshop.issue_books.books_id= books.id WHERE (date BETWEEN ? AND ?)";
    db.executeQuery(sql, [newDate, result], function (result) {
        callback(result);
    });
};



var mostRequestedBook = (callback) => {
    var sql = "SELECT *, COUNT(*) AS magnitude FROM bookshop.issue_books GROUP BY issue_books.books_id ORDER BY magnitude DESC LIMIT 1";
    db.executeQuery(sql, null, function (result) {
        callback(result);
    });
};


module.exports = {
    getAll,
    searchBy,
    createBook,
    getBook,
    updateBook,
    deleteBook,
    issueBook,

    getUnborrowedBooks,
    bookRequest,
    customerSearch,
    getRequestedBooks,
 
    setIssueDate,
    booksIssuedByCustomer,
    getAllBorrowedBooks,
  
    mostRequestedBook,
 
};
