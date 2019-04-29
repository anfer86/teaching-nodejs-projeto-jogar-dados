/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo consign */
var consign = require('consign');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
/* indica qual é o motor de geração de views */
app.set('view engine', 'ejs');
/* inidica qual é o diretório onde estão as views */
app.set('views', './app/views' );

/* configurar o middleware express.static que diz onde estão os objetos estáticos */
app.use(express.static('./app/public'));

/* Uma especie de autoload do PHP */
consign()
	.include('./app/routes')
	.include('./app/models')
	.include('./app/controllers')
	.into(app);

/* exportar a o objeto app para a nossa aplicação. 
O module representa o móduloatual da aplicação.
*/
module.exports = app;
