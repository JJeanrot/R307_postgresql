const pool = require('../db/pool');
const ErreurHttp = require('../utils/erreur-http');
const articles = require('./articles.service');

const COLONNES = 'c.id, c.article_id, c.nom, c.texte, c.cree_le';

const introuvable = (id) => new ErreurHttp(404, 'COMMENTAIRE_INTROUVABLE', `Le commentaire ${id} n'existe pas.`);
const articleIntrouvable = (id) => new ErreurHttp(404, 'ARTICLE_INTROUVABLE', `L'article ${id} n'existe pas.`);

async function lister(articleId) {
  await articles.trouver(articleId); 
  const resultat = await pool.query(
    `SELECT ${COLONNES} FROM commentaires c WHERE c.article_id = $1 ORDER BY c.cree_le`,
    [articleId],
  );
  return resultat.rows;
}

async function trouver(id) {
  if (!Number.isInteger(id)) throw introuvable(id);
  const resultat = await pool.query(`SELECT ${COLONNES} FROM commentaires c WHERE c.id = $1`, [id]);
  if (resultat.rowCount === 0) throw introuvable(id);
  return resultat.rows[0];
}

async function parVisiteur(nom) {
  const resultat = await pool.query(
    `SELECT ${COLONNES}, a.titre
     FROM commentaires c JOIN articles a ON a.id = c.article_id
     WHERE c.nom = $1
     ORDER BY c.cree_le DESC`,
    [nom],
  );
  return resultat.rows;
}

async function creer(articleId, { nom, texte }) {
  if (!Number.isInteger(articleId)) throw articleIntrouvable(articleId);
  try {
    const resultat = await pool.query(
      `INSERT INTO commentaires (article_id, nom, texte) VALUES ($1, $2, $3) RETURNING *`,
      [articleId, nom, texte],
    );
    return resultat.rows[0];
  } catch (err) {
    if (err.code === '23503') throw articleIntrouvable(articleId);
    throw err;
  }
}

async function modifier(id, { texte }) {
  if (!Number.isInteger(id)) throw introuvable(id);
  const resultat = await pool.query(
    `UPDATE commentaires SET texte = $2 WHERE id = $1 RETURNING *`,
    [id, texte],
  );
  if (resultat.rowCount === 0) throw introuvable(id);
  return resultat.rows[0];
}

async function supprimer(id) {
  if (!Number.isInteger(id)) throw introuvable(id);
  const resultat = await pool.query('DELETE FROM commentaires WHERE id = $1', [id]);
  if (resultat.rowCount === 0) throw introuvable(id);
}

module.exports = { lister, trouver, parVisiteur, creer, modifier, supprimer };