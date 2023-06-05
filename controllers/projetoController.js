const db = require('../config/db');
const msg = "Operação não autorizada."

module.exports = {

    async getProjetos(req, res) {

        const projetos = await db.Projeto.findAll({
            include: [
                {
                    model: db.Usuario, as: 'responsavel'
                },
                {
                    model: db.Usuario,
                    through: {
                        model: db.selecionadoProjeto,
                        attributes: []
                    }
                }
            ]
        });

        for (var i = 0; i < projetos.length; i++) {
            projetos[i].dataValues.popularidade = await db.candidatoProjeto.count({ where: { projetoId: projetos[i].id } })
        }

        return res.json({ "data": { projetos } });
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

        candidatos = await db.candidatoProjeto.count({ where: { projetoId: req.params.id } })

        projeto = await db.Projeto.findOne({ where: { id: req.params.id } })

        if (req.session.Usuario[0].tipo == 2 &&
            projeto.id_responsavel == req.session.Usuario[0].id) {

            if (candidatos > 0) return res.status(405).json("Não é possível excluir projeto que tem interessados.")

            await db.Projeto.destroy({
                where: { id: req.params.id }
            }).then(() => {
                return res.json("Projeto deletado.");
            });

        } else return res.status(401).json(msg)
    },

    async getProjetosAndCandidatosByResponsavel(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        if (req.session.Usuario[0].tipo == 2) {
            const projetos = await db.Projeto.findAll({
                where: {
                    id_responsavel: req.session.Usuario[0].id
                },
                include: [
                    {
                        model: db.Usuario,
                        through: {
                            model: db.candidatoProjeto,
                            attributes: []
                        }
                    }
                ]
            });

            return res.json({ "data": { projetos } });

        } else return res.status(401).json(msg)
    }
}