<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/MatMB115/repime_web?color=a015f5">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/MatMB115/repime_web">

  <a href="https://github.com/MatMB115/repime_web/releases/tag/RepiMe">
    <img alt="Application Status" src="https://img.shields.io/badge/app status-off-f23838">
  </a>

  <a href="https://github.com/MatMB115/repime_web/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/MatMB115/repime_web">
  </a>
  
  <a href="https://www.heroku.com/">
  <img alt="Database" src="https://img.shields.io/badge/database PostgreSQL-red">
  </a>

  <a href="https://www.heroku.com/">
  <img alt="Host database" src="https://img.shields.io/badge/database host-Heroku-red">
  </a>

<img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  <a href="https://github.com/MatMB115/repime_web/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/MatMB115/repime_web?style=social">
  </a>
</p>

<p align="center">
  <a href="https://github.com/MatMB115/repime_web">
    <img src="https://imgur.com/Dpz0GiD.png" height="150" width="700" alt="RepiMe-logo" />
  </a>
</p>

<p align="center">
    <a href="https://nextjs.org/">
        <img align="center" alt="RepiMe-Flutter" height="60" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg">
    </a>
    <a href="https://www.typescriptlang.org/">
        <img align="center" alt="RepiMe-Dart" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg">
    </a>
    <a href="https://nodejs.org/en">
        <img align="center" alt="RepiMe-Dart" height="70" width="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg">
    </a>
    <a href="https://www.npmjs.com/">
        <img align="center" alt="RepiMe-Dart" height="70" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg">
    </a>
</p>

# RepiMe

A aplicação web RepiMe busca centralizar, gerenciar e organizar as informações sobre as vagas em Repúblicas e Kitnets disponíveis na cidade e universidades suportadas.

---
## Sobre :information_source:

Tendo em vista a forte tradição de repúblicas na cidade de Itajubá, muitos ingressantes nas universidades da cidade buscam acomodações durante o ciclo acadêmico. Nesse cenário, a fraca centralização das informações acerca das vagas gera um estresse que pode ser evitado.

Conforme as atividades da disciplina de Gerência de Projetos de Software e Desenvolvimento de Sistemas na Web da Universidade Federal de Itajubá, a equipe de desenvolvedores deste projeto propôs uma aplicação que busca auxiliar os universitário no processo para encontrar uma moradia. A aplicação web RepiMe foi construída com framework Next.js.

As orientações estão divididas nos seguintes tópicos:

