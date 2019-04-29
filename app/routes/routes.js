module.exports = function(application){

    application.get('/', function(req,res){
        res.render('home');
    });

    application.get('/iniciar', function(req,res){
    	console.log('routes: /iniciar');
        application.app.controllers.jogo.iniciar(application, req, res);
    });

    application.get('/lancarDados', function(req,res){
    	console.log('routes: /lancarDados');
        application.app.controllers.jogo.novoLancamento(application, req, res);
    });

    application.get('/reiniciar', function(req,res){
    	console.log('routes: /reiniciar');
        application.app.controllers.jogo.reiniciar(application, req, res);
    });
    
    application.get('/encerrar', function(req,res){
    	console.log('routes: /encerrar');
        application.app.controllers.jogo.encerrar(application, req, res);
    });
}