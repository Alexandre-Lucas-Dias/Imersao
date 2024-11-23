import express from "express"; // Importa o framework Express.js para criar a aplicação web.
import routes from "./src/routes/postsRoutes.js";

// const posts = [
//     {
//         id: 1,
//         descricao: "Uma foto teste",
//         imagem: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 2,
//         descricao: "Gato fazendo yoga",
//         imagem: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 3,
//         descricao: "Gato fazendo panqueca",
//         imagem: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 4,
//         descricao: "Geralt of Rívia",
//         imagem: "https://www.google.com/search?sca_esv=77c72257878c30ef&rlz=1C1OKWM_pt-BRBR991BR991&sxsrf=ADLYWIIEXjcnZHVc9zZ-P1pKJvJkYVxzlg:1732033833782&q=Geralt+of+R%C3%ADvia&udm=2&fbs=AEQNm0AuaLfhdrtx2b9ODfK0pnmi046uB92frSWoVskpBryHTvXAcQd7vp80ISgpQqOrJlJ1fF0j5Y1X9xOSWf9RFNq3N46SALeLww5Va_saSPrUvzb7rREWAvlF6MDJSb05zmq5gTejtP8lYCgy5uVZ86kirzQzZr4JOGP5sgBxhh2Tb-3FNjrQnF-KlcT5E_zdIzD_5OfSYLmMUlzDPLjKIlIATUPUiQ&sa=X&ved=2ahUKEwjx8Zrr6OiJAxUBrpUCHY7rAUoQtKgLegQIJhAB&biw=1366&bih=607&dpr=1#vhid=n_Ljy0F6wEn8CM&vssid=mosaic"
//     }
// ];

// Cria uma instância do Express, que será o núcleo da nossa aplicação.
const app = express();
app.use(express.static("uploads")); // servir arquivos estáticos
routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// function buscarPostPorID(id){
//     return posts.findIndex((post) => {
//         return post.id === Number(id); // "Number" converte para número
//     })
// }

// app.get("/posts/:id", (req, res) => { // ":" diz-se para o express que a informação será substituída por um dado variável
//     const index = buscarPostPorID(req.params.id); // aqui a "req" tem o valor do id
//     res.status(200).json(posts[index]);
// });

// criando um novo endpoint

// app.get("/exercicio/:id", (req, res) => {
//     const index = buscarPostPorID(req.params.id);
//     if (index === 3){ // apesar de o id começar com 1, o index considera o início como sendo zero!!
//         res.status(200).json(posts[index]);
//     }else{
//         res.status(404).json("Post inexistente!!!!")
//     }
// });

// colocar "--watch" depois de "node" na hora de executar, elimina a necessidade de quebrar e subir novamente o servido