var app = angular.module('app', ['firebase']);

app.controller('myCtrl', function($firebaseObject) {
  var d = firebase.database().ref('contestants');
  this.names = $firebaseObject(d);

  this.toggleInfo = function(ev) {
    var el = document.querySelector('#'+ev);
    var state = el.dataset.show;

    if(state == 'false') {
      $('#'+ev).velocity('slideDown');
      el.setAttribute('data-show', 'true');
    } else {
      $('#'+ev).velocity('slideUp');
      el.setAttribute('data-show', 'false');
    }
  };
});
