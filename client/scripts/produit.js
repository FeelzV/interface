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
    ID_CLIENT = 1
    TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#item_counter').text(result.items.length)
        }
        });
};

function chargerpanier(){
    ID_CLIENT = 1
    TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ){
            $('#prixTotal').text("Total : "+result.valeur)
            for(let i in result.items){
                $('#list_panier').append(panier_to_html(result.items[i]))
            }
        }
        });
}

function panier_to_html(item){
    item_name = $('<div></div>')
    .addClass('col centrer')
    .append(`<h4>${item.nomProduit}</h4>`)
    item_price = $('<div></div>')
    .addClass('col centrer')
    .append(`<h4>${item.prix}</h4>`)
    item_qte = $('<div></div>')
    .addClass('col centrer')
    .append(`<h4>${item.quantite}</h4>`)
    item_soustot = $('<div></div>')
    .addClass('col centrer')
    .append(`<h4>${item.quantite*item.prix}</h4>`)
    item_spacer = $('<div></div>')
    .addClass('col centrer')
    item_row = $('<div></div>')
    .addClass('row cart_item_container')
    .append(item_name)
    .append(item_price)
    .append(item_qte)
    .append(item_soustot)
    .append(item_spacer)
    return item_row;
    }

