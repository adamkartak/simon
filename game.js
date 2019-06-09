var gamePattern = [];
var playerPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var turn = 0;
var level = 0;
var highScore = 0;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random()*4);
  $("." + buttonColours[randomNumber]).fadeOut(100).fadeIn(100);
  var sound = new Audio("sounds\\" + buttonColours[randomNumber] + ".mp3");
  sound.play();
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  return randomNumber;
}

$(".btn").click(function(e) {
  var userChosenColor = e.target.id;
  playerPattern.push(userChosenColor);
  var pressSound = new Audio("sounds\\" + userChosenColor + ".mp3");
  pressSound.play();
  $("#" + userChosenColor).addClass("pressed");
  setTimeout(function () {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
  if (playerPattern.length === gamePattern.length) {
    if (playerPattern[turn-1] === gamePattern[turn-1]) {

      setTimeout(nextSequence, 1000);
      playerPattern = [];
      turn = 1;
    } else {
      var lostSound = new Audio("sounds\\wrong.mp3");
      lostSound.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 300);
      playerPattern = [];
      gamePattern = [];
      if (level > highScore) {
        highScore += level - highScore;
      }
      if (highScore > 0) {
        $(".highScore").text("HighScore: " + highScore);
      }
      turn = 0;
      level = 0;
      $("h1").text("YOU LOSE... Press any key to try again.");
    }
  }
  else if (playerPattern[turn-1] === gamePattern[turn-1]) {
    turn++;
  } else {
    var lostSound2 = new Audio("sounds\\wrong.mp3");
    lostSound2.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    playerPattern = [];
    gamePattern = [];
    if (level > highScore) {
      highScore += level - highScore;
    }
    if (highScore > 0) {
      $(".highScore").text("HighScore: " + highScore);
    }
    turn = 0;
    level = 0;
    $("h1").text("YOU LOSE... Press any key to try again.");
    }

});

$(document).keypress(function() {
    if (turn < 1) {
    nextSequence();
    turn++;
  }
});




//   console.log(gamePattern);
//   for (i=0; i<gamePattern.length; i++) {
//     $(".btn").click(function(event) {
//       playerPattern.push(event.target.id);
//     });
//     if (playerPattern[i] === gamePattern[i]) {
//       continue;
//     } else {
//       alert('you lose');
//     }
//   }
//
//
//
// });
