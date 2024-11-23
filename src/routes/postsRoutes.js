import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({dest: "./uploads", storage}); // esse storage serve para configurações de imagem do windows

const routes = (app) => {
    // Habilita o middleware para analisar o corpo das requisições que contêm dados no formato JSON.
    app.use(express.json());
    app.use(cors(corsOptions));
    // para acessar diversos tipos de status>> URL: http.cat
    app.get("/posts", listarPosts); // significa "pegar"
    // rota para cirar um post
    app.post("/posts", postarNovoPost); // significa enviar
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost);

    // outro exemplo de rota

    app.get("/livro", (req, res) => {
        res.status(200).send({
            "titulo": "O Senhor dos Anéis",
            "autor": "J.R.R. Tolkien",
            "ano": 1954,
            "genero": "Fantasia"
        });
    });
}

export default routes;