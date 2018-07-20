var app = angular.module("quizApp", []);

window.onload = function() {
  document.querySelector('.container-fluid').style.minHeight = innerHeight+"px";
  document.querySelector('.chalkboard').style.minHeight = $('.chalkboard').outerWidth() / 1.4 + "px";
};