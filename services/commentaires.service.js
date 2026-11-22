// SERVICE des commentaires · VERSION FICHIER JSON (celle de depart).
// Elle respecte le contrat (CONTRAT.md) : le cote API peut s'en servir tout de suite pour tester
// ses routes. Le cote base la remplace par une version PostgreSQL, avec les MEMES fonctions.
// Les articles, eux, sont deja dans PostgreSQL (services/articles.service.js).

const pool = require('../db/pool');
const ErreurHttp = require('../utils/erreur-http');
const articles = require('./articles.service');

const COLONNES = `
    SELECT c.id, a.titre, c.nom, c.texte, c.cree_le
    FROM commentaires c
    JOIN articles a ON a.id = c.commentaires
`;

const introuvable = (id) => new ErreurHttp(404, 'COMMENTAIRE_INTROUVABLE', `Le comenataire ${id} n'existe pas.`);

async function lister(articleId) {
    const article = await pool.query(`

    SELECT id
    FROM articles
    WHERE id = $1`, [id]);

    if (!article.rowCount === 0) throw articles.introuvable(id);
    const resultat = await pool.query(`
        
    SELECT ${COLONNES}
    WHERE c.articleId = $1`, [articleId]);

    return resultats.rows;
}

async function trouver(id) {
    const resultat = await pool.query(`
        
    SELECT ${COLONNES}
    WHERE c.id = $1`, [id]);

    if (resultat.rowCount === 0) throw introuvable(id);
    return resultats.rows;
}

async function parVisiteur(nom) {
    const resultat = await pool.query(`
        
    SELECT ${COLONNES}
    WHERE c.nom = $1`, [nom]);

    return resultats.rows;
}

async function creer(articleId, { nom, texte }) {
    try {
        const date = new Date().toISOString();
        const resultat = await pool.query(`

        INSERT INTO commentaires (article_id, nom, texte, cree_le) 
        ($1, $2, $3, $4)
        RETURNING id`, [articleId, nom, texte, date]);
        
        return resultat.rows;
    } catch(err) {
        if (err.code === '23503') throw articles.introuvable(articleId);
        throw err;
    }
}

async function modifier(id, { texte }) {
    const date = new Date().toISOString();
    const resultat = await pool.query(`

    UPDATE commentaires SET
    texte = COALESCE($2, texte)
    WHERE id = $1
    RETURNING id`, [articleId, texte]);
        
    if (resultat.rowCount === 0) throw introuvable(id);
    return resultat.rows;
}

async function supprimer(id) {
    if (!Number.isInteger(id)) throw introuvable(id);
    const resultat = await pool.query(`

    DELETE FROM commentaires
    WHERE id = $1`, [id]);

    if (resultat.rowCount === 0) throw introuvable(id);
}


module.exports = { lister, trouver, parVisiteur, creer, modifier, supprimer };
