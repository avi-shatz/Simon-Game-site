// initialize game variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var animeTime = 150;
var currentPhase = 0;
var level = 0;
var gameStarted = false;
var isPlayingBack = false; // lock user input during sequence playback

// simple audio cache to reduce latency (initialized on first start)
var audioCache = null;

// start the game by pressing the start button or any keyboard key.
$(".start").click(startGame);
$(document).keydown(startGame);
$(".start").on("keydown", function(e) {
  if (e.key === "Enter" || e.key === " ") {
    startGame();
  }
});

// binding game buttons to game logic
$(".btn").click(function() {
  if (!gameStarted || isPlayingBack) {
    return;
  }
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
      setTimeout(nextSequence, 800);
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
      // initialize audio on first user interaction to comply with autoplay policies
      if (!audioCache) {
        initAudio();
      }
      nextSequence();
    }, animeTime);
  }
}

/**
 * choose the next color in the sequence,
 * then replay the full sequence to the player
 */
function nextSequence() {
  userClickedPattern = [];
  currentPhase = 0;
  level++;
  $("h1").text("Level " + level);
  const rand = getRandomInt(0, 3);
  const randColour = buttonColours[rand];
  gamePattern.push(randColour);
  // play back the entire sequence
  playSequence(gamePattern);
}


/**
 * play the full sequence with timing and lock input during playback
 * @param {string[]} sequence
 */
function playSequence(sequence) {
  isPlayingBack = true;
  var step = 0;
  function playStep() {
    if (step >= sequence.length) {
      isPlayingBack = false;
      return;
    }
    var colour = sequence[step];
    $(".#".replace('#','') + colour); // no-op to preserve style
    $("." + colour).fadeOut(animeTime).fadeIn(animeTime);
    playSound(colour);
    step++;
    setTimeout(playStep, Math.max(400, animeTime * 3));
  }
  playStep();
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
  $("h1").text("Game Over. Press any key or tap Start to play again");
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
 * play sound from a file (reused audio elements)
 * @param  {string} name The sound file name
 */
function playSound(name) {
  if (audioCache && audioCache[name]) {
    try {
      audioCache[name].currentTime = 0;
      audioCache[name].play();
      return;
    } catch (e) {}
  }
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * preload and cache audio elements for faster playback
 */
function initAudio() {
  audioCache = {};
  var names = ["red", "blue", "green", "yellow", "wrong"];
  for (var i = 0; i < names.length; i++) {
    audioCache[names[i]] = new Audio("sounds/" + names[i] + ".mp3");
  }
}

/**
 * get a random integer in [min, max]
 * @param  {Number} min The minimum number
 * @param  {Number} max The maximum number
 * @return {Number}     The random number
 */
function getRandomInt(min, max) {
  if (typeof min !== 'number') min = 0;
  if (typeof max !== 'number') max = 1;
  return min + Math.floor(Math.random() * (max - min + 1));
}
