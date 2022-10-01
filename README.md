<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição do projeto

 **Disclaimer: This project was created for study purposes only. I do not own neither images of Nestjs nor Docker.**

API de filmes em desenvolvimento utilizando: [Nestjs](https://github.com/nestjs/nest), PostgreSQL, TypeScript, TypeORM, autenticação JWT e Docker.

## Instalação
---
A aplicação pode ser *dockerizada*, isso significa que dispensa grandes configurações locais como nos projetos convencionais e você consegue rodá-la com um comando apenas basicamente. 

## Como subir um container do Docker com a aplicação
---
![Imagem do Docker](https://www.mundodocker.com.br/wp-content/uploads/2015/06/docker_facebook_share.png)

>Certifique-se de que você possui o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado na sua máquina, **é necessário** para que possamos subir o container com a API e suas dependências.

Devemos configurar as variáveis de ambiente primeiro. Na raiz do projeto temos o arquivo *.env.example*, como o próprio nome sugere é um exemplo das variáveis que você pode definir no seu *.env*.

>É importante lembrar que a única variável de ambiente OBRIGATÓRIA para utilizarmos o Postgres é a variável *POSTGRES_PASSWORD*, a qual vai definir a senha do *superuser*. Caso você não defina um usuário, por padrão será *postgres*. 
[Leia a documentação oficial do Postgres no DockerHub.](https://hub.docker.com/_/postgres)

Após configurar as variáveis de ambiente, podemos rodar o seguinte comando no terminal:


```bash
$ docker-compose up
```
## Autenticação JWT
---
Após criar seu usuário, você deverá passar o Header *Authorization* com o valor *Bearer seuTokenDeAcesso*. Dessa forma você poderá ter acesso as rotas administrativas da API.



## Support
---
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch
---
- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License
---
Nest is [MIT licensed](LICENSE).
