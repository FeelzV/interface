function populerConfirmation(commande){
    console.log(commande)
    for (let i in commande.produits){
        console.log(commande.produits[i])
        $('#list_panier').append(commande_to_html(commande.produits[i]))
    }
}

function chargerconfirmation(){
    
}