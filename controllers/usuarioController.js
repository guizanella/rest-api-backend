const db = require('../config/db')
const { Op } = require('sequelize');
const msg = "Operação não autorizada."

module.exports = {

    async postLogout(req, res) {
        req.session.destroy()
        return res.json({ "data": "Usuário desconectado" })
    },
    async postLogin(req, res) {
        db.Usuario.findAll({ where: { email: req.body.email, senha: req.body.senha } })
            .then(usuario => {
                if (usuario.length > 0) {
                    req.session.Usuario = usuario
                    return res.json({ "data": "Usuário logado!" })
                } else {
                    return res.status(401).json({ "data": "E-mail ou senha incorretos." })
                }
            })
    },

    async getUsuarios(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        if (req.session.Usuario[0].tipo == 1) {

            const usuarios = await db.Usuario.findAll();
            return res.json({ "data": { usuarios } });

        } else { return res.status(401).json(msg) }
    },

    async postUsuario(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        if (req.session.Usuario[0].tipo == 1) {
            const usuario = new db.Usuario(req.body);

            await usuario.save().then((usuario) => {
                return res.status(201).json({ "data": { usuario } });
            });
        } else return res.status(401).json(msg)
    },

    async putUsuario(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        if (req.session.Usuario[0].tipo == 1) {

            await db.Usuario.update(req.body, {
                where: { id: req.params.id },
                returning: true
            }).then((usuario) => {
                return res.status(201).json({ "data": { usuario } })
            });

        } else return res.status(401).json(msg)
    },

    async deleteUsuario(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        if (req.session.Usuario[0].tipo == 1) {

            await db.Usuario.destroy({ where: { id: req.params.id } })
                .then(() => {
                    return res.json("Usuário deletado.");
                });

        } else return res.status(401).json(msg)
    },

    async getSelecionadosByProjeto(req, res) {

        var selecionadosProjeto = await db.selecionadoProjeto.findAll({ where: { projetoId: req.params.id } });

        var idSelecionados = []

        for (var i = 0; i < selecionadosProjeto.length; i++) {
            idSelecionados.push(selecionadosProjeto[i].usuarioId)
        }

        const selecionados = await db.Usuario.findAll({ where: { id: idSelecionados } });
        return res.json({ "data": { selecionados } });
    }
}