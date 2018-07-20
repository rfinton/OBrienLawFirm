var script = document.createElement('script');
script.src = 'https://www.gstatic.com/firebasejs/4.1.3/firebase.js';

var head = document.querySelector('head');
head.appendChild(script);

var config = {
  apiKey: "AIzaSyCv12K3gl2MzaDtU-XwpkOgjsxGc5jAU7g",
  authDomain: "obrien-e10be.firebaseapp.com",
  databaseURL: "https://obrien-e10be.firebaseio.com",
  projectId: "obrien-e10be",
  storageBucket: "obrien-e10be.appspot.com",
  messagingSenderId: "47338396760"
};

firebase.initializeApp(config);

var db = firebase.database().ref('visitors');

function readCookie() {
  var cookies = document.cookie.split(';');

  for(var i = 0; i < cookies.length; i++) {
    if(/purl/.test(cookies[i])) {
      return cookies[i].substring(cookies[i].search('=') + 1);
    };
  }

  return null;
}

var purl = readCookie();

if(purl) {
  db.child(purl).set({

  });
}
