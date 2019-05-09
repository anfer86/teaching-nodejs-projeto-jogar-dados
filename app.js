/* Importar as configurações do arquivo ./config/server.js */
var app = require('./config/server');

/* Especificar a porta que nossa aplicação vai escutar */
app.listen(3100, function(){
	console.log('A aplicação está online.');
})
