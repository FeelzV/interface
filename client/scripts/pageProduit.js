
function chargerpageProduit(){
    let id = decoderURLPourPorduit();
    if(id != null){
        getProduitById(id);
    }
}
function getProduitById(id){
    $.ajax({
        url: "/produits/"+id,
        success: function( result ) {
           
                fairePageProduit(result)
               // $('#pageProduit').append(item)
            
        }
    });
}

function fairePageProduit(item){
    $('#imageContainerPageProduit').append("<img src=\"images/"+item.nom+"\" class=\"img-fluid rounded-start\" alt=\"Image du produit\">");
    document.getElementById('titrePageProduit').innerText = item.nom;
    document.getElementById('descriptionPageProduit').innerText = item.description;
    let item_button = $("<button type=\"button\" onclick=\"add_item("+item.id+")\"></button>")
                        .addClass("btn btn-primary position-relative")
                        .append('<i class="bi bi-cart-plus"></i>');
    $('#bodyPageProduit').append(item_button);
}


function ouvrirProduit(id){
    window.location.replace("/#/pageProduit/"+id);
    window.location.reload();
}

function decoderURLPourPorduit(){
    let path = window.location.hash;
    let morceaux = path.split('/');//morceaux[0] = '#', morceau[1] = nom de la page courante, morceau[2] = id du produit
    if(morceaux[1] != "pageProduit")
        return null;
    else
        return morceaux[2];
}