- [RepiMe](#repime)
  - [Sobre :information\_source:](#sobre-information_source)
  - [Funcionalidades :gear:](#funcionalidades-gear)
  - [Banco de dados :chair: :game\_die:](#banco-de-dados-chair-game_die)
  - [Pré-requisitos e configuração :hammer\_and\_wrench:](#pré-requisitos-e-configuração-hammer_and_wrench)
  - [Layout :art:](#layout-art)
    - [Layout para telas de maiores :desktop\_computer:](#layout-para-telas-de-maiores-desktop_computer)
    - [Layout para telas de médias :computer:](#layout-para-telas-de-médias-computer)
    - [Layout para telas de pequenas :iphone:](#layout-para-telas-de-pequenas-iphone)
  - [Tecnologias :technologist:](#tecnologias-technologist)
  - [Contribuidores](#contribuidores)

---
## Funcionalidades :gear:

 - [x] CRUD e login do usuário;
 - [x] CRUD de Kitnets;
 - [x] CRUD de República;
 - [x] CRUD de Vagas;
 - [X] Visualizar detalhes das vagas;
 - [ ] Maps na tela de vaga;
 - [ ] Modal de remoção de vaga;
 - [ ] Filtros de vagas;
 - [ ] Dashboard.

---
## Banco de dados :chair: :game_die:
A aplicação utiliza um banco relacional presente no modelo entidade relacionamento abaixo. A modelagem visa permitir o registro dos cadastros de usuários, vagas, residências, locadores, vagas e cidades. A hospedagem foi feita no Heroku com o add-on Heroku Postgres e a aplicação conversa com o banco através de uma API. O pgAdmin4 facilitou o processo de criação e vizualização das tabelas/relacionamentos.

![MER-RepiMe](https://imgur.com/u761a6r.png)

Todos os comandos SQL utilizados para criar tabelas, tipos e funções estão presentes nesta [path](/database/scripts/) desse repositório. 

Para realizar a conexão com o banco utilizou-se:
>PostgreSQL - 15.2

>PGadmin4 - 7.2

>Prisma - 4.14.1

---
## Pré-requisitos e configuração :hammer_and_wrench:
No geral, para executar a aplicação é recomendado que o sistema já possua:

    > Node.js
    > npm

A aplicação utiliza tokens de serviços de terceiros:

    Social Login: Github/Google
    DB Credentials: Heroku
    Cloundinary

Para executar essa versão é necessário:

```bash
# Clone este repositório com
$ git clone https://github.com/MatMB115/repime_web.git
# OU
$ git clone git@github.com:MatMB115/repime_web.git

# Navegue até o diretório clonado com terminal

$ cd repime-web
$ cd repime_web

# Instale as dependências
$ npm install

# Navegue até a pasta do prisma
$ cd prisma

# Recupere o schema do banco com ORM Prisma
# Mude no .env com as credencias do banco criado
$ npx prisma db pull
$ npx prisma generate

# Inicar a aplicação como desenvolvedor
$ npm run dev

# Inicar a aplicação
$ npm run start

```

Para executar a aplicação como desenvolvedor:
>npm run dev

---
## Layout :art:
Design base do figma - [RepiME](https://www.figma.com/proto/Xdomencyno1SR2ac3t2adb/RepiME?node-id=60-1365&starting-point-node-id=60%3A1365)

### Layout para telas de maiores :desktop_computer:
<p align="center">
  <img alt="Home page screenshot" title="#First" src="https://imgur.com/KIbX0z1.png" width="800px">
  <img alt="Home page screenshot" title="#First" src="https://imgur.com/QOtbdqC.png" width="800px">
  <img alt="Home page screenshot" title="#First" src="https://imgur.com/QMwNPHJ.png" width="800px">
</p>

### Layout para telas de médias :computer:

<p align="center">
  <img alt="Home page tablet screenshot" title="#First" src="https://imgur.com/qRvndSq.png" width="300px">
  <img alt="User page tablet screenshot" title="#First" src="https://imgur.com/ElqbsvD.png" width="302px">
  <img alt="Residence tablet page screenshot" title="#First" src="https://imgur.com/E2u5Xy7.png" width="303.5px">
</p>


### Layout para telas de pequenas :iphone:
<p align="center">
  <img alt="Home page mobile screenshot" title="#First" src="https://imgur.com/DUQkyHD.png" width="254px">
  <img alt="User page mobile screenshot" title="#First" src="https://imgur.com/MPBz6yi.png" width="250px">
  <img alt="Residence mobile page screenshot" title="#First" src="https://imgur.com/A3Er6kY.png" width="254px">
</p>

---
## Tecnologias :technologist:
    O ponto de início deste projeto foi uma aplicação NextJS, as dependências utilizadas estão presentes no package.json. 

---
Aplicação:

    -> Next.js 13
      -> Prisma 4.14.1
        - @next-auth/prisma-adapter: 1.0.6
        - @prisma/client": 4.14.1
      - @types/node: 20.2.1
      - @types/react: 18.2.6
      - @types/react-dom: 18.2.4
      - axios: 1.4.0
      - bcrypt: 5.1.0
      - bcryptjs: 2.4.3
      - class-validator: 0.14.0
      - eslint: 8.40.0
      - eslint-config-next: 13.4.2
      - next: 13.4.2
      - next-auth: 4.22.1
      - next-cloudinary: 4.12.0
      - next.js: 1.0.3
      - query-string: 8.1.0
      - react: 18.2.0
      - react-dom: 18.2.0
      - react-hook-form: 7.43.9
      - react-hot-toast: 2.4.1
      - react-icons: 4.8.0
      - react-select: 5.7.3
      - typescript: 5.0.4
      - validator: 13.9.0
      - zustand: 4.3.8
      -> DevDepencies
        - @types/bcrypt: 5.0.0
        - autoprefixer: 10.4.14
        - postcss: 8.4.23
        - tailwindcss: 3.3.2
---
Banco de Dados:

    -> PostgreSQL 15
    - pgAdmin4 7.2
    - Heroku Postgres Mini
    - BRmodelo

---
Utilitários:

    -> Dev
    - Visual Studio Code 1.79.1
    - npm 8.19.2
    - Figma

---  

## Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/darlosss"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/72506461?v=4" width="100px;" alt=""/><br /><sub><b>Carlos Eduardo</b></sub></a><br /><a href="https://github.com/darlosss/repime" title="RepiMe">:technologist:</a></td>
    <td align="center"><a href="https://github.com/MatMB115"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/63670910?v=4" width="100px;" alt=""/><br /><sub><b>Matheus Martins</b></sub></a><br /><a href="https://github.com/MatMB115/repime" title="RepiMe">:technologist:</a></td>
    <td align="center"><a href="https://github.com/joaomarcos2803"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/103376456?v=4" width="100px;" alt=""/><br /><sub><b>João Marcos</b></sub></a><br /><a href="https://github.com/joaomarcos2803" title="RepiMe">:technologist:</a></td>
    <td align="center"><a href="https://github.com/adriano-12"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/66391807?v=4" width="100px;" alt=""/><br /><sub><b>Adriano Lucas</b></sub></a><br /><a href="https://github.com/adriano-12" title="RepiMe">:technologist:</a></td>
    <td align="center"><a href="https://github.com/ODBreno"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/92598517?s=400&v=4" width="100px;" alt=""/><br /><sub><b>Breno Dias</b></sub></a><br /><a href="https://github.com/ODBreno" title="RepiMe">:technologist:</a></td>
    <td align="center"><a href="https://www.instagram.com/lecorax/?igshid=YmMyMTA2M2Y%3D"><img style="border-radius: 50%;" src="https://i.imgur.com/hNQXe4J.png" width="100px;" alt=""/><br /><sub><b>Alexsandra</b></sub></a><br /><a href="https://www.instagram.com/lecorax/?igshid=YmMyMTA2M2Y%3D" title="Lecorax">:art:</a></td>
  </tr>
</table>
