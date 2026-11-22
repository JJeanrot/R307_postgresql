-- =============================================================================
-- PARTIE A · Question 3 · Six requetes
-- Sous chaque question : votre requete, puis le resultat obtenu, en commentaire.
-- =============================================================================

-- R1. Les commentaires de l'article 2, du plus recent au plus ancien : nom, texte.

SELECT nom, texte
FROM commentaires
WHERE article_id = 2
ORDER BY cree_le DESC;

--  nom  |                            texte                            
-- ------+-------------------------------------------------------------
--  Inès | Des photos de la pose seraient les bienvenues.
--  Hugo | Le noyer est magnifique. Combien de temps pour le séchage ?


-- R2. Le nombre de commentaires de CHAQUE article, y compris ceux qui n'en ont aucun :
--     id, titre, nb_commentaires.

SELECT articles.id, titre, COUNT(commentaires.id) AS nb_commentaires
FROM articles
LEFT JOIN commentaires ON commentaires.article_id = articles.id
GROUP BY articles.id, titre
ORDER BY articles.id;

--  id |                   titre                   | nb_commentaires 
-- ----+-------------------------------------------+-----------------
--  1 | Choisir son bois pour une table de jardin |               3
--  2 | Une bibliothèque sur mesure à Besançon    |               2
--  3 | Huile ou vernis : ce qui protège vraiment |               0
--  4 | Restaurer une chaise paillée              |               1
--  5 | Une cuisine en chêne massif à Dole        |               2
--  6 | Affûter ses ciseaux à bois                |               0
--  7 | Article de verification                   |               0
--  8 | Article de verification                   |               0


-- R3. Les articles qui n'ont aucun commentaire : id, titre.

SELECT articles.id, titre
FROM articles
LEFT JOIN commentaires ON commentaires.article_id = articles.id
GROUP BY articles.id, titre
HAVING COUNT(commentaires.id) = 0
ORDER BY articles.id;

-- id |                   titre                   
------+-------------------------------------------
--  3 | Huile ou vernis : ce qui protège vraiment
--  6 | Affûter ses ciseaux à bois
--  7 | Article de verification
--  8 | Article de verification


-- R4. Pour chaque auteur, le nombre total de commentaires recus sur ses articles,
--     du plus commente au moins commente.

SELECT auteurs.id, prenom, COUNT(commentaires.id) AS total_commentaires
FROM auteurs
JOIN articles ar ON ar.auteur_id = auteurs.id
LEFT JOIN commentaires ON commentaires.article_id = ar.id
GROUP BY auteurs.id, prenom
ORDER BY total_commentaires DESC;

-- id | prenom | total_commentaires 
------+--------+--------------------
--  1 | Marc   |                  5
--  3 | Théo   |                  2
--  2 | Sophie |                  1


-- R5. Les visiteurs (nom) qui ont commente plus d'un article.

SELECT nom
FROM commentaires
JOIN articles ON articles.id = commentaires.article_id
GROUP BY nom
HAVING COUNT(*) > 1;

--  nom   
----------
-- Claire


-- R6. Les trois commentaires les plus recents, avec le titre de leur article.

SELECT c.nom, c.article_id, c.texte, c.cree_le, a.titre
FROM commentaires c
JOIN articles a ON c.article_id = a.id
ORDER BY cree_le DESC
LIMIT 3;

--  nom   | article_id |                            texte                             |  cree_le   |               titre                
----------+------------+--------------------------------------------------------------+------------+------------------------------------
-- Karim  |          5 | Superbe travail.                                             | 2026-10-18 | Une cuisine en chêne massif à Dole
-- Claire |          5 | Aucune vis visible : comment sont fixés les caissons ?       | 2026-10-16 | Une cuisine en chêne massif à Dole
-- Lucie  |          4 | J"ai une chaise à faire refaire, vous prenez les commandes ? | 2026-10-09 | Restaurer une chaise paillée















