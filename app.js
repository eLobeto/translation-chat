var express = require('express'),
	app = express();

var port = process.env.PORT || 8080;

var io = require('socket.io').listen(app.listen(port));

require('./config')(app, io);
require('./routes')(app, io);

console.log('Your application is listening on port:' + port);

var Translate = require('@google-cloud/translate');
var projectId = 'f9584f0c1ffa9aa6821a6eb68a3f259fc83f47f6';
// Instantiates a client
var translateClient = Translate({
	projectId: projectId
});

var text = 'Hello, world!';
// The target language
var target = 'ru';

// Translates some text into Russian
translateClient.translate(text, target)
  .then((results) => {
	const translation = results[0];

	console.log(`Text: ${text}`);
	console.log(`Translation: ${translation}`);
  })
  .catch((err) => {
	console.error('ERROR:', err);
  });