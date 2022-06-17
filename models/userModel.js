

var db = require.main.require('./models/config');

var validateUser = (email, password, callback) => {
    var sql = "SELECT * FROM bookshop.users WHERE email = ? AND password = ?";
    db.executeQuery(sql, [email, password], function (result) {
        callback(result);
    });
};


function runQuery(tableName, req, res, parameters, sqlForPreparedStatement, isone = false) {

    let results;

    try {
        let stmt = db.prepare(sqlForPreparedStatement);
        //if query starts with select then use All
        // else use the run method

        let method = sqlForPreparedStatement.trim().toLowerCase().indexOf('select') === 0 ?
            'all' : 'run';
        results = stmt[method](parameters);

    }
    catch (error) {

        results = { _error: error + '' };

    }

    if (isone) {


        results = results[0];


    }
    results = results || null;
    res.status(results ? (results._error ? 500 : 200) : 404);
    res.json(results);

}




var createUser = (user, callback) => {
   
    
    var sql = "INSERT INTO bookshop.users VALUES( ?,?, ?, ?, ?, ?)";
    for (var i = 10; i < 100; i++) {
        var random = i * Math.floor(Math.random()*2);
        db.executeQuery(sql, [random, user.email, user.firstName, user.lastName, user.password, "user"], function (result) {
            callback(result);
        
        });

    };
}

var getUser = (id, callback) => {
    var sql = "SELECT * FROM bookshop.users WHERE users.id=?";
    db.executeQuery(sql, [id], function(result) {
        callback(result[0]);
    });
};

var updateUser = (user, callback) => {
    var sql = "UPDATE bookshop.users SET name = ?, email = ?, phone = ?, address = ?, gender = ? WHERE users.id = ?";
    db.executeQuery(sql, [user.name, user.email, user.phone, user.address, user.gender, user.user_id], function(result) {
        callback(result);
    });
};

var updatePassword = (password, id, callback) => {
    var sql = "UPDATE bookshop.users SET password = ? WHERE users.id = ?";
    db.executeQuery(sql, [password, id], function(result) {
        callback(result);
    });
};

var getAll = (callback) => {
    var sql = "SELECT * FROM bookshop.users";
    db.executeQuery(sql, null, function(result) {
        callback(result);
    });
};

var searchBy = (searchBy, word, callback) => {
    var sql = "SELECT * FROM bookshop.users WHERE "+searchBy+" = ?";
    db.executeQuery(sql, [word], function(result) {
        callback(result);
    });
};

var updateCustomer = (id, customer, callback) => {
    var sql = "UPDATE bookshop.users SET name = ?, email = ?, phone = ?, address = ?, gender = ? WHERE users.id = ? ";
    db.executeQuery(sql, [customer.name, customer.email, customer.phone, customer.address, customer.gender, id], function(result) {
        callback(result);
    });
};

var deleteUser = (id, callback) => {
    var sql = "DELETE FROM bookshop.users WHERE users.id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};
var getUserBorrow = (id, callback) => {
    var sql = "SELECT bookshop.books.*, issue_books.books_id, issue_books.date FROM bookshop.issue_books INNER JOIN bookshop.books ON issue_books.books_id=books.id WHERE issue_books.users_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};
var getUserHistory = (id, callback) => {
    var sql = "SELECT bookshop.books.*, issue_books.books_id, issue_books.date FROM bookshop.issue_books INNER JOIN bookshop.books ON issue_books.books_id=books.id WHERE issue_books.users_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};

var totalBooksBorrowedByCustomer = (id, callback) => {
    var sql = "SELECT bookshop.books.*, issue_books.books_id FROM bookshop.issue_books INNER JOIN bookshop.books ON issue_books.books_id=books.id WHERE issue_books.users_id = ?";
    db.executeQuery(sql, [id], function(result) {
        callback(result);
    });
};


module.exports = {
    validateUser,
    createUser,
    getUser,
    updateUser,
    updatePassword,
    getAll,
    searchBy,
    updateCustomer,
    deleteUser,
    getUserBorrow,
    getUserHistory,
    totalBooksBorrowedByCustomer
};
