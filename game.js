var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var numClicks = 0;

$(".btn").click(function() {
  numClicks++;
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer();
});

$(document).keypress(function(event) {
  if (!gameStarted) {
    gameStarted = true;
    level = 0;
    nextSequence();
    $("h1").text("Level " + level);
  }
});

function nextSequence() {
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  var buttonSelector = "#" + randomChosenColor;
  $(buttonSelector).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audioToPlay = "sounds/" + name + ".mp3";
  var audio = new Audio(audioToPlay);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");


  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function userPlayedCorrectPattern() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      return false;
    }
  }

  return true;
}

function checkAnswer() {
  if (numClicks === gamePattern.length) {
    if (userPlayedCorrectPattern()) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    } else {
      playSound("wrong");
      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over. Press any key to restart.");

      startOver();
    }

    userClickedPattern = [];
    numClicks = 0;
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = 0;
}
