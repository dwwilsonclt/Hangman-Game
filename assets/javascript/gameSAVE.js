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
document.onkeyup =  function(event) {
console.log("beginning event key code ========================")

	switch (gameStatus) {
		case 0:
			choiceLetters = [];
			userLettersPicked =[];
			userPicksWrong = 0;
			lettersCorrect = 0;
			lettersInPhrase = 0;
			userLetters = [];
			var computerChoice = gameChoices[Math.floor(Math.random() * gameChoices.length)];
			// computerChoice = gameChoices[23];
			console.log(computerChoice + computerChoice.length)
			for (var i = 0; i < computerChoice.length; i++) {
				choiceLetters.push(computerChoice.charAt(i).toUpperCase());
				userLetters[i] = null;	
				lettersInPhrase++;					//initiate user selection to null unless the letter was blank
				if (computerChoice.charAt(i) === " "){
					userLetters[i] = " ";
					lettersInPhrase--;
				}
console.log("there are " + lettersInPhrase + " lettersInPhrase");
		}
			statusPhrase = "Pick a letter!"
			makeStatusHTML("playing");
			gameStatus = 1;	
        	break;
	    case 1:     

       		var userGuess = event.key.toUpperCase();
			var flagPrevPicked = false;

			for (var i = 0; i < userLettersPicked.length; i++) {
				if (userLettersPicked[i] === userGuess) {
					flagPrevPicked = true;
				}
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
console.log("lettersCorrect is " + lettersCorrect);

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
	
	var imageName = "HMProgress" + userPicksWrong + '.jpg">';

	if (statusType === "playing") {
	var html = '<img src="assets/images/' + imageName +	";<p>You have guessed the following </p>" + 
		"<h2>" + choiceString + "</h2>" + 
		"<p>You still have  " + choicesLeft + " incorrect choices you can make </p>" +
		"<p>You have picked " + lettersCorrect + " letters correct</p>" +
		"<p>You have won " + gamesWon + " games so far</p>" + 
		"<p>You have picked these letters so far " + userLettersPicked + "</p>" +
		"<h3>" + statusPhrase + "</h3>"
		document.querySelector("#statusInfo").innerHTML = html;
	}
	if (statusType === "winner"){
		
		var html = '<img src="assets/images/HMProgressWIN.jpg">' +
		"<h2>" + choiceString + "</h2>" + 
		"<h3>You have won the game!<h3>" +
		"<p>You have won " + gamesWon + " games so far</p>" + 
		"<p>Press a key to continue</p>" 
		
		document.querySelector("#statusInfo").innerHTML = html;
	}	
	if (statusType === "loser"){
		html = '<img src="assets/images/' + imageName + 
		"<h2>" + choiceString + "</h2>" + 
		"<h3>You have lost the game!<h3>" +
		"<p>You have won " + gamesWon + " games so far</p>" + 
		"<p>Press a key to continue</p>" 
		document.querySelector("#statusInfo").innerHTML = html;
		}
}
