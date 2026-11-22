// ROUTEUR des commentaires, monte sur /api dans serveur.js.
// A ECRIRE : les six routes de CONTRAT.md, une ligne chacune, comme dans routes/articles.routes.js.
// Rappel : un middleware peut se mettre sur UNE route :
//    router.patch('/commentaires/:id', verifierJeton, controleur.modifier);
// Attention a l'ordre : GET /commentaires (avec ?nom=) avant GET /commentaires/:id ne pose pas de
// probleme, mais une route /commentaires/quelquechose placee apres /commentaires/:id ne serait jamais atteinte.

const express = require('express');
// const verifierJeton = require('../middlewares/jeton');
const controleur = require('../controllers/commentaires.controller');

const router = express.Router();

// les six routes ici

router.get('/articles/:id/commentaires', controleur.lister);          // lire tout
//router.post('/api/articles/:id/commentaires', controleur.creer);          // creer
//router.get('/articles/:id/commentaires', controleur.trouver);      // lire un, avec ?champs=
//router.patch('/:id', controleur.modifier);   // modifier en partie
//router.delete('/:id', controleur.supprimer); // supprimer


module.exports = router;
