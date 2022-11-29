$(function () {
    chargerProduitAccueil()
});

function chargerProduitAccueil(){
    $.ajax({
    url: "/produits",
    success: function( result ) {
        $.each(result, function(key,value){
            item = itemToCard(value)
            $('#sectionProduits').append(item)
        })
    }
});
}

function itemToCard(item){
    let itemContaine = $("<div></div>").addClass("card mb-3 cardAccueil");
    let itemRow = $("<div></div>").addClass("row g-0");
    let imageCol = $("<div></div>").addClass("col-md-4")
                    .append("<img src=\"images/logo.png\" class=\"img-fluid rounded-start\" alt=\"...\">");
    let contentCol = $("<div></div>").addClass("col-md-8");
    let contentBody = $("<div></div>").addClass("card-body")
                        .append("<h5 class=\"card-title\">"+item.nom+"</h5>"+
                        "<p class=\"card-text\">"+item.description+"</p>"+
                        "<span class=\"card-text\">&starf;&starf;&starf;&star;&star;</span>"+
                        "<span>"+item.prix+"$</span>");
    
    contentCol.append(contentBody);
    itemRow.append(imageCol).append(contentCol);
    itemContaine.append(itemRow);
    return itemContaine;
}