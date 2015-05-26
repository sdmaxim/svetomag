/*
 * spa.shell.js
 * Shell module for SPA
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, spa */
spa.shell = (function() {
    var
        configMap = {
            main_html: String() +
                '<div class="header" id="header"></div>' +
                '<div class="left" id="left"></div>' +
                '<div class="main" id="main">' +
                '<ul id="messages"></ul>' +
                '</div>' +
                '<div class="footer" id="footer">' +
                '<form action="">' +
                '<input id="m" autocomplete="off" />' +
                '<button>Send</button>' +
                '</form>' +
                '</div>' +

                '<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>' +
                '<script src="http://code.jquery.com/jquery-1.11.1.js"></script>' +
                '<script>' +
                'var socket = io();' +
                '$("form").submit(function() {' +
                'socket.emit("chat message", $("#m").val());' +
                '$("#m").val("");' +
                'return false;' +
                '});' +
                'socket.on("chat message", function(msg) {' +
                '$("#messages").append($("< li >").text(msg));' +
                '});' +
                '</script>',
            button_html: String() +
                '<form name="inputsize" class="form">' +
                '<input type="text" name="width" size="3" value="4" />' +
                ' - Ширина <br>' +
                '<input type="text" name="height" size="3" value="4" />' +
                ' - Высота <br>' +
                '<div id="submit" class="button">Задать</div>' +
                '<div id="submit" class="button">Запомнить</div>' +
                '</form>' + '<div id="pole"></div>',
        },
        stateMap = {
            $container: null,
        },
        topCells = 2,
        leftCells = 2,
        initPole,
        initModule;

    getClassCell = function(x, y) {
        var className = "";
        if (x < leftCells && y < topCells) {
            className = "cell-invisible";
        }
        else if ((x >= leftCells && y < topCells) || (x < leftCells &&
                y >= topCells)) {
            className = "cell-init";
        }
        else if (x >= leftCells && y >= topCells) {
            className = "cell-main";
        }
        return className;
    }

    initPole = function(event) {
        var pole_html = "";
        var formTeg = "form";
        var poleId = "#pole";
        var formWidth = parseInt($(formTeg).find(
            'input[name=width]').val(), 10);
        var formHeight = parseInt($(formTeg).find(
            'input[name=height]').val(), 10);
        var className, cellContent = "";
        var $container = stateMap.$container;

        for (var y = 0; y < (topCells + formHeight); y++) {
            pole_html += '<div class="line">';
            for (var x = 0; x < (leftCells + formWidth); x++) {
                className = getClassCell(x, y);
                if (className == "cell-init") {
                    cellContent =
                        '<input class="cell-input" type="text" name="init-"' +
                        x + '-' + y + ' size="1" value="0" />';
                }
                else {
                    cellContent = '';
                }
                pole_html += '<div id="' + x + '-' + y +
                    '" class="' + className + '">' + cellContent +
                    '</div>';
            }
            pole_html += "</div>";
        }

        $(poleId).animate({
            left: -(leftCells + formWidth) * (25 + 4) +
                "px"
        }, 500, function() {
            $(poleId).html(pole_html)
        });

        $(poleId).animate({
            left: "0px"
        }, 500);

        return false;
    };

    initModule = function($container) {

        stateMap.$container = $container;
        $container.html(configMap.main_html);

        app.get('/', function(req, res) {
            res.sendfile('index.html');
        });


        $inputbars = $container.find("#submit");
        $inputbars.bind("click", initPole);

        return false;
    };

    return {
        initModule: initModule
    };

}());
