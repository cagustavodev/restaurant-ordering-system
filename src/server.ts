//import http from "node:http";
import app from "./app.js";

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}`);
});

// criação de servers para testes

// Processo completo
// category / Product jogam o formato da função para o controller que valida o envio ou erro de dados
// se os dados estiverem validos é passado para a router que faz a passagem/rota desses dados para o
// app.ts que reune todos os dados e repassa tudo para esse server.ts que executa/ testa de forma local