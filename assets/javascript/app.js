//start game on start button click
$(document).ready(function() {
    $("#startGame").on("click", function() {

        resetAll();
        loadQuestion(gameStats.currentQuestion);
        timer.start();
    });
    //check answers on click
    $(".answer0").on("click", function() {
        checkAnswer("a");
    });
    $(".answer1").on("click", function() {
        checkAnswer("b");
    });
    $(".answer2").on("click", function() {
        checkAnswer("c");
    });
    $(".answer3").on("click", function() {
        checkAnswer("d");
    });

});
//game object with some variables
var gameStats = {
        correctAnswers: 0,
        gameIsOver: false,
        incorrectAnswers: 0,
        currentQuestion: 0,
        winningGifs: ["correct.gif"]
    }
    //create an array of objects, each one holding the question and answers
var questionArray = [
    { q: "What is the winningest country in World Cup history with 5 titles?", a: "Italy", b: "Germany", c: "Brazil", d: "USA" },
    { q: "Which country won the first ever World Cup in 1930?", a: "Peru", b: "England", c: "Spain", d: "Uruguay" },
    { q: "What player has scored the most goals in World Cup competitions?", a: "Klose", b: "Messi", c: "Rolando", d: "Pele" },
    { q: "What is the furthest the USA has made it in World Cup competition?", a: "Quarter-Finals", b: "Semi-Finals", c: "Finals", d: "Round of 16" },
    { q: "Who coached the USA national team at the 2010 World Cup?", a: "Jurgen Klinnsman", b: "Landon Donovan", c: "Bruce Arena", d: "Bob Bradley" },
    { q: "How many goals were scored in the highest scoring game in World Cup play?", a: "9", b: "15", c: "11", d: "6" },
    { q: "What player was famously known for his 'Hand of God' goal in the 1986 World Cup?", a: "Maradona", b: "Pele", c: "Messi", d: "Ronaldinho" },
    { q: "Who has played in the most World Cup matches with 25 appearances?", a: "Rolando", b: "Diego Maradona", c: "Miroslav Klose", d: "Lothar Matthäus" },
    { q: "What country made their first ever World Cup appearance in 2014?", a: "Angola", b: "Ghana", c: " Bosnia and Herzegovina", d: "Tunisia" },
    { q: "What American has scored the most World Cup goals for the USA?", a: "Landon Donovan", b: "Client Dempsey", c: "Sean Bevard", d: "Eric Wynalda" }
];

//array for correct answers
var answerArray = ["c", "d", "a", "b", "d", "c", "a", "d", "c", "a"]

//function to load question/answers in dom
function loadQuestion(a) {
	//disable buttons when game runs
    $("#startGame").html("Restart Game");
    $('#startGame').prop('disabled', true);
    if (a < questionArray.length) {
    	$("#timer").html('Time Left: ' + timer.time + '</div>');
        $(".question").html(questionArray[a].q);
        $(".answer0").html('<button type="button"  class="centered btn btn-primary">' + questionArray[a].a + '</button>');
        $(".answer1").html('<button type="button"  class="centered btn btn-primary">' + questionArray[a].b + '</button>');
        $(".answer2").html('<button type="button"  class="centered btn btn-primary">' + questionArray[a].c + '</button>');
        $(".answer3").html('<button type="button"  class="centered btn btn-primary">' + questionArray[a].d + '</button>');
    } else {
        gameStats.gameIsOver = true;
        gameOver();
    }
}

//on click event for each answer:





//check answer
function checkAnswer(a) {
    console.log(gameStats.gameIsOver);
    if (!gameStats.gameIsOver) {
        if (a === answerArray[gameStats.currentQuestion]) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }

}

//need a timer to load next question if nothing is pressed
var timer = {

    time: 10,

    reset: function() {

        timer.time = 10;
    },
    start: function() {

        // DONE: Use setInterval to start the count here.
        intervalId = setInterval(timer.count, 1000);
    },
    stop: function() {

        // DONE: Use clearInterval to stop the count here.
        clearInterval(intervalId);
    },
    count: function() {

            // DONE: increment time by 1, remember we cant use "this" here.
            timer.time--;
            $("#timer").html('Time Left: ' + timer.time + '</div>');
            if (timer.time === 0) {
                incorrectAnswer();
            }

        }
        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.


    // DONE: Use the variable we just created to show the converted time in the "display" div.

};

//functions for correct and incorrect answers

function correctAnswer() {
    timer.reset();
    //alert("Correct!");
    //increment count and go to next question
    gameStats.correctAnswers++;
    gameStats.currentQuestion++;
    loadQuestion(gameStats.currentQuestion);
    clearDivs();
    $("#gif").html("<img src='./assets/images/"+gameStats.winningGifs[0]+"'></img>")
}

function incorrectAnswer() {
    timer.reset();
    //alert("Wrong answer!");
    //increment count and go to next question
    gameStats.incorrectAnswers++;
    gameStats.currentQuestion++;

    loadQuestion(gameStats.currentQuestion);
}

//function when game is over
function clearDivs(){
	    $(".question").empty();
    $(".answer0").empty();
    $(".answer1").empty();
    $(".answer2").empty();
    $(".answer3").empty();
}
function gameOver() {
    gameStats.gameIsOver = true;
    clearDivs();
    $('#startGame').prop('disabled', false);
    $('#timer').empty();
    timer.stop();
    timer.reset();
    $("#correctAnswers").html("CORRECT ANSWERS " + gameStats.correctAnswers);
    $("#incorrectAnswers").html("INCORRECT ANSWERS " + gameStats.incorrectAnswers);
}

function resetAll() {
    gameStats.gameIsOver = false;
    $("#correctAnswers").empty();
    $("#incorrectAnswers").empty();
    gameStats.currentQuestion = 0;
    gameStats.incorrectAnswers = 0;
    gameStats.correctAnswers = 0;
    timer.reset();
}
