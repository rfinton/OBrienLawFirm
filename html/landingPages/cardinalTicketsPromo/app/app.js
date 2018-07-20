try {
  var db = firebase.database().ref();

  $(document).ready(function() {
    $.get('http://52.91.158.44/getipaddr.php', function(ip) {
      db.child('contestants/' + formData.purl).once('value', function(snap) {
        logProfile(ip, snap);
        logVisit(snap);
      });
    });
  });
  
  $('a').click(function(ev) {
    db.child('contestants/' + formData.purl).once('value', function(snap) {
      if(!snap.val().linksClicked) {
        var data = [ev.currentTarget.href + ' (' + (new Date()).toUTCString() + ')'];
        var tmp = {};
        tmp['contestants/'+formData.purl+'/linksClicked'] = data;
        db.update(tmp);
      } else {
        var data = snap.val().linksClicked;
        var tmp = {};
        tmp['contestants/'+formData.purl+'/linksClicked'] = data;
        data.push(ev.currentTarget.href + ' (' + (new Date()).toUTCString() + ')');
        db.update(tmp);
      }
    });
  });
  
  $('input[type=submit]').click(function(ev) {
    ev.preventDefault();
    $(ev.currentTarget).addClass('disabled');
    var d = document.forms[0];
  
    for(var x = 0; x < d.length - 1; ++x) {
      if (d[x].value == '') {
        alert("You forgot to enter your " + d[x].previousElementSibling.innerHTML);
        $(ev.currentTarget).removeClass('disabled');
        return;
      }
    }
  
    var form = {
      _date: (new Date()).toUTCString()
    };
  
    for(var x = 0; x < d.length - 1; ++x) {
      form[d[x].name] = d[x].value;
    }
  
    logFormData(form, function() {
      d.submit();
    });
  });
  
  function logProfile(ip, snap) {
    if(!snap.val()) {
      var u = {
        _name: formData.name,
        _email: formData.email,
        _company: formData.company,
        _address: formData.address,
        _phone: formData.phone,
        _group: formData.group,
        cid: [{
          date: (new Date()).toUTCString(),
          browser: navigator.userAgent,
          ip: ip
        }]
      };
  
      db.child('contestants/' + formData.purl).set(u);
    } else {
      var cid = snap.val().cid;
      var sid = {
        date: (new Date()).toUTCString(),
        browser: navigator.userAgent,
        ip: ip
      };
  
      for(var i = 0; i < cid.length; ++i) {
        if(cid[i].browser == sid.browser && cid[i].ip == sid.ip) {
          cid[i].date = (new Date()).toUTCString();
          var tmp = {};
          tmp['contestants/' + formData.purl + '/cid/' + i] = cid[i];
          db.update(tmp);
          return;
        }
      }
  
      cid.push(sid);
      var t = {};
      t['contestants/' + formData.purl + '/cid'] = cid;
      db.update(t);
    }
  }
  
  function logVisit(snap) {
    if(!snap.val()) {
      var data = [location.hostname + location.pathname + ' (' + new Date() + ')'];
      var t = {};
      t['contestants/' + formData.purl + '/pagesVisited'] = data;
      db.update(t);
    } else {
      var data = snap.val().pagesVisited;
      var t = {};
      t['contestants/' + formData.purl + '/pagesVisited'] = data;
      data.push(location.hostname + location.pathname + ' (' + new Date() + ')');
      db.update(t);
    }
  }
  
  function logFormData(form, submit) {
    db.child('contestants/' + formData.purl).once('value', function(snap) {
      if(!snap.val().formSubmits) {
        var data = [form];
        var t = {};
        t['contestants/'+formData.purl+'/formSubmits'] = data;
        t['contestants/'+formData.purl+'/_address'] = form.address1+' '+form.city+', '+form.state+' '+form.zip;
        t['contestants/'+formData.purl+'/_name'] = form.firstname+' '+form.lastname;
        t['contestants/'+formData.purl+'/_phone'] = form.phone;
        t['contestants/'+formData.purl+'/_email'] = form.email;
        t['contestants/'+formData.purl+'/_company'] = form.company;
        db.update(t).then(submit);
      } else {
        var data = snap.val().formSubmits;
        data.push(form);
        var t = {};
        t['contestants/'+formData.purl+'/formSubmits'] = data;
        t['contestants/'+formData.purl+'/_address'] = form.address1+' '+form.city+', '+form.state+' '+form.zip;
        t['contestants/'+formData.purl+'/_name'] = form.firstname+' '+form.lastname;
        t['contestants/'+formData.purl+'/_phone'] = form.phone;
        t['contestants/'+formData.purl+'/_email'] = form.email;
        t['contestants/'+formData.purl+'/_company'] = form.company;
        db.update(t).then(submit);
      }
    });
  }
} catch (e) {
  console.log(e);
  
  if(isIE10) {
    alert('This browser is outdated.');
  }
}
