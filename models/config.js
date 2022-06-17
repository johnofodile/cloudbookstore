var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'mysql'
});


module.exports = {
	executeQuery: function(sql, sqlParam, callback){
		if(sqlParam == null)
		{
			connection.query(sql, function(error, result){
				if(error)
				{
					console.log(error);
				}
				callback(result);
			});
		}
		else
		{
			connection.query(sql, sqlParam, function(error, result){
				if(error)
				{
					console.log(error);
				}
				callback(result);
			});
		}
	}
};
