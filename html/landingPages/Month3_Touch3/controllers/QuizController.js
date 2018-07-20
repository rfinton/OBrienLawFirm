app.controller('QuizController', ['$scope', function($scope) {
  
  $scope.currentQuestion = 1;
  $scope.correctAnswers = 0;
  
  $scope.quiz = {
    question1: {
      question: 'OSHA standards requires employers of all workers whose work exposes them to asbestos above the permissible exposure limit (PEL) or excursion limit to:',
      choices: {
        A: 'Provide training in the engineering controls, work practices, and proper use of personal protective equipment (PPE)',
        B: 'Train workers in safety before beginning work and annually',
        C: 'Train workers regarding the health effects of asbestos exposure',
        D: 'Inform workers of the relationship between smoking, asbestos exposure, and increased risk of lung cancer',
        E: 'All the above'
      },
      answer: 'E'
    },
    
    question2: {
      question: 'Many older buildings may contain asbestos in which of the following?',
      choices: {
        A: 'Pipes',
        B: 'Floor and ceiling tiles',
        C: 'Window caulk',
        D: 'All the above'
      },
      answer: 'D'
    },
    
    question3: {
      question: 'Friable asbestos material releases fibers when it is sanded, crushed, drilled, or cut.',
      choices: {
        A: 'True',
        B: 'False'
      },
      answer: 'A'
    },
    
    question4: {
      question: 'All products and waste containers must have a hazard label if they contain more than what percent of asbestos content?',
      choices: {
        A: '0.1%',
        B: '0.5%',
        C: '1%',
        D: '10%'
      },
      answer: 'C'
    }
  };
  
  // Displays current question number
  $scope.showQuestionNumber = function() {
    return this.currentQuestion;
  };
  
  // Display the current question
  $scope.showQuestion = function() {
    switch(this.currentQuestion) {
      case 1:
        return this.quiz.question1.question;
      case 2:
        return this.quiz.question2.question;
      case 3:
        return this.quiz.question3.question;
      case 4:
        return this.quiz.question4.question;
    }
  };
  
  // Displays Choice A in respect to the question
  $scope.showChoiceA = function() {
    switch(this.currentQuestion) {
      case 1:
        return this.quiz.question1.choices.A;
      case 2:
        return this.quiz.question2.choices.A;
      case 3:
        return this.quiz.question3.choices.A;
      case 4:
        return this.quiz.question4.choices.A;
    }
  };
  
  // Displays Choice B in respect to the question
  $scope.showChoiceB = function() {
    switch(this.currentQuestion) {
      case 1:
        return this.quiz.question1.choices.B;
      case 2:
        return this.quiz.question2.choices.B;
      case 3:
        return this.quiz.question3.choices.B;
      case 4:
        return this.quiz.question4.choices.B;
    }
  };
  
  // Displays Choice C in respect to the question
  $scope.showChoiceC = function() {
    document.querySelector('#C').style.display = 'inline';
    document.querySelector('.C').style.display = 'inline';
    
    switch(this.currentQuestion) {
      case 1:
        return this.quiz.question1.choices.C;
      case 2:
        return this.quiz.question2.choices.C;
      case 3:
        document.querySelector('#C').style.display = 'none';
        document.querySelector('.C').style.display = 'none';
        break;
      case 4:
        return this.quiz.question4.choices.C;
    }
  };
  
  // Displays Choice D in respect to the question
  $scope.showChoiceD = function() {
    document.querySelector('#D').style.display = 'inline';
    document.querySelector('.D').style.display = 'inline';
    
    switch(this.currentQuestion) {
      case 1:
        return this.quiz.question1.choices.D;
      case 2:
        return this.quiz.question2.choices.D;
      case 3:
        document.querySelector('#D').style.display = 'none';
        document.querySelector('.D').style.display = 'none';
        break;
      case 4:
        return this.quiz.question4.choices.D;
    }
  };
  
  // Displays Choice E in respect to the question
  $scope.showChoiceE = function() {
    document.querySelector('#E').style.display = 'inline';
    document.querySelector('.E').style.display = 'inline';
    
    switch(this.currentQuestion) {
      case 1:
        return this.quiz.question1.choices.E;
      default:
        document.querySelector('#E').style.display = 'none';
        document.querySelector('.E').style.display = 'none';
    }
  };
  
  // Method to check if question was answered correctly
  $scope.checkAnswer = function() {
    var selected = document.querySelector('input[name=question]:checked').value;
    
    switch(this.currentQuestion) {
      case 1:
        var correctAnswer = document.querySelector('.' + this.quiz.question1.answer);
        correctAnswer.style.color = 'green';
        correctAnswer.style.fontWeight = 'bold';
        correctAnswer.style.backgroundColor = 'gold';
        
        if(selected == this.quiz.question1.answer) {
          document.querySelector('.correct').style.display = 'inline';
          ++this.correctAnswers;
        } else {
          document.querySelector('.incorrect').style.display = 'inline';
        }
        
        break;
      case 2:
        var correctAnswer = document.querySelector('.' + this.quiz.question2.answer);
        correctAnswer.style.color = 'green';
        correctAnswer.style.fontWeight = 'bold';
        correctAnswer.style.backgroundColor = 'gold';
        
        if(selected == this.quiz.question2.answer) {
          document.querySelector('.correct').style.display = 'inline';
          ++this.correctAnswers;
        } else {
          document.querySelector('.incorrect').style.display = 'inline';
        }
        
        break;
      case 3:
        var correctAnswer = document.querySelector('.' + this.quiz.question3.answer);
        correctAnswer.style.color = 'green';
        correctAnswer.style.fontWeight = 'bold';
        correctAnswer.style.backgroundColor = 'gold';
        
        if(selected == this.quiz.question3.answer) {
          document.querySelector('.correct').style.display = 'inline';
          ++this.correctAnswers;
        } else {
          document.querySelector('.incorrect').style.display = 'inline';
        }
        
        break;
      case 4:
        var correctAnswer = document.querySelector('.' + this.quiz.question4.answer);
        correctAnswer.style.color = 'green';
        correctAnswer.style.fontWeight = 'bold';
        correctAnswer.style.backgroundColor = 'gold';
        
        if(selected == this.quiz.question4.answer) {
          document.querySelector('.correct').style.display = 'inline';
          ++this.correctAnswers;
        } else {
          document.querySelector('.incorrect').style.display = 'inline';
        }
        
        break;
    }
    
    document.querySelector('#answer-btn').style.display = 'none';
    document.querySelector('#next-btn').style.display = 'inline-block';
  };
  
  // Method to display the next question
  $scope.showNextQuestion = function() {
    if(this.currentQuestion < 4) {
      this.currentQuestion += 1;
      document.querySelector('#next-btn').style.display = 'none';
      document.querySelector('#answer-btn').style.display = 'inline-block';
      $('.choice label').css({
        'fontWeight': 'normal',
        'backgroundColor': 'white'
      });
      document.querySelector('.correct').style.display = 'none';
      document.querySelector('.incorrect').style.display = 'none';
      $('label').css('color', 'black');
      $('input[type=radio]').attr('checked', false);  
    } else {
      $('.question-container, .choices, .responder, #quiz-modl .modal-title, #next-btn').css('display', 'none');
      $('.quiz-end, #exit-modal, #more-info').css('display', 'inline-block');
    }
  };
  
  // Exit modal button
  $scope.exitModal = function() {
    $('#quiz-modal').modal('hide');
    $('.chalkboard p').hide();
    $('.quiz-button a').html('Show Quiz');
  };
}]);