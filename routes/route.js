const express = require('express')
const route = express.Router()
const usuarioController = require('../controllers/usuarioController')
const projetoController = require('../controllers/projetoController')
//const controllerSession = require('../controller/controllerSession')

// Autenticação
route.post("/usuario/login", usuarioController.postLogin);
route.post("/usuario/logout", usuarioController.postLogout);

// Usuario
route.get("/usuarios", usuarioController.getUsuarios);
route.post("/usuario", usuarioController.postUsuario);
route.put('/usuario/:id', usuarioController.putUsuario);
route.delete('/usuario/:id', usuarioController.deleteUsuario);

// Projeto
route.get("/projetos", projetoController.getProjetos);
route.post("/projeto", projetoController.postProjeto);
route.put('/projeto/:id', projetoController.putProjeto);
route.delete('/projeto/:id', projetoController.deleteProjeto);


/*
route.get('/', controllerSession.getInicio)
route.get('/logout', controllerSession.getLogout)
route.post('/login', controllerSession.postLogin)
route.post('/logout', controllerSession.postLogout)

route.get('/createUser', controllerUser.getCreate)
route.post('/createUser', controllerUser.postCreate)
route.get('/usersList', controllerUser.getList)
route.get("/editUser/:id", controllerUser.getEdit);
route.post("/editUser", controllerUser.postEdit);
route.get("/deleteUser/:id", controllerUser.getDelete);

route.get('/createPresentation', controllerPresentation.getCreate)
route.post('/createPresentation', controllerPresentation.postCreate)
route.get('/presentationList', controllerPresentation.getList)
route.get('/editPresentation/:id', controllerPresentation.getEdit)
route.post('/editPresentation', controllerPresentation.postEdit)
route.get('/deletePresentation/:id', controllerPresentation.getDelete)
route.get('/abreVotacao', controllerPresentation.postAbreFechaVotacao)
route.get('/votacao', controllerPresentation.getListVotacao)
route.post('/votacao', controllerPresentation.postVotacao)*/

module.exports = route;