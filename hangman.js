const readlineSync = require('readline-sync');

const { fetchWord } = require('./fetch-word');
const { Game } = require('./game');


const main = async () => {
    do {
	const word = await fetchWord();
	const game = new Game(word);
	game.run()
    } while (readlineSync.keyInYN('Another game ?'))
}

main();

// TODO : highscore json file ?
