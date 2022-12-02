function chargerproduit(){
    $.ajax({
    url: "/produits",
    success: function( result ) {
        $.each(result, function(key,value){
            item = item_to_html(value)
            $('#list_items').append(item)
        })
    }
    });
}

function item_to_html(item){
    item_card = $('<div></div>')
    .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div></div>')
    .addClass('card-header py-3')
    .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');
    item_detail = $('<ul></ul>')
    .addClass('list-unstyled mt-3 mb-4')
    .append('<li>Qte dispo. :' + item.qte_inventaire +'</li>')
    .append('<li>Categorie. :' + item.categorie.nom +'</li>');
    
    item_button = $(`<button type="button" onclick="add_item(${item.id})"></button>`)
    .addClass("btn btn-primary position-relative")
    .append('<i class="bi bi-cart-plus"></i>')

    item_icon = $('<p></p>')
    .addClass("w-100 display-6 text-center")
    .append(item_button)
    item_desc = $('<p>'+item.categorie.description+'</p>')
    item_body = $('<div></div>')
    .addClass('card-body')
    .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>')
    .append(item_detail)
    .append(item_desc)
    .append(item_icon)
    item_card.append(item_head).append(item_body);
    return $('<div></div>').addClass('col-md-3') .append(item_card);
    }

$(function () {
    chargerproduit()
});

function add_item(id_item){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#item_counter').text(result.items.length)
        },
        error: function( result ) {
            noLoginAlert();
        }
        });
};

function chargerpanier(){
    $('#list_panier').text('');
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ){
            for(let i in result.items){
                if (result.items[i].quantite <= 0){
                    retirer_item(result.items[i].id)
                }
                else{
                    $('#list_panier').append(panier_to_html(result.items[i]))
                }
            }
            $('#sous_total_text').text(`Sous-total (${result.items.length} items) :`);
            $('#sous_total').text(result.valeur.toFixed(2));
            $('#livraison').text((result.valeur*0.1).toFixed(2));
            $('#taxes').text((result.valeur*0.15).toFixed(2));
            $('#total').text((result.valeur*1.25).toFixed(2));
        },
        error: function( result ) {
            noLoginAlert();
        }
        });
}

function updatepaniertooltip(){
    if( ID_CLIENT != null && TOKEN_CLIENT != null && ID_CLIENT != -1){
        $.ajax({
            url: "/clients/"+ID_CLIENT+"/panier",
            method:"GET",
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
            },
            success: function( result ){
                $('#item_counter').text(result.items.length)
            }
            });
    }
    
}

function panier_to_html(item){
    container = $('<div class="row cart_item_container"></div>');
    item_image_container = $('<div class="col centrer contain_height"></div>');
    item_image=$(`<img class="panier_image">`).attr('src', "images/"+item.nomProduit+".jpg");
    item_image_container.append(item_image);
    item_desc_container = $('<div class="col centrer"></div>');
    item_desc_container.append(`<h4>${item.nomProduit}</h4>`);
    item_desc_container.append(`<h6>${item.prix}</h6>`);
    spacer = $('<div class="col centrer contain_height"></div>');
    spacer.append(`<p class="contain_height"> ${item.descriptionProduit} </p>`);

    item_qtt_container=$('<div class="col centrer contain_height"></div>');

    item_qtt_container.append($('<div class="row"></div>').append(`<h6 class="noMargin">Quantité</h6>`));

    item_qtt_controller = $('<div class="qtt_control_container centrer"></div>');
    minus_container = $('<div class="qtt_control minus"></div>');
    minus_button = $(`<button type="button" class="btn btn-outline-danger qtt_button qtt">-</button>`).attr('onclick', `update_qtt(${item.id}, -1)`);
    minus_container.append(minus_button);
    minus_container.append(minus_button)
    qtt_container = $('<div class="qtt_control currentqtt"></div>');
    qtt_container.append(`<h6 class="qtt">${item.quantite}</h6>`)
    plus_container = $('<div class="qtt_control plus"></div>');
    plus_button = $(`<button type="button" class="btn btn-outline-success qtt_button qtt">+</button>`).attr('onclick', `update_qtt(${item.id}, 1)`);
    plus_container.append(plus_button);

    item_qtt_controller.append(minus_container).append(qtt_container).append(plus_container);

    item_retirer_button_container = $('<div class="row"></div>');
    item_retirer_button = $(`<button type="button" class="btn btn-outline-danger retirer" onclick="retirer_item(${item.id})">retirer</button>`)
    item_retirer_button_container.append(item_retirer_button);

    
    item_qtt_container.append(item_qtt_controller).append(item_retirer_button_container);

    container.append(item_image_container).append(item_desc_container).append(spacer).append(spacer).append(item_qtt_container);
    return container;
    }


function retirer_item(itemid){
    ID_CLIENT = 1
    TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier/"+itemid,
        method:"DELETE",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: chargerpanier,
        error: function( result ) {
            noLoginAlert();
        }
    });
}

function update_qtt(itemid, qtt){
    ID_CLIENT = 1
    TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"
    
    
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier/"+itemid,
        method:"PUT",
        data: JSON.stringify({"quantite": qtt}),
        contentType: "application/json",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: chargerpanier,
        error: function( result ) {
            noLoginAlert();
        }
    });
}


window.addEventListener('load', function(){
    updatepaniertooltip();
});