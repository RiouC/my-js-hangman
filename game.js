const readlineSync = require('readline-sync');
const chalk = require('chalk');
const { randomInt } = require('crypto');

const { factorial, binCoeff } = require('./maths');

class Game {
    constructor(word) {
	this.word = word.split('').map(el => [el, false]);
	this.tries = 10;
	this.trollSentences = ['Are you illiterate by any chance ?',
			       'Try Again !',
			       'Have you ever opened a dictionary in your life ?',
			       `Don't tell me you will get beaten by a word of only ${this.getWord.length} letters ?`,
			       'Are you trying this famous strategy ? The one where you try every letter of the alphabet ? You disappoint me…',
			       `And this is why it's important to go to school. To avoid death by hanging…`,
			       'You like suffocation, do you ?',
			       //`Don't worry, there's only ${Math.pow(26, [...new Set(this.getWord.split(''))].length)} possible combinations`,
			       `Don't worry, there's only ${factorial([...new Set(this.getWord.split(''))].length)} possible combinations`,
			      'What do your eyes see before your death ?']
    }
    
    run() {
	while (true) {
	    // console.log(this.getWord);
	    console.log(this.printWord());
	    if (this.tries <= 3)
		console.log(chalk.yellow(`Tries : ${this.tries}`));
	    else
		console.log(`Tries : ${this.tries}`);
	    let guess = readlineSync.question('Can you guess the word ? ');

	    if (!this.updateWord(guess)) {
		this.tries -= 1;
		console.log(chalk.blue(this.tryAgain()));
	    }
	    if (this.hasWin) {
		console.log(chalk.green('Congratulations !\n'));
		break;
	    }
	    if (this.tries === 0) {
		console.log(chalk.red(`You died this time, but don't lose hope !
Let's play another round !\n`));
		console.log(`The word was : ${this.getWord}`);
		break;
	    }	    
	}
    }
    get getWord() {
	return this.word.map(el => el[0]).join('');
    }
    printWord() {
	return this.word.map(el => el[1] === true ? el[0] : '_').join(' ');
    }
    
    isLetterDisplayed(index) {
	return this.word[index][1] === true;
    }
    setLetterDisplayed(index) {
	this.word[index][1] = true;
    }

    updateLetter(letter) {
	if (this.getWord.includes(letter)) {
	    for (let i = 0; i < this.getWord.length ; i++)
		if (this.getWord[i] === letter)
		    this.setLetterDisplayed(i);
	    return true;
	}
	return false;
    }
    updateWord(guess) {
	let res = false;
	for (let l of guess)
	    res = res || this.updateLetter(l);
	return res;
    }
    
    get hasWin() {
	return this.word.filter(el => !el[1]).length === 0;
    }

    tryAgain() {
	const randNum = randomInt(0, this.trollSentences.length);
	return this.trollSentences[randNum];
    }
}

exports.Game = Game
