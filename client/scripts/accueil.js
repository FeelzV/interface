$(document).ready(function(){
    chargerProduitAccueil();
    chargerCategoriesAccueil();
});

function chargerProduitAccueil(){
    $('#sectionProduits').text("");
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
function filtrerAccueil(){
    $('#sectionProduits').text("");
    let data = {};
    let minimum = $("#accueilFiltreMin").val();
    if(minimum){
        data.minimum = minimum;
    }
    let maximum = $("#accueilFiltreMax").val();
    if(maximum){
        data.maximum = maximum
    }
    let categorie = $('input:radio[name=categorie]:checked').val();
    if(categorie){
        data.categorie = parseInt(categorie);
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
function itemToCard(item){
    let itemContaine = $("<div></div>").addClass("card mb-3 cardAccueil col-lg-4 col-md-6 col-sm-12");
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

function chargerCategoriesAccueil(){
    $.ajax({
        url: "/categories",
        success: function( result ) {
            $.each(result, function(key,value){
                item = categoryToListItem(value)
                $('#listeCategorie').append(item)
            })
        }
    });
}

function categoryToListItem(item){
    let listeItem = $("<li></li>").append("<input type=\"radio\" name=\"categorie\" value="+item.id+"/>"
                                            +"<label>"+item.nom+"</label>");
    return listeItem;
}
//onChange=\"chargerProduitAccueilParCategorie("+item.id+")\"
