// initialeze game vaiables
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var animeTime = 150;
var currentPhase = 0;
var level = 0;
var gameStarted = false;

// start the game by pressing the
// start button ar any key from the keybord.
$(".start").click(startGame);
$(document).keydown(startGame);

// binding game buttons to game logic
$(".btn").click(function() {
  animatePress(this.id);
  if (gameStarted) {
    userClickedPattern.push(this.id);

    if (!checkAnswer(currentPhase)) {
      gameOver();
      return;
    }

    playSound(this.id);

    currentPhase++;
    // if player finished sequence, display the next color.
    if (currentPhase == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }

  }
});


/**
 * start the game, and hide the start button.
 */
function startGame() {
  if (!gameStarted) {
    $(".start").slideUp("fast");
    setTimeout(function() {
      gameStarted = true;
      nextSequence();
    }, animeTime);
  }
}

/**
 * get randomly the next color in the sequence,
 * and press the the chosen button
 */
function nextSequence() {
  userClickedPattern = [];
  currentPhase = 0;
  level++;
  $("h1").text("Level " + level);
  rand = getRandomInt(0, 3);
  randColour = buttonColours[rand];
  $("." + randColour).fadeOut(animeTime).fadeIn(animeTime);
  playSound(randColour);
  gamePattern.push(randColour);
}


/**
 * animating a button with a specified color
 * @param  {string} currentColour the color of the pressed button
 */
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, animeTime);
}


/**
 * handling game over display,
 * and restart the game.
 */
function gameOver() {

  playSound("wrong");

  // animating game over effect
  $("body").addClass("game-over");
  $(".start").slideDown();
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, animeTime * 2);

  // restart game variables
  gamePattern = [];
  userClickedPattern = [];
  currentPhase = 0;
  level = 0;
  gameStarted = false;

  // displaying game over message
  $("h1").text("Game Over, Press Any Key to Restart ");
}

/**
 * check if user pressed the corect sequence color.
 * @param  {Number} currentPhase The minimum number
 * @return {Boolean} true if answer corect false otherwise
 */
function checkAnswer(currentPhase) {
  return userClickedPattern[currentPhase] === gamePattern[currentPhase];
}

/**
 * play sound from a file
 * @param  {string} name The sound file name
 */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * get a random number from a min and max range
 * @param  {Number} min The minimum number
 * @param  {Number} max The maximum number
 * @return {Number}     The random number
 */
function getRandomInt(min = 0, max = 1) {
  return min + Math.floor(Math.random() * Math.floor(max - min + 1));
}
