const axios = require('axios');

const fetchWord = async () => {
    try {
	const response = await axios.get('https://random-word-api.herokuapp.com/word?number=1&swear=0');
	return response.data[0];
    } catch (error) {
	console.error(error);
	process.exit(1);
    }
}

exports.fetchWord = fetchWord;
