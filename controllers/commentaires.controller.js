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
    const article_id = Number(req.params.id)
    service.lister(article_id)
        .then((liste) => res.json(liste))
        .catch(next);
}

// POST /api/articles
/*
function creer(req, res, next) {
  const { titre, categorie, auteur, contenu } = req.body || {};
  if (!titre) return next(new ErreurHttp(400, 'TITRE_MANQUANT', 'Le champ titre est obligatoire.'));
  service.creer({ titre, categorie, auteur, contenu })
    .then((article) => res.status(201).json(article))
    .catch(next);
}
*/
module.exports = {lister};
