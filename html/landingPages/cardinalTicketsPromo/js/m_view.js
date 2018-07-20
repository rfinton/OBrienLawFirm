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
      var name = document.createElement('div');
      name.innerHTML = i._name;

      var span = document.createElement('span');
      span.setAttribute('class', 'glyphicon glyphicon-chevron-right');
      span.addEventListener('click', function(ev) {
        $('#contestants').velocity({ translateX: innerWidth * -1 + 'px' });
        $(ev.target.parentElement.children[1]).velocity({ translateX: innerWidth + 'px' });
        $(ev.target.parentElement.children[1]).velocity('fadeIn');
        window.scrollTo(0,0);
        selected = $(ev.target.parentElement.children[1]);
      });

      name.appendChild(span);

      var ul = document.createElement('ul');
      ul.id = snapshot.getKey();
      var company = document.createElement('li');
      var email = document.createElement('li');
      var phone = document.createElement('li');
      var date = document.createElement('li');
      var backBtn = document.createElement('li');
      backBtn.style.backgroundColor = 'darkred';
      backBtn.style.margin = '15px auto'
      backBtn.style.padding = '15px';
      backBtn.style.borderRadius = '6px';
      backBtn.style.color = 'white';

      company.innerHTML = 'Company: ' + i._company;
      email.innerHTML = 'Email: ' + i._email;
      mobile.innerHTML = 'Mobile: ' + i._phone;
      date.innerHTML = 'Date Registered: ' + (new Date(i.formSubmits[i.formSubmits.length - 1]._date)).toUTCString();

      var textNode = document.createElement('span');
      textNode.setAttribute('class', 'glyphicon glyphicon-chevron-left');
      backBtn.appendChild(textNode);
      backBtn.appendChild(document.createTextNode('Back'));
      textNode.parentElement.addEventListener('click', function(ev) {
        $(selected).velocity('fadeOut', 50);
        $(selected).velocity({ translateX: 0 });
        $('#contestants').velocity({ translateX: 0 });
      });

      ul.appendChild(company);
      ul.appendChild(email);
      ul.appendChild(mobile);
      ul.appendChild(date);
      ul.appendChild(backBtn);

      name.appendChild(ul);
      document.querySelector('#contestants').appendChild(name);
    });
  });
}());
