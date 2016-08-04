'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.data = []; //Список картинок и свойств
        var fullPath = ""; //Полный путь к файлу без ID
        var startFilmWidth = 1000; //начальная длина для начального рендеринга
        self.filmWidth = startFilmWidth; //Длина пленки
        length = 0; //Количество кадров в пленке
        var start = 0; //Первый видимый кадр
        var end = 0; //последний видимый кадр
        var bigInd = 0; //Индекc больших картинок
        var showenFramesL = 0; //Длина видимых кадров
        var counter = 0; //Счетчик кадров
        var showWindowW = 645; //Ширина окна показа ленты
        var space = 5; //Расстояние между кадрами
        var cursor = 0; //Направление движения
        var delta = 0; //Текущая величина сдвига ленты
        self.shift = 0; //Общий сдвиг ленты
        self.bigMargineLeft = 0; //Отступ от левого края для больших картинок
        self.bigMargineTop = 0; //Отступ от левого края для больших картинок

        GetData.get({filename: $routeParams.pageId}, function(images) {
          self.data = images.data;
          length = self.data.length;
          end = length-1;
          fullPath = images.path + images.filename;

          //Добавляем ширины кадров к их обектам, вычисляем длину пленки и последний видимый кадр
          self.data.forEach(function(item, counter, arr) {
            var img = new Image();
            img.onload = function() {
              //Добавляем свойство ширина к каждому кадру
              self.data[counter].width = this.width;
              if (self.filmWidth - startFilmWidth <= showWindowW) {
                end = counter;
              }
              self.filmWidth += this.width + space;

              if (counter == length-1) {
                self.filmWidth -= startFilmWidth;
                if (end == 0) end = length-1;
              }
            }
            img.src = self.getSmallImg(counter);
            var imgBig = new Image();
            imgBig.onload = function() {
              self.data[counter].widthBig = this.width;
              self.data[counter].heightBig = this.height;
            }
            imgBig.src = self.getFullImgPath(counter, "big");
          });
        });

        var getbigMargine = function () {
          self.bigMargineLeft = (window.innerWidth-self.data[bigInd].widthBig) / 2;
          self.bigMargineTop = (window.innerHeight-self.data[bigInd].heightBig) / 2 - 15;
        }
        
        self.nextImage = function () {
          bigInd++;
          if (bigInd > length-1) bigInd = 0;
          getbigMargine();

          //Выйти если превышена правая граница пленки
          if ((end == length-1) && (cursor == 0)) return;

          if (showenFramesL == showWindowW) cursor = 1;
          if (cursor <= 0) {
            showenFramesL = 0;
            counter = start-1;
            cursor = 1;
            while ((showenFramesL < showWindowW) && (counter < length-1)) {
              counter++;
              showenFramesL += self.data[counter].width + space;
            }
            end = counter;
            delta = showenFramesL - showWindowW;
          } else {
            end++;
            if (end > length-1) {
              end = length-1;
              cursor = 0;
              return;
            }
            delta = self.data[end].width + space;
            showenFramesL += delta;

            start--;
            while ((showenFramesL >= showWindowW) && (start < length-1)) {
              start++;
              showenFramesL -= (self.data[start].width + space);
            }
            showenFramesL += self.data[start].width + space;
          }
          self.shift -= delta;
        };

        self.prevImage = function () {
          bigInd--;
          if (bigInd < 0) bigInd = length-1;
          getbigMargine();
          //Выйти если превышена левая граница пленки
          if ((start == 0) && (cursor == 0)) return;

          if (showenFramesL == showWindowW) cursor = -1;
          if (cursor >= 0) {
            showenFramesL = 0;
            counter = end+1;
            cursor = -1;
            while ((showenFramesL < showWindowW) && (counter > 0)) {
              counter--;
              showenFramesL += self.data[counter].width + space;
            }
            delta = showenFramesL - showWindowW;
          } else {
            start--;
            if (start < 0) {
              start = 0;
              cursor = 0;
              return;
            }
            delta = self.data[start].width + space;
            showenFramesL += delta;

            end++;
            while ((showenFramesL >= showWindowW) && (end > 0)) {
              end--;
              showenFramesL -= (self.data[end].width + space);
            }
            showenFramesL += self.data[end].width + space;
          }
          self.shift += delta;
        };

        self.getShowFlag = function (imgInd) {
          var showFlag = false;
          if ((imgInd >= start) && (imgInd <= end) && (start <= end))
            showFlag = true;
          return showFlag;
        }

        self.getFileId = function (imgId) {
          return self.data[imgId].fileId;
        }

        self.getFullImgPath = function (imgId, type) {
          if (!fullPath) return "";
          switch (type) {
            case "big" : type = "-big.jpg"; break;
            default : type = "-small.jpg"; break;
          }
          return fullPath + self.getFileId(imgId) + type;;
        }

        self.getSmallImg = function (imgId) {
          return self.getFullImgPath(imgId, 'small');
        }

        self.getBigImg = function () {
          return self.getFullImgPath(bigInd, 'big');
        }

        self.getTitle = function () {
          return self.data[bigInd].title;
        }

        self.closePopUp = function(){
          self.showPopUpImg = false;
        }

        self.showPopUpImg = false;

        self.openPopUp = function( imgId ) {
          bigInd = imgId;
          getbigMargine();
          self.showPopUpImg = true;
        }
      }
    ]
  });

angular.module('slideShow').
  directive('styleParent', function(){ 
   return {
     restrict: 'A',
     link: function(scope, elem, attr) {
         elem.on('load', function() {
            var w = $(this).width(),
                h = $(this).height();

            var div = elem.parent();
            console.log();
            //check width and height and apply styling to parent here.
         });
     }
   };
});