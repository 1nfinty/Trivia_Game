$(document).ready(function(){
    // start the game when user clicks on Start button
    $("#start-button").on("click", gameState.startTimer);
  });
  // information about the state of game play
  var gameState = {
    // set the time at 60 seconds, and count down by 1 second
    timeRemaining : 60,
    // start the timer, hide the start page, show the questions
    startTimer: function() {
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      setInterval(gameState.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },
    // decrement the timer and update the UI; stop the timer at 0
    countdown: function() {
      gameState.timeRemaining--;
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      if (gameState.timeRemaining === 0) {
        gameState.stopTimer();
        $("#timer").empty();
      }
    },
    // stop the timer and check the answers
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
    // hide the quetions and display the end page with results
    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers: " + numCorrect);
      $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
      $("#unanswered").text("Skipped questions: " + numUnanswered);
    }
  }
  // functions to handle the building questions page and scoring
  var trivia = {
    // pull questions from the array of questions, loop through them, and append to UI
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Answer the following questions:</h2>');
              
      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      }
  
      // add a Done button to the end of the page and register its click handler
      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", gameState.stopTimer);
    },
    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
      // loop through to compare the text of the label with the user answers
      // increment score counts appropriately
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }
      // show the end page with the score tally
      gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  // array of objects with the questions, possible answers, and the correct answer
  var questionBank =
  [
    {
      question: "How did Captain America get his powers?",
      answers: ["Hits the gym everyday", "Bitten by Spider", "Super-Soldier serum"],
      correct: "Super-Soldier serum"
    },
  
    {
      question: "What is the Hulk's real name?",
      answers: ["Peter Parker", "Bruce Banner", "David Banner"],
      correct: "Bruce Banner"
    },
    {
      question: "Who is Iron Man's sidekick?",
      answers: ["Captain America", "Jarvis", "Spider-Man"],
      correct: "Jarvis"
    },
    {
      question: "Where is Thor from?",
      answers: ["Asgard", "New Mexico", "Earth-2"],
      correct: "Asgard"
    },
    {
      question: "What agency do Hawkeye and BlackWidow work for?",
      answers: ["Homeland Security", "S.H.I.E.L.D.", "CIA"],
      correct: "S.H.I.E.L.D."
    },
    {
      question: "What is Spider-Man's motto?",
      answers: ["With great power comes great responsibility", "The past cannot be changed. The future is still in your power. ", "With great power comes great electric bill"],
      correct: "With great power comes great responsibility"
    },
    {
      question: "What is Loki after in Avengers 1?",
      answers: ["Bifrost", "Tessaract", "Forever Cube"],
      correct: "Tessaract"
    },
    {
      question: "How is Thor's (adopted) brother?",
      answers: ["Odin", "Heimdall", "Loki"],
      correct: "Loki"
    },
    {
      question: "What is Star Lord's real name?",
      answers: ["Peter Quill", "Groot", "Chris Pratt"],
      correct: "Peter Quill"
    },
    {
      question: "Who is the Master of Mystical Arts?",
      answers: ["Vision", "Dr. Strange","Nebula"],
      correct: "Dr. Strange"
    }
  ]