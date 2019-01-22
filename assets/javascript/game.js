var movies = [
	{
		title: 'The Terminator',
		poster: 'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
	},
	{
		title: 'Predator',
		poster: 'https://m.media-amazon.com/images/M/MV5BY2QwYmFmZTEtNzY2Mi00ZWMyLWEwY2YtMGIyNGZjMWExOWEyXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg'
	},
	{
		title: 'The Matrix',
		poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
	},
	{
		title: 'Jaws',
		poster: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
	},
	{
		title: 'The Shining',
		poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
	},
	{
		title: "Terminator 2",
		poster: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
	}
];

var word;
var movie;
var lowerWord;
var typedLetters = [];
var wordDisplay = document.querySelector('#word');
var missedLetters = document.querySelector('#missedLetters');
var allowedChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
var allowedGuesses = 9;
var roundEnded = false;

// begins a new round with a random word
function startWord(){
	roundEnded = false;
	typedLetters = [];
	missedLetters.textContent = '';
	allowedGuesses = 9;
	document.querySelector('#instructions').hidden = true;
	document.querySelector('#text').hidden = false;
	document.querySelector('#poster').src='';
	document.querySelector('#remainingGuesses').textContent = allowedGuesses;
	movie = selectRandomElement(movies);
	word = movie.title;
	lowerWord = word.toLowerCase();
	displayWord();
}

// takes in an array and returns a random element
function selectRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

// responds to user pressing key
function onKeyDown(event){
	var key = event.key.toLowerCase();
	if (roundEnded == true) {
		startWord();
		return;
	}
	if (typedLetters.indexOf(key) >= 0 || allowedChars.indexOf(key) < 0) {
		return;
	}
	typedLetters.push(key);
	if (lowerWord.indexOf(key) == -1){
		missedLetters.textContent += key;
		allowedGuesses--;
		document.querySelector('#remainingGuesses').textContent = allowedGuesses;
	} else {
		displayWord();
	}
	if (allowedGuesses == 0){
		document.querySelector('#poster').src='https://m.media-amazon.com/images/M/MV5BMTY1MDE5MTc5Nl5BMl5BanBnXkFtZTYwNzIzMzE3._V1_SX300.jpg';
		roundEnded = true;
		document.querySelector('#instructions').hidden = false;
		document.querySelector('#text').hidden = true;
	}
}

// displays found letters and checks if user won
function displayWord(){
	win = true;
	wordDisplay.textContent = '';
	for (i=0; i<word.length; i++){
		if (word[i] == ' ') {
			wordDisplay.textContent += ' ';
		} else if (typedLetters.indexOf(lowerWord[i]) >= 0) {
			wordDisplay.textContent += word[i];
		} else {
			wordDisplay.textContent += '_';
			win = false;
		}
	}
	if (win == true) {
		document.querySelector('#poster').src=movie.poster;
		roundEnded = true;
		document.querySelector('#instructions').hidden = false;
		document.querySelector('#text').hidden = true;
	}
}

document.addEventListener('keydown', onKeyDown);
startWord();