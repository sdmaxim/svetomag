//MySQL DB
var mysql = require('mysql');
var mysql_connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'svetomag_main'
});

exports.category_list = function (req, res) {
	var val = 0;
	var query = 'SELECT c.category_id, c.category_name, cx.category_parent_id, cx.category_child_id ' +
				'FROM `jos_vm_category_xref` cx ' +
				'LEFT JOIN `jos_vm_category` c ON c.category_id = cx.category_child_id ' +
				'WHERE cx.category_parent_id = ' + val + ' ' +
				'ORDER BY c.list_order ' +
				'LIMIT 20 ';

	mysql_connection.query(query,
		function (err, rows) {
			/*rows = { category_id: 348,
					category_name: 'Лампочки',
					category_parent_id: 0,
					category_child_id: 348
			};*/
			//var products = array();
			if (err) throw err;

			//console.log(rows);
			res.send(rows);
			res.end();
			//mysql_connection.end();
		}
	);
};

exports.searching = function (req, res) {

	// input value from search
	var val = req.query.search;
	console.log(val);
	var query = 'SELECT p.product_id, p.product_name, p.product_desc, p.product_full_image, ' +
				'p.parameter_1, p.parameter_8, SUM(s.product_in_stock) as stock_sum, ' +
				'GROUP_CONCAT(s.product_price) as price, ' +
				'GROUP_CONCAT(s.product_in_stock) as stock, ' +
				'GROUP_CONCAT(s.prov_id) as prov_id ' +
				'FROM `jos_vm_product_category_xref` pc, `jos_vm_product` p ' +
				'LEFT JOIN `jos_vm_stock_price` s ON p.product_id = s.product_id ' +
				'WHERE pc.category_id = ' + val + ' ' +
				'AND p.product_id = pc.product_id ' +
				'AND s.product_in_stock > 0 ' +
				'GROUP BY p.product_id ' +
				'LIMIT 10';

//    console.log(query);

	mysql_connection.query(query,
		function (err, rows) {
			//var products = array();
			if (err) throw err;

			//console.log(rows);
			res.send(rows);
			res.end();
			//mysql_connection.end();
		}
	);
};

exports.get_product_info = function (req, res) {
	// input value from search
	var productId = req.query.productId;
	//console.log(productId);
	var query = 'SELECT p.product_id, p.product_name, p.product_desc, p.product_full_image, ' +
		'p.parameter_1, p.parameter_8, SUM(s.product_in_stock) as stock_sum, ' +
		'GROUP_CONCAT(s.product_price) as price, ' +
		'GROUP_CONCAT(s.product_in_stock) as stock, ' +
		'GROUP_CONCAT(s.prov_id) as prov_id ' +
		'FROM `jos_vm_product` p ' +
		'LEFT JOIN `jos_vm_stock_price` s ON p.product_id = s.product_id ' +
		'WHERE p.product_id = ' + productId + ' ' +
		'AND s.product_in_stock > 0 ' +
		'GROUP BY p.product_id ' +
		'LIMIT 10';

//    console.log(query);

	mysql_connection.query(query,
		function (err, rows) {
			if (err) throw err;
			console.log(rows);
			res.send(rows);
			res.end();
		}
	);
}
