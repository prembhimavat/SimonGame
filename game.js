
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var locked = false;

$(".btn").click(function() {
    if (!locked) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        
        playSound(userChosenColour);
        animatePress(userChosenColour); 
        
        checkAnswer(userClickedPattern.length-1); 
    }

});



var level = 0;
var started = false;
$(document).keydown(function(){
    if(!started){
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
    
}); 

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){
            locked = true;
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        
        $("#level-title").css("font-size","2.169rem");
        $("#level-title").html("Game Over! Press any key to restart");

        startOver();
    }

}

function nextSequence() {
    
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    locked = false;  

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
