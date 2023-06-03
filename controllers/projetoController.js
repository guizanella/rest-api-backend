const db = require('../config/db');
const msg = "Operação não autorizada."

module.exports = {

    async getProjetos(req, res) {

        const projetos = await db.Projeto.findAll({
            include: [{ model: db.Usuario, as: 'responsavel' }]
        });
        return res.json({ "data": { projetos } });
        //trazer selecionados e popularidade
    },

    async getProjetoById(req, res) {

        const { id } = req.params;
        projeto = await db.Projeto.findOne({ where: { id: id } })
        if (projeto)
            return res.json({ "data": { projeto } });
        else
            return res.status(204).json();
    },

    async postProjeto(req, res) {

        const projeto = new db.Projeto(req.body);

        await projeto.save().then((projeto) => {
            return res.status(201).json({ "data": { projeto } });
        });
    },

    async putProjeto(req, res) {

        await db.Projeto.update(req.body, {
            where: { id: req.params.id },
            returning: true
        }).then((projeto) => {
            return res.status(201).json({ "data": { projeto } });
        });
    },

    async deleteProjeto(req, res) {
        //se não tiver candidatos
        await db.Projeto.destroy({
            where: { id: req.params.id }
        }).then(() => {
            return res.status(204).json();
        });
    }

    //find by id responsavel
}