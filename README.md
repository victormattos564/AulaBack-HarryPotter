## Harry Potter API Genrenciador de Bruxos e Varinhas

Esta é uma API simples para gerenciar informações sobre bruxos e varinhas do universo de Harry Potter.

<img src="/image/harry.jpg" height='300' >
### Requisitos

- Node.js
- PostgreSQL
- express
### Instalação

1. Clone este repositório:

```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Instale as dependências:

```
npm install -g nodemon
npm init -y
npm install express pg
npm install

```

3. Configure o banco de dados PostgreSQL de acordo com as credenciais fornecidas no arquivo `index.js`.

4. Inicie o servidor:

```
npm run dev
```

### Rotas Disponíveis

#### Bruxos

- **GET** `/bruxos`: Retorna todos os bruxos cadastrados.
- **GET** `/bruxos/nome/:nome`: Retorna um bruxo específico pelo nome.
- **GET** `/bruxos/sangue/:status_sangue`: Retorna bruxos filtrados por status sanguíneo.
- **POST** `/bruxos`: Cadastra um novo bruxo.
- **PUT** `/bruxos/:id`: Atualiza as informações de um bruxo existente pelo ID.
- **DELETE** `/bruxos/:id`: Exclui um bruxo pelo ID.

#### Varinhas

- **GET** `/varinhas`: Retorna todas as varinhas cadastradas.
- **GET** `/varinhas/nucleo_varinha/:nucleo`: Retorna varinhas filtradas pelo núcleo.
- **POST** `/varinhas`: Cadastra uma nova varinha.
- **PUT** `/varinhas/:id`: Atualiza as informações de uma varinha existente pelo ID.
- **DELETE** `/varinhas/:id`: Exclui uma varinha pelo ID.

### Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar problemas através das issues.

### Autor

[Victor](https://github.com/Victormattos564)

### Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md](LICENSE) para obter detalhes.

```