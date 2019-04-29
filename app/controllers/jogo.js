/*
Controller jogo
- Pedir ao model para iniciar o jogo
- Pedir ao model para lançar os dados
- Pedir ao model para encerrar o jogo
- Pedir ao model para iniciar um novo jogo
*/

var model = require('../models/Jogo');
var jogoModel = undefined;

module.exports.iniciar = function (application, req, res) {
	console.log('controller: iniciar');	
	jogoModel =  new model.Jogo();
	jogoModel.novoJogo(req,res);	
}

module.exports.novoLancamento = function (application, req, res) {
	console.log('controller: novoLancamento');
	if (jogoModel)
		jogoModel.novoLancamento(req, res);	
	else
		res.render('home');
}

module.exports.reiniciar = function (application, req, res) {
	console.log('controller: reiniciar');	
	if (jogoModel)
		jogoModel.novoJogo(req,res);
	else
		res.render('home');	
}

module.exports.encerrar = function (application, req, res) {
	console.log('controller: encerrar');	
	jogoModel = undefined;	
	res.render('home');
}
