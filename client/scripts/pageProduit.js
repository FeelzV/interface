
function chargerpageProduit(id){
   // let id = decoderURLPourPorduit();
    if(id != null){
        getProduitById(id);
    }
}
function getProduitById(id){
    $.ajax({
        url: "/produits/"+id,
        success: function( result ) {
                fairePageProduit(result);
        }
    });
}

function fairePageProduit(item){
    $('#imageContainerPageProduit').append("<img src=\"images/"+item.nom+".jpg\" class=\"img-fluid rounded-start\" alt=\"Image du produit\">");
    document.getElementById('titrePageProduit').innerText = item.nom;
    document.getElementById('descriptionPageProduit').innerText = item.description;
    let item_button = $("<button type=\"button\" onclick=\"add_item("+item.id+")\"></button>")
                        .addClass("btn btn-primary position-relative")
                        .append('<i class="bi bi-cart-plus"></i>');
    $('#bodyPageProduit').append(item_button);
}
