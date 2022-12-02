function chargeradmin(){
    $('#sectionProduits').text("");
    $.ajax({
    url: "/ventes",
    beforeSend: function (xhr){
        xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
    },
    success: function( result ) {
        $.each(result, function(key,value){
            item = itemToCardAdmin(value)
            $('#sectionProduits').append(item)
        })
    }
});
}

function itemToCardAdmin(item){

    let itemContaine = $("<a href=\"/#/pageVente/"+item.id+"\"></a>").addClass("card mb-3 cardAccueil col-lg-4 col-md-6 col-sm-12");
    let itemRow = $("<div></div>").addClass("row g-0")
            .append("<h5 class=\"card-text\">"+"Vente #"+item.id+"</h5>"+
            "<h5 class=\"card-text\">"+"Id du client : "+item.idClient+"</h5>"+
            "<h5 class=\"card-text\">"+"Montant payé : "+item.montant+"$"+"</h5>");

    let statusClass = "statusvert";
    if(item.status == "prepare"){
        statusClass = "statusjaune"
    }
    if(item.status == "annule"){
        statusClass = "statusrouge"
    }

    itemRow.append("<h5 class=\""+statusClass+"\"></h5>");

    itemContaine.append(itemRow);

    return itemContaine;
}


function filtrerAdmin(){
    $('#sectionProduits').text("");
    let data = {};//Faire un objet data dynamiquement
    let status = $('input:radio[name=etats]:checked').val();
    
    if(status){
        data.status = status;
    }
    let idClient = $("#idduclient").val();
    if(idClient){
        data.client = idClient;
    }
    let nom = $('#searchBar').val();
    if(nom){
        data.nom = nom;
    }
    $.ajax({
    url: "/ventes",
    data:data,
    beforeSend: function (xhr){
        xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
    },
    success: function( result ) {
        $.each(result, function(key,value){
            item = itemToCardAdmin(value)
            $('#sectionProduits').append(item)
        })
    },
    error: function(result){
        console.log(result);
    }
});
}