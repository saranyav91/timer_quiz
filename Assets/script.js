var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
	var c=75;
	var t;
$(document).ready(function () 
{
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    
	
	timedCount();
	
	
	
	
    $(this).find(".btn").on("click", function () {
		if (!quizOver) {

			var val1 = this.id;
			var val = val1[val1.length - 1];
			val = val-1;
            if (val == undefined) 
			{
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } 
			else 
			{
				// TODO: Remove any message -> not sure if this is efficient to call this each time....
				
                $(document).find(".quizMessage").hide();
				if (val == questions[currentQuestion].correctAnswer) 
				{
					
					correctAnswers++;
					$(document).find(".quizMessage").text("Correct!");
					$(document).find(".quizMessage").show();
				}
				else {
					$(document).find(".quizMessage").text("Wrong!");
					$(document).find(".quizMessage").show();
					c = c - 15;
				}
				iSelectedAnswer[currentQuestion] = val;
				
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				if(currentQuestion >= 1) {
					  $('.preButton').prop("disabled", false);
				}
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 
				else 
				{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored: " + (correctAnswers*11) );
					c=80;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
					
				}
			}
					
		}	
		else 
		{ // quiz is over and clicked the next button (which now displays 'Play Again?'
			quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
			$(document).find(".nextButton").text("Next Question");
			$(document).find(".preButton").text("Previous Question");
			 $(".preButton").attr('disabled', 'disabled');
			resetQuiz();
			viewingAns = 1;
			displayCurrentQuestion();
			hideScore();
		}
    });
});
// clear highscore
document.querySelector("#button6").addEventListener("click", function () {
	document.querySelector(".scoreList").innerHTML = "";
	localStorage.clear();
});
//enter scores
var input1 = document.querySelector("#text1");
var newDiv = document.querySelector(".scoreList");
var submit = document.querySelector("#button_submit");

submit.addEventListener("click", function (event) {
	console.log("hi");

	$(document).find(".quizContainer > #button5").show();
	$(document).find(".quizContainer > #button6").show();
	$(document).find(".quizContainer > .scoreList").show();
	$(document).find("#text1").hide();
	$(document).find("#button_submit").hide();
	$(document).find(".result").html("Highscores!");
	$(document).find('#iTimeShow').hide();
	$(document).find('#timer').hide();
	$(document).find('a').hide();
	// Number 13 is the "Enter" key on the keyboard
	//if (event.keyCode === 13) {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click

		var user = {
			initials: input1.value,
			score: (correctAnswers*11)
		};
		
		
			
		console.log("hi obj created");
		if(localStorage != null){
			
			//var archive = {}, // Notice change here
        	//keys = Object.keys(localStorage),
			//i = keys.length;
			
			/*while ( i-- ) {
				var user1 = JSON.parse(localStorage.getItem("user"));
				if(user1.initials == event.target.value ){
					if(correctAnswers > user1.score){
						
						localStorage.setItem("user", JSON.stringify(user));
					}
				}
			}*/
			if(!localStorage.getItem("user")){
				localStorage.setItem("user", "[]");
			}
			var list = JSON.parse(localStorage.getItem("user"));
			var exist = false;
			for(var i = 0; i < list.length; i++)
				if(list[i] == user) {
					exist = true;
					break;
				}
			/*if(!exist) list.push(user);
			else{
				alert("EXIST");
			}*/
			console.log("hi dups checked");
			localStorage.setItem("user", JSON.stringify(user));


			//localStorage.setItem("user", JSON.stringify(user));
			keys = Object.keys(localStorage),
			i = keys.length;
			console.log("hi "+i);
			//checkDup();
			console.log("hi printing");
			while(i--){
				var user1 =  JSON.parse(localStorage.getItem("user"));
				var item = document.createElement("div");
				item.textContent = user1.initials + " "+user1.score;
				newDiv.append(item);
			}
		}
		else{
			console.log("empty");
			localStorage.setItem("user", JSON.stringify(user));
			var item = document.createElement("div");
			item.textContent = user.initials + " "+user.score;
			newDiv.append(item);
			console.log(user);
		}
		console.log(user);
	//}
});

function checkDup(){
	var allitems = JSON.parse(localStorage.getItem("user"));
    var repeated=allitems.filter(function(a){ return a.myitem==newitem}).length;
    if(!repeated){
        allitems.push({"user":newitem});
        localStorage.setItem('user', JSON.stringify(allitems));
    }
}

function timedCount()
	{
		if(c == 80) 
		{ 
			return false; 
		}
		
		/*var hours = parseInt( c / 3600 ) % 24;
		var minutes = parseInt( c / 60 ) % 60;
		var seconds = c % 60;
		var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
		$('#timer').html(result);*/
		$('#timer').html(c);
		
		if(c == 0 )
		{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored: " + (correctAnswers*11) );
					c=80;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
					
		}		
		c = c - 1;
		t = setTimeout(function()
		{
			timedCount()
		},1000);
	}
	
	
 
function displayCurrentQuestion() 
{

	if(c == 80) { c = 75; timedCount(); }
	hideScore();
	$(this).find(".quizMessage").hide();
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    
    var choice;
	
	
    for (i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];
		choice = "" + (i + 1) + " " + choice;
		var button = document.querySelector("#button" + (i + 1));

		if (iSelectedAnswer[currentQuestion] == i) {
			button.innerHTML = choice;
		} else {
			button.innerHTML = choice;
		}
	}
}

function resetQuiz()
{
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {

	$(".question").remove();
	$(".choiceList").remove();
	$(".quizMessage").remove();
	$(document).find(".quizContainer > .result").text("All done:  Your final score is " + (correctAnswers*11));
	$(document).find(".quizContainer > .result").show();
	$(document).find(".quizContainer > #text1").show();
	$(document).find(".quizContainer > #button_submit").show();
}

function hideScore() {

	$(document).find(".result").hide();
	$(document).find("#text1").hide();
	$(document).find("#button5").hide();
	$(document).find("#button6").hide();
	$(document).find("#button_submit").hide();
	$(document).find(".scoreList").hide();
}

 
