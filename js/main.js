var score = 0;
var postData = "r1=&r2=&r3=";

$("#ObrienVideo").click(function(ev) { ev.target.play(); });
$(".check").click(showAnswer);
$(".glyphicon-circle-arrow-right").click(advanceQuestion);

function showAnswer(ev) {
  var selected = false;
  var id = $(ev.target).attr("id")

  $("." + id + " input[type=radio]").each(function(index) {
    if(this.checked) {
      selected = true;
    }
    if(this.checked && this.value == "correct") {
      ++score;
    }
  });
  
  if(!selected) {
    alert("please select an answer.");
  }
  else {
    $("." + id + " .glyphicon").css("display", "inline");
    $(ev.target).css("display", "none");
  }
}

function advanceQuestion(ev) {
  var id = $(ev.target).attr("id");
  var question = $("." + id)[0];
  
  if(id == "btn4-next" || id == "btn5-next") {
    var selected = false;
    
    $("." + id + " input[type=radio]").each(function(index) {
      if(this.checked && $(this).attr("name") == "r4") {
        selected = true;
        postData += "&r4=" + this.value;
      }

      if(this.checked && $(this).attr("name") == "input3") {
        selected = true;
        postData += "&input3=" + this.value + "&quizscore=" + score + "%2F3";
        console.log(postData);
        $.post("", postData);

        if(this.value == "yes") {
          $("#response").html("We'll be in touch very soon.<br>Click <a href='http://obrienlawfirm.com'>here</a> to visit our main website.");  
        }
        else {
          $("#response").html("Click <a href='http://obrienlawfirm.com'>here</a> to visit our main website.");
        }
      }
    });
    
    if(!selected) {
      alert("please select an answer.");
      return;
    }
  }

  question.style.webkitTransform = "translateX(2420px)";
  question.style.transform = "translateX(2420px)";

  setTimeout(function() {
    question.style.display = "none";
    question.previousElementSibling.style.display = "block";
  }, 500);

  setTimeout(function() {
    question.previousElementSibling.style.opacity = 1;
  }, 600);
}