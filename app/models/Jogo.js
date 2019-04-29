function Jogo(dados = 5, lados = 6) {
	console.log('model: criar jogo')
	this.dados = dados;
	this.lados = dados;
}

Jogo.prototype.novoJogo = function(req, res) {
	console.log('model: iniciar e zerar pontuaçao')
	this.pontos = 0;
	this.n = 0;
	res.render('novoJogo');
}

Jogo.prototype.lancarDados = function(){
	console.log('model: lançar dados')
	var lancamento = [];
	for (var i=0; i < this.dados; i++){
		lancamento[i] = this.lancarUmDado(this.lados);
	}
	return lancamento;
}

Jogo.prototype.lancarUmDado = function(lados){
	var valorAleatorio = Math.random(); // No intervalo [0,1]
	var numero = 1 + parseInt(valorAleatorio * (lados-1) ); // No intervalo [1,6]
	return numero;
}

Jogo.prototype.contarDados = function(lancamento){
	var contagem = Array(this.lados).fill(0);	
	for (var i = 0; i < lancamento.length; i ++){
		var numero = lancamento[i];		
		contagem[numero] += 1;
	}	
	return contagem;
}

const GENERALA = { jogo : 'Generala', pontos : 100 }
const POKER    = { jogo : 'Poker'   , pontos : 50  }
const FULL     = { jogo : 'Full'    , pontos : 30  }
const NADA     = { jogo : 'Nenhum'  , pontos : 0   }

Jogo.prototype.analisarLancamento = function(lancamento){
	var contagem = this.contarDados(lancamento);

	var resultado;

	if ( contagem.find(e => e === 5) )
		resultado = GENERALA;
	else if ( contagem.find(e => e === 4) )
		resultado = POKER;
	else if ( contagem.find(e => e === 3) && contagem.find(e => e === 2) )
		resultado = FULL;
	else
		resultado = NADA;

	return resultado;
}

Jogo.prototype.novoLancamento = function(req, res) {
	/* Altera o model */
	var lancamento = this.lancarDados();	
	var analiseLancamento = this.analisarLancamento(lancamento);
	this.pontos += analiseLancamento.pontos;
	this.n += 1;
	/* Renderiza a view */
	res.render('novoLancamento', {
		pontosAcumulados : this.pontos,
		nLancamentos : this.n,		
		lancamento : lancamento,
		jogoLancamento : analiseLancamento.jogo,
		pontosLancamento : analiseLancamento.pontos
	})
};

module.exports.Jogo = Jogo;


function testarLancamento(){
	console.log('--- test model jogo');
	
	var jogo = new Jogo();
	jogo.iniciar();
	var lancamento = jogo.lancarDados();
	console.log('model: lancamento 1:', lancamento);
	var analiseLancamento = jogo.analisarLancamento(lancamento);
	console.log('model: analisar lancamento:', analiseLancamento);
	jogo.pontuar(analiseLancamento);
	console.log('model: pontos:', jogo.pontos);

	var lancamento = jogo.lancarDados();
	console.log('model: lancamento 2:', lancamento);
	var analiseLancamento = jogo.analisarLancamento(lancamento);
	console.log('model: analisar lancamento:', analiseLancamento);
	jogo.pontuar(analiseLancamento);
	console.log('model: pontos:', jogo.pontos);

	console.log('--- end test model jogo');
}

//testarLancamento();