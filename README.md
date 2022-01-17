# API de Sistema de Sensores e Medições

API desenvolvida com TypeScript, utilizando Node.js e banco de dados não relacional MongoDB.

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
- dist: Saída do build do Typescript
- node_modules: Dependências utilizadas no desenvolvimento
- src: Código fonte que é compilado para as pasta dist
- src/models: Schemas utilizados para armazenar e retornar dados do banco de dados
- src/routes: Rotas geradas pelo express, divididas de acordo com cada funcionalidade
- src/controllers: Funções que são executadas quando uma rota é acionada
- src/app.ts: Configuração do app do express
- src/index.ts: Inicialização do app do express
- package.json: Dependências do npm e scripts
