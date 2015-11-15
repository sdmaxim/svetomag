var user = {
	userName: '',
	userPass: ''
};

// handler for homepage
exports.index = function (req, res) {
	res.render('index');
};

// handler for login form submitted from homepage
exports.login = function (req, res) {
	// if the userName is not submitted, give it a default of "Anonymous"
	req.session.userName = req.body.userName || 'Anonymous';
	req.session.userPass = req.body.userPass || '';

	user = {
		userName: req.session.userName,
		userPass: req.session.userPass
	};

	console.log(user);
	
	res.send(user);
	res.end();
};

exports.getLogin = function (req, res) {
	user = {
		userName: req.session.userName,
		userPass: req.session.userPass
	};
	console.log(user);

	res.send(user);
	res.end();
};
