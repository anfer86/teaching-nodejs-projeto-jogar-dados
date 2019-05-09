# Projeto Jogar Dados

Este é um projeto introdutório ao ambiente Node.js e à arquitetura MVC (Model-View-Controller) e consiste em um jogo de dados. No jogo o usuário pode inicia um novo jogo e pode relizar vários lançamentos nesse jogo, podendo pontuar em cada lançamento. O sistema mantem a pontuação do usuário a cada jogo. Esta aplicação será implementada utilizando o Github.

## Instruções

### Etapa 1: Preparando o ambiente

1. Criar um repositório no GitHub chamado `learning-nodejs-projeto-jogar-dados`. Selecione `.gitignore` para `Node.js`.

2. No diretório de projetos criar um clone do repositório `learning-nodejs-projeto-jogar-dados` com o comando:
```bash
$ git clone https://github.com/username/learning-nodejs-projeto-jogar-dados.git
```
Com isso será criada uma pasta com o nome `learning-nodejs-projeto-jogar-dados`.

3. Dentro da pasta `learning-nodejs-projeto-jogar-dados` executar o comando `init` do Node.js para iniciar o projeto, da seguinte forma:
```bash
$ cd learning-nodejs-projeto-jogar-dados
$ npm init
```

4. Criar a seguinte árvore de diretórios e arquivos.
- `learning-nodejs-projeto-jogar-dados`
	- config
	- node_modules (já foi criado pelo node após a instalação dos pacotes)
	- app
		- controllers
		- models
		- public
		- views
		- routes
	- app.js
	- package.json (já foi criado pelo init)

5. Instalar os pacotes `express`, `consign`, `ejs`. Não esqueça da opção `--save` para que fiquem registrados no arquivo `package.json`.
```bash
$ npm install express consign ejs --save
```

### Etapa 2: Configurando a aplicação

1. Criar um arquivo `server.js` na pasta `config` com o seguinte conteúdo:
```js
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
```

2. Crie o arquivo app.js no diretório raiz do projeto com o seguinte código:
```js
/* Importar as configurações do arquivo ./config/server.js */
var app = require('./config/server');

/* Especificar a porta que nossa aplicação vai escutar */
app.listen(3100, function(){
	console.log('A aplicação está online.');
})
```
A porta que a nossa aplicação escutará será `localhost:3100`.

3. Para verificar que a nossa aplicação está funcionando corretamente levantamos (*startamos*) a aplicação com `nodemon`:
```bash
$ nodemon app
```
Esse commando vai iniciar o arquivo `app.js` e vai monitorar todas as alterações que nossos arquivos tiverem. Após isso, abrir no browser o endereço `localhost:3001` e obteremos como resultado um título de página com `Error` e o conteúdo:
```
Cannot GET /
```
Isso ocorre pelo fato de que a aplicação está online mas não tem nada para responder ao pedido de uma página web (Requisição HTTP que o Browser faz para esse endereço).

### Etapa 3: Criando rotas e páginas

1. Criar um arquivo de rotas com o seguinte conteúdo. Cada rota corresponde a uma funcionalidade do sistema, mas como ainda não estão implementadas vamos deixar apenas um aviso no log do servidor e também uma mensagem para o cliente.
```js
module.exports = function(application){

    application.get('/', function(req,res){
        res.render('home');
    });

    application.get('/iniciar', function(req,res){    	
    	console.log('routes: /iniciar');
        res.send('Esta funcionalidade não foi implementada ainda.');
    });

    application.get('/lancarDados', function(req,res){
    	console.log('routes: /lancarDados');
    	res.send('Esta funcionalidade não foi implementada ainda.'); 
    });

    application.get('/reiniciar', function(req,res){
    	console.log('routes: /reiniciar');    	        
    	res.send('Esta funcionalidade não foi implementada ainda.');
    });
    
    application.get('/encerrar', function(req,res){
    	console.log('routes: /encerrar');        
    	res.send('Esta funcionalidade não foi implementada ainda.');
    });
}
```

