var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []
var level = 0;
var started = false;
var count = 0;

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  count += 1;
  if (!started) {
    gameOver();
  } else {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (count == gamePattern.length) {
      checkAnswer(level);
    } else {
      if (userClickedPattern[count - 1] != gamePattern[count - 1]) {
        gameOver();
      }
    }
  }
});

function checkAnswer(level) {
  if (userClickedPattern[level] != gamePattern[level]) {
    gameOver();
  } else {
    for (i = 0; i < gamePattern.length; i++) {
      if (userClickedPattern[i] != gamePattern[i]) {
        gameOver();
      }
    }
    setTimeout(nextSequence, 1000);
  }
}

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("h1").text("Game Over, Press any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  count = 0;
  started = false;
}

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  $("h1").text("level " + level);
  level += 1;
  userClickedPattern = [];
  count = 0;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).fadeOut()
  setTimeout(function() {
    $("#" + color).fadeIn()
  }, 50);
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}
