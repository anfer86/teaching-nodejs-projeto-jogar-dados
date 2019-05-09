/*
Controller jogo
- manter uma instância do model
- Pedir ao model para iniciar o jogo
- Pedir ao model para lançar os dados
- Pedir ao model para encerrar o jogo
- Pedir ao model para iniciar um novo jogo
*/

var model = require('../models/Jogo');
var jogoModel = undefined;

module.exports.iniciar = function (application, req, res) {
	console.log('controller: iniciar');	
	console.log('controller: criar instância de jogo');	
	jogoModel =  new model.Jogo();
	console.log('controller: pede ao model iniciar um novo jogo');	
	jogoModel.novoJogo(req,res);
	console.log('controller: atualizar view - novoJogo');	
	res.render('novoJogo');
}

module.exports.novoLancamento = function (application, req, res) {
	console.log('controller: novoLancamento');
	if (jogoModel){
		console.log('controller: pede para o model fazer novoLancamento');	
		var resultado = jogoModel.novoLancamento(req, res);	
		console.log('controller: atualizar view - novoLancamento');	
		res.render('novoLancamento', resultado);		
	}
	else{
		console.log('controller: atualizar view - home');	
		res.render('home');
	}

}

module.exports.reiniciar = function (application, req, res) {
	console.log('controller: reiniciar');	
	if (jogoModel){
		console.log('controller: pede ao model iniciar um novo jogo');	
		jogoModel.novoJogo(req,res);
		console.log('controller: atualizar view - novoJogo');	
		res.render('novoJogo');
	}
	else{
		console.log('controller: atualizar view - home');	
		res.render('home');
	}
}

module.exports.encerrar = function (application, req, res) {
	console.log('controller: encerrar');	
	jogoModel = undefined;	
	res.render('home');
}
