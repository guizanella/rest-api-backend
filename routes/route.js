const express = require('express')
const route = express.Router()
const usuarioController = require('../controllers/usuarioController')
const projetoController = require('../controllers/projetoController');
const candidatoProjetoController = require('../controllers/candidatoProjetoController');
const selecionadoProjetoController = require('../controllers/selecionadoProjetoController');

// Autenticação
route.post("/usuario/login", usuarioController.postLogin);
route.post("/usuario/logout", usuarioController.postLogout);

// Usuario
route.get("/usuarios", usuarioController.getUsuarios);
route.post("/usuario", usuarioController.postUsuario);
route.put('/usuario/:id', usuarioController.putUsuario);
route.delete('/usuario/:id', usuarioController.deleteUsuario);
route.get("/selecionados/:id", usuarioController.getSelecionadosByProjeto);

// Projeto
route.get("/projetos", projetoController.getProjetos);
route.post("/projeto", projetoController.postProjeto);
route.put('/projeto/:id', projetoController.putProjeto);
route.delete('/projeto/:id', projetoController.deleteProjeto);
route.get('/projetos/candidatos', projetoController.getProjetosAndCandidatosByResponsavel);

// Candidatar
route.post("/candidatar", candidatoProjetoController.postCandidatar);

// Selecionar
route.post("/selecionar", selecionadoProjetoController.postSelecionar);

module.exports = route;