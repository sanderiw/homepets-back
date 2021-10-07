![homepets](https://home-pets.netlify.app/static/media/homepets-brand.1930674e.png)

# Homepets

Esse boilerplate para API RESTful já inclui:

- Autenticação por tokens JWT usando o Passport
- Conexão com banco de dados MongoDB usando Mongoose
- Servidor Web usando Express pré-configurado com CORS e aceitando requisições JSON e Multipart Form
- Upload de arquivos usando Cloudinary e Multer

## Para Começar

- Faça o fork e clone deste repositório

## Instalação

```shell
$ npm install
```

## Desenvolvimento

Para iniciar o servidor web localmente execute no seu terminal:

```shell
$ npm run dev
```

## Deploy do MongoDB

1. Faça login no https://account.mongodb.com/account/login?nds=true
2. Crie um cluster gratuito
3. Siga as instruções e obtenha a string de conexão com o banco
4. Crie uma variável de ambiente MONGODB_URI no Heroku com a string de conexão copiada do Atlas

## Deploy no Heroku

1. Faça login no Heroku e selecione seu repositório
2. Habilite 'automatic deploys'
3. No seu terminal, execute os seguintes comandos:

```shell
$ git add .
$ git commit -m 'deploying'
$ heroku git:remote -a nome-do-repo-no-heroku
$ git push heroku master
```

4. Adicione uma variável de ambiente no Heroku para cada variável de ambiente presente no arquivo .env (não precisa criar a PORT no Heroku)
5. Adicione a URL da sua API hospedada no Heroku nas variáveis de ambiente do app React no Netlify

Happy coding! 💙
