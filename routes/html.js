const express = require('express');
const path = require('path');

var router = express.Router();

/**
 * Cette classe sert à retourner les pages HTML. Vous devez modifier cette classe pour ajouter les liens vers vos pages.
 * Le premier paramètre devrait être / suivit du nom de votre page. Le second paramètre est une fonction anonyme. Le
 * paramètre req représente la requête courante et res représente la réponse. La réponse retourne le fichier html demandé.
 * Votre fichier devrait être dans le dossier client.
 */
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/accueil.html'));
});

router.get('/inscription', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/inscription.html'));
});

router.get('/connexion', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/connexion.html'));
});

router.get('/points_de_vente', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/points_de_vente.html'));
});

router.get('/produit', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/produit.html'));
    });

router.get('/panier', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/panier.html'));
    });

router.get('/admin', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/admin.html'));
    });
    
router.get('/commande', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/commande.html'));
    });
router.get('/confirmation', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/confirmation.html'));
    });

router.get('/pageProduit/:idProduit', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/pageProduit.html'));
    });

router.get('/pageVente/:idVente', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/pageVente.html'));
    });


module.exports = router