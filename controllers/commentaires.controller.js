// CONTROLEUR des commentaires.
// A ECRIRE : une fonction (req, res, next) par route de CONTRAT.md, comme dans
// controllers/articles.controller.js :
//   1. lire req.params, req.query, req.body ;
//   2. verifier la forme : 400 si un champ obligatoire manque ;
//   3. appeler le service (services/commentaires.service.js) ;
//   4. choisir le code (200, 201 ou 204). Toute erreur part vers next(err).
// Le controleur ne parle JAMAIS a la base : pas de pool ici, seulement le service.

// const service = require('../services/commentaires.service');
// const ErreurHttp = require('../utils/erreur-http');

const service = require('../services/commentaires.service');
const ErreurHttp = require('../utils/erreur-http');

// GET /api/articles/:id/commentaires
function lister(req, res, next) {
    const article_id = Number(req.params.id);
    service.lister(article_id)
        .then((liste) => res.json(liste))
        .catch(next);
}

// POST /api/articles/:id/commentaires
function creer(req, res, next) {
    const article_id = Number(req.params.id);
    const { nom, texte } = req.body || {};
    if (!nom || !texte) {return next(new ErreurHttp(400, 'CHAMP_MANQUANT', 'Les champs nom et texte sont obligatoires.'));}
    service.creer(article_id, { nom, texte })
        .then((commentaire) => res.status(201).json(commentaire))
        .catch(next);
}

// GET /api/commentaires?nom=Claire
function parVisiteur(req, res, next) {
  const { nom } = req.query;
  if (!nom) return next(new ErreurHttp(400, 'NOM_MANQUANT', 'Le paramètre nom est obligatoire.'));
  service.parVisiteur(nom)
    .then((liste) => res.json(liste))
    .catch(next);
}

// GET /api/commentaires/:id
function trouver(req, res, next) {
  const id = Number(req.params.id);
  service.trouver(id)
    .then((commentaire) => res.json(commentaire))
    .catch(next);
}

// PATCH /api/commentaires/:id
function modifier(req, res, next) {
  const id = Number(req.params.id);
  const { texte } = req.body || {};
  if (!texte) return next(new ErreurHttp(400, 'TEXTE_MANQUANT', 'Le champ texte est obligatoire.'));
  service.modifier(id, { texte })
    .then((commentaire) => res.json(commentaire))
    .catch(next);
}

// DELETE /api/commentaires/:id
function supprimer(req, res, next) {
  const id = Number(req.params.id);
  service.supprimer(id)
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = { lister, creer, parVisiteur, trouver, modifier, supprimer };