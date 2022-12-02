function chargercommande(){
    $('#list_panier').text('');
    $.ajax({
        url: "/clients/"+window.localStorage.getItem('idClient')+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ window.localStorage.getItem('tokenClient'));
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
        },
        error: function( result ) {
            noLoginAlert(result.status);
        }
        });
}

function commande_to_html(item){
    container = $('<div class="row cart_item_container"></div>');
    item_image_container = $('<div class="col centrer contain_height"></div>');
    item_image=$(`<img class="panier_image">`).attr('src', "images/"+item.nomProduit+".jpg");
    item_image_container.append(item_image);
    item_desc_container = $('<div class="col centrer contain_height"></div>');
    item_desc_container.append(`<h5>${item.nomProduit}</h5>`);
    item_desc_container.append(`<h6>${item.prix}</h6>`);
    spacer = $('<div class="col centrer contain_height"></div>');
    spacer.append(`<p class="hideoverflow contain_height graytext"> ${item.descriptionProduit} </p>`);

    item_qtt_container=$('<div class="col centrer contain_height"></div>');
    item_qtt_container.append($('<div class="row"></div>').append(`<h6 class="noMargin">Quantité</h6>`));
    item_qtt_controller = $('<div class="qtt_control_container centrer"></div>');
    qtt_container = $('<div class="qtt_control currentqtt"></div>');
    qtt_container.append(`<h6 class="qtt">${item.quantite}</h6>`)

    item_qtt_controller.append(qtt_container)
    item_qtt_container.append(item_qtt_controller);

    container.append(item_image_container).append(item_desc_container).append(spacer).append(item_qtt_container);
    return container;
}

function commande(){
    $.ajax({
        url: "/ventes/",
        method:"POST",
        data: JSON.stringify({idClient: parseInt(window.localStorage.getItem('idClient'))}),
        contentType: "application/json",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ window.localStorage.getItem('tokenClient'));
        },
        success: function( result ){
            console.log(result)
            populerConfirmation(result);
            window.location.href = "#/confirmation";
            
        },
        error: function( result ) {
            noLoginAlert(result.status);
        }
    })
}