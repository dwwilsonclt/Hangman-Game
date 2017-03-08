var	gameChoices = [
	"James Comey",
	"lying to congress",
	"Hillary",
	"Benghazi",
	"Loretta Lynch",
	"Bubba",
	"secret meetings",
	"Podesta",
	"Anthony Weiner",
	"corruption",
	"Clinton Foundation",
	"Obama",
	"she is crooked",
	"press bias",
	"what difference does it make",
	"email server",
	"exposing classified information",
	"democratic party",
	"Bernie Sanders",
	"Elizabeth Warren",
	"DNC",
	"Harry Reid",
	"Nancy Pelosi",
	"CNN",
	"MSNBC",
	"basket of deplorables",
	"the Russians",
	"bleach bit",
	"wiping her server"]
var userLetters = [];		//letters picked by user building the phrase
var statusPhrase = "";
var gamesWon = 0;
var gameStatus = 0;			// 0 - game has not started; 1 - game in process; 2 - game completed
var choiceLetters = [];		// the computer picked phrase in an array - everything in upper case letters
var userLettersPicked = [];	//storage array for unique letters picked
var userPicksWrong = 0;
var lettersCorrect = 0;
var lettersInPhrase = 0;
var computerChoice = "";
document.onkeyup =  function(event) {
console.log("beginning event key code ========================")
console.log("=====Entering onkeyup event  - computerChoice is " + computerChoice);
	switch (gameStatus) {
		case 0:
			choiceLetters = [];
			userLettersPicked =[];
			userPicksWrong = 0;
			lettersCorrect = 0;
			lettersInPhrase = 0;
			userLetters = [];
			
			computerChoice = gameChoices[Math.floor(Math.random() * gameChoices.length)];
			console.log(computerChoice + computerChoice.length)
			for (var i = 0; i < computerChoice.length; i++) {
				choiceLetters.push(computerChoice.charAt(i).toUpperCase());
				userLetters[i] = null;	
				lettersInPhrase++;					//initiate user selection to null unless the letter was blank
				if (computerChoice.charAt(i) === " "){
					userLetters[i] = " ";			
					lettersInPhrase--;
				}

		}
			statusPhrase = "Pick a letter!"
			makeStatusHTML("playing");
			gameStatus = 1;	
        	break;
	    case 1:     
console.log(userLetters)
       		var userGuess = event.key.toUpperCase();
			var flagPrevPicked = false;

			for (var i = 0; i < userLettersPicked.length; i++) {
				if (userLettersPicked[i] === userGuess) {
					flagPrevPicked = true;
				}
			}
			if (userGuess === " "){
				flagPrevPicked = true;
			}
			if (!flagPrevPicked) {
				userLettersPicked.push (userGuess);

				//scan the choiceLetters array to see if there are matches; if so add to the userLetters array in the correct position
				var letterFound = false;


				for (var i = 0; i < choiceLetters.length; i++) {
					if (choiceLetters[i] === userGuess){
						userLetters[i] = userGuess;
						lettersCorrect++;

						letterFound = true;
					}
				}


				if (letterFound){
					statusPhrase = "You picked that letter correct!  Pick another letter";
				} else {
					userPicksWrong++;

					statusPhrase = "That letter was NOT correct!  Pick another letter";
				}

			if (lettersInPhrase === lettersCorrect){      //user won the game
				gameStatus = 0;
				gamesWon++;
				makeStatusHTML("winner");
			} else{
				if (userPicksWrong == 6){
					makeStatusHTML("loser");
					gameStatus = 0;
				} else{
						makeStatusHTML("playing");	
				}
				}
			}
			break;
	}	//switch brace
	   
	}



function makeStatusHTML(statusType) {


	var choicesLeft = 6 - userPicksWrong;
	var choiceString = ""
	for (var i = 0; i < userLetters.length; i++) {
		if (userLetters[i] === null) {
			choiceString = choiceString + "<u>   </u> ";}
			else{
				if (userLetters[i] === " ") {
					choiceString = choiceString +  "     ";
				} else {
					choiceString = choiceString + "<u>" + userLetters[i] + "</u> "
				}
			}
	}
	
	var imageName = "hmprogress" + userPicksWrong + '.jpg">';

	if (statusType === "playing") {

		var html = '<img src="assets/images/' + imageName +
		'<div class="panel panel-default">' +
		  '<div class="panel-heading">' +
		  '<h3 class="panel-title">You have guessed the following phrase so far</h3>' +
		  '</div>' +
		  '<div class="panel-body">' + '<h2>' + choiceString + '</h2' +
		  '</div>' +
		'</div>' +
		'<ul class="list-group">' +
	  '<li class="list-group-item">You still have ' + choicesLeft + ' incorrect choices you can make </li>' +
	  '<li class="list-group-item">You have picked ' + lettersCorrect + ' letters correct</li>' +
	  '<li class="list-group-item">You have won ' + gamesWon + ' games so far</li>' +
	  '<h4 class="list-group-item list-group-item-danger">You have picked these letters so far <b>' + userLettersPicked + '<b></h4>' +
	  '</ul>' +
	  '<h2 class="btn btn-primary btn-lg" role="button">' + statusPhrase + "</h2>"
		document.querySelector("#statusInfo").innerHTML = html;
	}
//==============
// class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>




//===============
	if (statusType === "winner"){
		
		var html = '<img src="assets/images/hmprogresswin.jpg">' +
		'<h2><font color="red">' + choiceString + "</font> </h2>" + 
		"<h3>You have won the game!</h3>" +
		"<p>You have won " + gamesWon + " games so far</p>" + 
		'<h3 class="btn btn-primary btn-lg" role="button">Press a key to continue</h3>'
		
		document.querySelector("#statusInfo").innerHTML = html;
	}	
	if (statusType === "loser"){
		html = '<img src="assets/images/' + imageName + 
		"<h2>" + choiceString + "</h2>" + 
		'<h3>You have lost the game! The correct answer was <b><font color="red">' + computerChoice + "</font></b></h3>" +
		"<p>You have won " + gamesWon + " games so far</p>" + 
		'<h3 class="btn btn-primary btn-lg" role="button">Press a key to continue</h3>'
		document.querySelector("#statusInfo").innerHTML = html;
		}
}
