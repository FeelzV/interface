function chargeradmin(){
    $('#sectionProduits').text("");
    $.ajax({
    url: "/ventes",
    success: function( result ) {
        $.each(result, function(key,value){
            item = itemToCardAdmin(value)
            $('#sectionProduits').append(item)
        })
    }
});
}

function itemToCardAdmin(item){

    let itemContaine = $("<div></div>").addClass("card mb-3 cardAccueil col-lg-4 col-md-6 col-sm-12");
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
    let minimum = $("#accueilFiltreMin").val();
    if(minimum){
        data.minimum = parseInt(minimum);
    }
    let maximum = $("#accueilFiltreMax").val();
    if(maximum){
        data.maximum = parseInt(maximum);
    }
    let categorie = $('input:radio[name=categorie]:checked').val();
    if(categorie){
        data.categorie = parseInt(categorie);
    }
    let nom = $('#searchBar').val();
    if(nom){
        data.nom = nom;
    }
    $.ajax({
    url: "/produits",
    data:data,
    success: function( result ) {
        $.each(result, function(key,value){
            item = itemToCard(value)
            $('#sectionProduits').append(item)
        })
    },
    error: function(result){
        console.log(result);
    }
});
}