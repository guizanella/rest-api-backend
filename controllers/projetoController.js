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

    async postProjeto(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        if (req.session.Usuario[0].tipo == 2) {
            const projeto = new db.Projeto(req.body); 
            projeto.id_responsavel = req.session.Usuario[0].id

            await projeto.save().then((projeto) => {
                return res.status(201).json({ "data": { projeto } });
            });
        } else return res.status(401).json(msg)
    },

    async putProjeto(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        projeto = await db.Projeto.findOne({ where: { id: req.params.id } })

        if (req.session.Usuario[0].tipo == 2 &&
            projeto.id_responsavel == req.session.Usuario[0].id) {

            req.body.id_responsavel = req.session.Usuario[0].id

            await db.Projeto.update(req.body, {
                where: { id: req.params.id }
            }).then((projeto) => {
                return res.status(201).json({ "data": { projeto } });
            });

        } else return res.status(401).json(msg)
    },

    async deleteProjeto(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        projeto = await db.Projeto.findOne({ where: { id: req.params.id } })

        if (req.session.Usuario[0].tipo == 2 &&
            projeto.id_responsavel == req.session.Usuario[0].id
            /* && se não tiver candidatos */) {

            await db.Projeto.destroy({
                where: { id: req.params.id }
            }).then(() => {
                return res.status(204).json();
            });

        } else return res.status(401).json(msg)
    }

    //find by id responsavel
}