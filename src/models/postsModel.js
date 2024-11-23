// aqui, o arquivo tem que terminar com .js. Importa a função para conectar ao banco de dados, definida no arquivo dbConfig.js.
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts(){ // função assíncrona (async) acontece em paralelo com a execução do código, ou seja, ela não necessariamente acontece de forma linear.
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(novoPost){
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost){
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id); // o mongo exige esse "objID" para saber qual é o ID
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost}); // "_" é a forma como um ID é criado no banco do mongo
}