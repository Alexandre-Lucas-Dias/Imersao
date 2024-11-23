import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts(); // await faz como se fosse uma "pausa" na execução do código para analisar alguma coisa (como a conexão de um banco de dados por exemplo)
    res.status(200).json(posts); // isso é uma "rota" e representa uma requisição (rota 200 é na "faixa do ok") e devolve uma resposta
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body; // toda requisição precisa de um "corpo"
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message); // "message" tem uma mensagem predefinida
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImagem(req, res) {
    const novoPost = { // toda requisição precisa de um "corpo"
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message); // "message" tem uma mensagem predefinida
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id; // o id vai pela barra da URL
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message); // "message" tem uma mensagem predefinida
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}