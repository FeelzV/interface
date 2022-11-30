var commandeSave;

function populerConfirmation(commande){
    commandeSave = commande;
}

function chargerconfirmation(){
    let commande = commandeSave;
    for (let i in commande.produits){
        $('#list_panier').append(commande_to_html(commande.produits[i]))
    }
    $('#sous_total_text').text(`Sous-total (${commande.produits.length} items) :`);
    $('#sous_total').text(commande.montant.toFixed(2));
    $('#livraison').text((commande.montant*0.1).toFixed(2));
    $('#taxes').text((commande.montant*0.15).toFixed(2));
    $('#total').text((commande.montant*1.25).toFixed(2));
    $('#date_commande').text("Date de commande : "+new Date(commande.date).toISOString().split('T')[0]);
    $('#nb_articles_commande').text("Nb articles : "+commande.produits.length);
    $('#status').text("État de la commande : "+commande.status);

}