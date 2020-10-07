/**
 * get a random number from a min and max range
 * @param  {Number} min The minimum number
 * @param  {Number} max The maximum number
 * @return {Number}     The random number
 */
function getRandomInt(min = 0, max = 1) {
  return min + Math.floor(Math.random() * Math.floor(max - min + 1));
}

// initialeze game vaiables
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var animeTime = 150;
var currentfase = 0;
var level = 0;
var gameStarted = false;


function nextSequence() {
  userClickedPattern = [];
  currentfase = 0;
  level++;
  $("h1").text("Level " + level);
  rand = getRandomInt(0, 3);
  randColour = buttonColours[rand];
  $("." + randColour).fadeOut(animeTime).fadeIn(animeTime);
  new Audio("sounds/" + randColour + ".mp3").play();
  gamePattern.push(randColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, animeTime);
}


function checkAnswer(currentLevel) {
  return userClickedPattern[currentLevel] === gamePattern[currentLevel];
}

function startGame() {
  if (!gameStarted) {
    $(".start").slideUp("fast");
    setTimeout(function() {
      gameStarted = true;
      nextSequence();
    }, animeTime);
  }
}

function gameOver() {
  new Audio("sounds/wrong.mp3").play();

  $("body").addClass("game-over");
  $(".start").slideDown();
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, animeTime * 2);

  gamePattern = [];
  userClickedPattern = [];
  currentfase = 0;
  level = 0;
  gameStarted = false;

  $("h1").text("Game Over, Press Any Key to Restart ");
}

$(".btn").click(function() {
  animatePress(this.id);
  if (gameStarted) {
    userClickedPattern.push(this.id);

    if (!checkAnswer(currentfase)) {
      gameOver();
      return;
    }
    new Audio("sounds/" + this.id + ".mp3").play();

    currentfase++;
    if (currentfase == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }

  }
});

$(".start").click(startGame);
$(document).keydown(startGame);
