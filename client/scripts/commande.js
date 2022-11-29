function chargercommande(){
    $('#list_panier').text('');
    ID_CLIENT = 1
    TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ){
            for(let i in result.items){
                $('#list_panier').append(commande_to_html(result.items[i]))

            }
            $('#sous_total_text').text(`Sous-total (${result.items.length} items) :`);
            $('#sous_total').text(result.valeur.toFixed(2));
            $('#livraison').text((result.valeur*0.1).toFixed(2));
            $('#taxes').text((result.valeur*0.15).toFixed(2));
            $('#total').text((result.valeur*1.25).toFixed(2));
        }
        });
}

function commande_to_html(item){
    container = $('<div class="row cart_item_container"></div>');
    item_image_container = $('<div class="col centrer contain_height"></div>');
    item_image=$(`<img class="panier_image">`).attr('src', "images/"+item.nomProduit+".png");
    item_image_container.append(item_image);
    item_desc_container = $('<div class="col centrer contain_height"></div>');
    item_desc_container.append(`<h4>${item.nomProduit}</h4>`);
    item_desc_container.append(`<h6>${item.prix}</h6>`);
    spacer = $('<div class="col centrer contain_height"></div>');
    spacer.append(`<p class="hideoverflow contain_height"> ${item.descriptionProduit} </p>`);

    container.append(item_image_container).append(item_desc_container).append(spacer).append(spacer);
    return container;
}