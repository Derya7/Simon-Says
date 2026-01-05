$(document).ready(function () {
  let buttonArray = $(".btn");
  //let robotButtonId;
  let isGameStarted = false;
  let count = 0;
  let simonArray = [];
  let pressedButtons = [];
  //let isItCorrect;

  $(document).keydown(function () {
    if (!isGameStarted) {
      /*setTimeout(() => {
        simonSays();
      }, 500);*/
      simonSays();
      isGameStarted = true;
    }
  });

  function simonSays() {
    pressedButtons = [];
    count++;
    $("#level-title").text("level " + count);

    let randomNumber = Math.floor(Math.random() * 4);
    let robotPick = $(buttonArray[randomNumber]).attr("id");

    simonArray.push(robotPick);
    buttonActions(robotPick);
  }

  $(".btn").click(function () {
    let userPickId = $(this).attr("id");
    pressedButtons.push(userPickId);
    buttonActions(userPickId);
    checkAnswer(pressedButtons.length - 1);
  });

  function checkAnswer(currentLevel) {
    if (pressedButtons[currentLevel] === simonArray[currentLevel]) {
      if (pressedButtons.length === simonArray.length) {
        setTimeout(() => {
          simonSays();
        }, 1000);
      }
    } else {
      console.log("Wrong!");
      let wrongSound = new Audio("./sounds/wrong.mp3");
      wrongSound.play();
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  function buttonActions(id) {
    let sound = new Audio("./sounds/" + id + ".mp3");
    sound.play();
    $("#" + id).addClass("pressed");
    setTimeout(() => {
      $("#" + id).removeClass("pressed");
    }, 100);
  }

  function startOver() {
    count = 0;
    simonArray = [];
    isGameStarted = false;
  }
});