2. Nossa primeira página será `home.ejs` a qual será renderizada quando houver uma requisição HTTP usando método GET no endereço raiz da nossa aplicação. Neste momento nossa tarefa é deixar nossas páginas funcionais, para posteriormente, nos preocuparmos com a estética. O código da nossa primeira versão de `home.ejs` é o seguinte:
```js
<!DOCTYPE html>
<meta charset="utf-8">
<html>
<head>
	<title>Projeto Jogar Dados</title>
</head>
<body>

<main>

	<h1>Projeto Jogar Dados</h1>

	<button type="button" id="buttonComecar">Começar</button>

</main>

</body>

<script src="js/jquery-3.4.0.min.js"></script>

<script type="text/javascript">

	$(document).ready(function() {
    	$('#buttonComecar').click(function(){
    		location.href='iniciar';
    	} );
	});
	
</script>

</html>
```

Neste exemplo usamos a biblioteca de JQuery, disponível em https://jquery.com/. Para usá-la vamos baixar essa biblioteca e salvá-la na pasta `public/js/` com o nome `js/jquery-3.4.0.min.js` ou similar (se for outra versão). A pasta `js` dentro da pasta `public` também deve ser criada, pois não foi criada ainda. A implementação em JQuery indica que após carregado ao documento HTML completo ele irá criar uma função para o método `onclick` do elemento `buttonComecar`. O endereço atribuído a `location.href` indica que tentaremos acessar via GET o endereço `localhost:3100/iniciar`. Ao rodar a nossa aplicação e clicarmos no botão `Começar` verificaremos a resposta `Esta funcionalidade não foi implementada ainda.`

3. O que queremos é que quando o usuário clicar em `Começar` seja encaminhado para uma página onde possa, de fato, lançar os dados. Para isso vamos alterar o arquivo `routes.js` e no método GET para a rota `/iniciar` vamos escrever uma mensagem no console, para monitorarmos o andamento das requisições do usuário. E pedir para um controller (que vai controllar o que o usuário pode fazer no jogo) iniciar um novo jogo.
```js
application.get('/iniciar', function(req,res){
    	console.log('routes: /iniciar');
        application.app.controllers.jogo.iniciar(application, req, res);
    });
```

Nosso controller ainda não existe mas vamos implementá-lo logo mais.

### Etapa 4: Model-View-Controller

O modelo Movel-View-Controller (MVC) consiste em uma arquitetura de desenvolvimento que divide uma aplicação em três partes interconectadas. Dividir a nossa aplicação em partes é importante para sabermos onde devemos realizar a implementação das diferentes funcionalidades, por exemplo, manipular o evento de um botão, criar uma instância de um objeto, realizar um cálculo ou implementar operações em banco de dados. A seguir temos a definição de cada parte da aplicacão e a sua responsabilidade no nosso projeto.

- A **View** é a apresentação das nossa aplicação para usuário e contem as páginas que serão renderizadas. Está parte é denominada de `Front-end` e está mais preocupada com como as informações são apresentadas ao usuário, envolvendo código fonte implementado em HTML, CSS, Bootstrap e Javascript ou JQuery do lado do cliente (aquele que aparece entre tags `<script> ... </script>`). 

- O **Model** é responsável por gerenciar os dados da nossa aplicação. Quando um usuário realiza uma operação o estado do sistema muda e esta parte da aplicação é reponsável por garantir e manter essa mudança. No nosso projeto, esta parte representa o próprio jogo de dados, ele mantem a pontuação do jogo, permite lançar os dados, e verificar que pontuação conseguiu em cada lançamento. Essas implementações serão feitas na pasta `models`.

- O **Controller** é um meio de campo entre a **View** e o **Model** e permite que ambos se interconectem. Esta parte será responsável por receber requisições da *View* e pedir para *Model* realizar a ação certa. No nosso projeto, quando o usuário pedir para começar o jogo, esta parte será responsável por criar uma instância (objeto) do jogo e pedir para o *Model* zerar a pontuação. Também, quando o usuário quiser lançar os dados, esta parte será responsável por pedir ao *Model* para efetuar um novo lançamento de dados e atualizar a pontuação do jogo. Essas implementações serão feitas na pasta `controllers`.

Existe uma dúvida comum ao implementar o modelo *MVC* que é quem é o responsável por fazer a renderização das *Views*. Uma abordagem consiste em que p *Model* realize a renderização da *View* após ter se modificado e é a que está mais próxima da literatura de MVC. Uma segunda abordagem, mais utilizada na prática, sugere que o *Controller* seja quem, após ter pedido para o *Model* se alterar, decida qual é a *View* que será renderizada para o usuário. Neste projeto vamos utilizar a segunda abordagem. Assim, as nossas renderizações de *Views* estarão concentradas nos arquivos das pastas `routes` e `controllers`.




