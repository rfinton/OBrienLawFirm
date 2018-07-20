(function() {
  var config = {
    apiKey: "AIzaSyCv12K3gl2MzaDtU-XwpkOgjsxGc5jAU7g",
    authDomain: "obrien-e10be.firebaseapp.com",
    databaseURL: "https://obrien-e10be.firebaseio.com",
    projectId: "obrien-e10be",
    storageBucket: "obrien-e10be.appspot.com",
    messagingSenderId: "47338396760"
  };

  firebase.initializeApp(config);
  var database = firebase.database().ref('contestants');

  database.on('value', function(snapshot) {
    $('#contestants').html('');
    var registered = [];

    for(var b in snapshot.val()) {
      if(snapshot.val()[b].formSubmits !== undefined) {
        registered.push(snapshot.val()[b]);
      }
    }

    if(registered.length > 1) {
      var sorted = registered.sort(function(a, b) {
        var x = a.formSubmits.length - 1;
        var y = b.formSubmits.length - 1;
        return Date.parse(a.formSubmits[x]._date) - Date.parse(b.formSubmits[y]._date);
      });
    } else {
      var sorted = registered;
    }

    document.querySelector('#count').innerHTML = "Registrants: " + sorted.length;

    sorted.forEach(function(i) {
      var name = document.createElement('td');
      var company = document.createElement('td');
      var email = document.createElement('td');
      var mobile = document.createElement('td');
      var group = document.createElement('td');
      var date = document.createElement('td');

      name.innerHTML = i._name;
      company.innerHTML = i._company;
      email.innerHTML = i._email;
      mobile.innerHTML = i._phone;
      group.innerHTML = i._group;
      date.innerHTML = (new Date(i.formSubmits[i.formSubmits.length - 1]._date)).toUTCString();

      var tr = document.createElement('tr');
      tr.id = snapshot.getKey();
      tr.appendChild(name);
      tr.appendChild(company);
      tr.appendChild(email);
      tr.appendChild(mobile);
      tr.appendChild(group);
      tr.appendChild(date);

      document.querySelector('#contestants').appendChild(tr);
    });
  });
}());
