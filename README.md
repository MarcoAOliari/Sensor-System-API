# API de Sistema de Sensores e Medições

API desenvolvida com TypeScript, utilizando Node.js e o banco de dados não relacional MongoDB.

A documentação da API com os seus endpoints pode ser conferida em https://app.swaggerhub.com/apis/marco.oliari/SenseUp/1.0

# Variáveis de Ambiente
- DATABASE_NAME: nome da base de dados a ser criada no MongoDB
- DATABASE_PORT: porta em que a API estará disponível

# Pré requisitos
- Node.js versão 10.19.0
- NPM versão 6.14.4
- MongoDB versão 4.4.11

# Como utilizar
- Clone o repositório
```
git clone https://github.com/MarcoAOliari/Sensor-System-API.git
```
- Instale todas as dependências
```
cd Sensor-System-API
npm install
```

- Build e execute o projeto
```
npm run build
npm start
```

A API estará online em http://localhost:3000

# Estrutura do Projeto
| Nome | Descrição |
| ------------------------- | ----------------------------------------------------------------------- |
| **dist**                  | Saída do build do Typescript |                                
| **node_modules**          | Dependências utilizadas no desenvolvimento |
| **src**                   | Código fonte que é compilado para as pasta dist |
| **src/models**            | Schemas utilizados para armazenar e retornar dados do banco de dados |
| **src/models/interfaces** | Interfaces utilizadas nos Schemas
| **src/routes**            | Rotas geradas pelo express, divididas de acordo com cada funcionalidade |
| **src/controllers**       | Funções que são executadas quando uma rota é acionada |
| **src/seeds.ts**          | Alimentação do banco de dados com unidades de medida |
| **src/app.ts**            | Configuração do app do express |
| **src/index.ts**          | Inicialização do app do express |
| **package.json**          | Dependências do npm e scripts |

# Desenvolvimento
A API foi projetada seguindo da maneira mais fiel possível às especificações fornecidas. Para a comunicação com o banco de dados MongoDB foi utilizado o ODM mongoose. A porta e o nome do banco de dados são variáveis de ambiente, configuradas com o dotenv e recebidas de um arquivo .env.

O diagrama de classes é representado dentro da aplicação pelos Schemas, que respeitam os campos e as relações apresentadas. O desenvolvimento das rotas teve como base o express, realizando chamadas ao banco de dados com o mongoose e tratando-os diretamente com TypeScript para que os dados pudessem ser exibidos conforme a documentação.

Os dados referentes às unidades de medida são inseridos no banco de dados assim que é inicializado por meio do arquivo seeds.ts. Isso ocorre pois não existe rota de cadastro para uma nova unidade de medida, ao mesmo tempo que deve-se retornar todas elas para o usuário.
