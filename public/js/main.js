/////////////////////////////
////    client side     ////
///////////////////////////
var stateMap = {
	cart: TAFFY(),
	productsView: TAFFY(),
	user: {
		name: '',
		pass: ''
	},
	miniCart: ''
};

var configMap = {
	server_name: 'http://svetomag.com',
	image_path: '/components/com_virtuemart/shop_image/product/',
	loginHtmlInput: '<form method="post">' +
	'<h3>Login</h3>' +
	'<input id="userName" type="text")' +
	'<br>' +
	'<h3>Password</h3>' +
	'<input id="userPass" type="text")' +
	'<br>' +
	'</form>' +
	'<div id="login" class="loginButton">Отправить</div>',
	loginHtmlShowUserName: 'You are enter as: '
};

var click_happened = 0;

$(document).ready(function () {
	initModule();
	showCategoryList();
});

var showCategoryList = function (){
	var parameters = {
		search: 0
	};
	$.get('/category_list', parameters, function (data) {
		var menu = '<div id="menu"><ul>';
		var category = '';
		data.forEach(function (item, i) {
			category += '<li class="mainLevel" catid="' + item.category_id + '" id="menuitem">' + item.category_name + '</li>';
		});
		menu += category;
		menu += '</ul></div>';

		$('#left').append(menu);

		$('#menu li').bind('click', function () {
			category = $(this).attr('catid');
			click_happened++;

			$('#footer').text("Click " + click_happened + " category ID " + category);
			var parameters = {
				search: category
			};
			show_products(parameters);

		});
	}, "json");
};

var show_products = function (category_id) {

	$.get('/searching', category_id, function (data) {
		$('#products').empty();

		if (stateMap.productsView().select('product_id').length > 0) {
			stateMap.productsView = TAFFY();
		}
		stateMap.productsView.insert(data);
		stateMap.productsView().each(function (item, i) {
			var imgPath = configMap.server_name + configMap.image_path + item.product_full_image;
			var cell = '<div class="cell" >' +
				'<div class="cell_image">' +
				'<img src="' + imgPath + '" alt="Показать полное описание?" width="150px" height="150px"/></div>' +
				'<div class="cell_description">' +
				'<div class="product_name">' + item.product_name + '</div>' +
				'<div class="product_desc">' + item.product_desc + '</div>' +
				'<div class="product_id">' + item.product_id + '</div>' +
				'<div class="stock">' + item.stock + '</div>' +
				'<div class="product_price">' + item.price + '</div>' +
				'<div id="prodId-' + item.product_id + '" class="cartButton">В корзину</div>' +
				'</div></div>';
			$('#products').append(cell);
		});
		$('.cartButton').bind('click', function () {
			var cartProdId = $(this).attr('id').split('-');
			cartProdId = parseInt(cartProdId[1]);
			addToCart(cartProdId);
		});
	}, "json");
};

var addToCart = function (cartProdId) {
	//Беру инфу о продукте из локальной базы
	var addProduct = stateMap.productsView({product_id: cartProdId}).first();
	//проверяю есть ли уже такой товар в корзине
	var cartProduct = stateMap.cart({product_id: cartProdId}).first();
	if (!cartProduct) {
		//если нет в корзине, уст. кол-во 1 и добавляю инфу продукта
		addProduct.quantity = 1;
		stateMap.cart.insert(addProduct);
	} else {
		//если есть, увеличиваю кол-во на 1
		cartProduct.quantity += 1;
		stateMap.cart({product_id : cartProdId}).remove();
		stateMap.cart.insert(addProduct);
		//stateMap.cart({product_id: cartProdId}).update({quantity: cartProduct.quantity});
	}
	miniCart('show');
	/*$.get('/cart', stateMap.cart, function(){

	});*/
	//addProduct = stateMap.cart({product_id : cartProdId}).first();
	//console.log(addProduct.product_name + ' ' + addProduct.quantity);
};

var miniCart = function (show) {

	if (show == 'init'){
		stateMap.cart.store('max');
	}
	stateMap.miniCart = '';
	$('#miniCartText').empty();

	if (stateMap.cart().select('product_id').length > 0) {
		//очистить контейнер мини корзины
		 if (show == 'empty') { //очистить корзину
			 stateMap.cart().each(function (item, i) {
				 stateMap.cart({product_id : item.product_id}).remove();
			 });
		} else if (show == 'show' || show == 'init') { //показать корзину
			stateMap.cart().each(function (item) {
				stateMap.miniCart += '<div class="product_id">' + item.product_id + '-' + item.quantity + 'шт,</div>';
			});
			$('#miniCartText').append(stateMap.miniCart);
		}
	}
};

var initModule = function () {
	$.post('/getlogin', {}, function (data) {

		stateMap.user.name = data.userName;
		showUserName();
		miniCart('init');

		$('#emptyMiniCart').bind('click', function () {
			miniCart('empty');
		});

		$('#login').bind('click', function () {
			var parameters = {
				userName: $("#userName").val(),
				userPass: $("#userPass").val()
			};
			$.post('/login', parameters, function (data) {
				stateMap.user = {
					name: data.userName,
					pass: data.userPass
				};
				if (stateMap.user.name !== undefined) showUserName();

			}, "json");
		});

	}, "json");
};

var showUserName = function () {
	if (stateMap.user.name === undefined) {
		$('#loginForm').append(configMap.loginHtmlInput);
		$('title').text('SvetoMAG, unknown user');
	} else {
		$('#loginForm').empty().append(configMap.loginHtmlShowUserName + stateMap.user.name);
		$('title').text('SvetoMAG, ' + stateMap.user.name);
	}
};

$(function () {
	$('#search').on('keyup', function (e) {
		if (e.keyCode === 13) {
			var parameters = {
				search: $(this).val()
			};
			show_products(parameters);

		}
	});
});