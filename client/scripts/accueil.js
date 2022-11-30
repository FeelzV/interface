
$(document).ready(function(){
    filtrerAccueil();
    chargerCategoriesAccueil();
});

function filtrerAccueil(){

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
function itemToCard(item){
    let itemContaine = $("<div></div>").addClass("card mb-3 cardAccueil col-lg-4 col-md-6 col-sm-12");
    let itemRow = $("<div></div>").addClass("row g-0");
    let imageCol = $("<div></div>").addClass("col-md-4")
                    .append("<img src=\"images/"+item.nom+".png\" class=\"img-fluid rounded-start\" alt=\"...\">");
    let contentCol = $("<div></div>").addClass("col-md-8");
    let contentBody = $("<div></div>").addClass("card-body")
                        .append("<h5 class=\"card-title\">"+item.nom+"</h5>"+
                        "<p class=\"card-text\">"+item.description+"</p>"+
                        makeStars()+
                        "<span>"+item.prix+"$</span>");
    
    contentCol.append(contentBody);
    itemRow.append(imageCol).append(contentCol);
    itemContaine.append(itemRow);
    return itemContaine;
}

function makeStars(){
    let numberOfStar = Math.random() *5;
    let starText = "<span class=\"card-text stars\">"
    //Mettre étoiles remplies
    for(let i =0; i< numberOfStar;i++){
        starText += "&starf;";
    }
    //Mettre étoiles vides
    for(let i =0; i< 4-numberOfStar;i++){
        starText += "&star;";
    }
    starText += "</span>";
    return starText;
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
    let listeItem = $("<li></li>").append("<input type=\"radio\" name=\"categorie\" value="+item.id+" class=\"form-check-input\" id=\"radio"+item.id+"\"/>"
                                            +"<label class=\"form-check-label\" for=\"radio"+item.id+"\">"+item.nom+"</label>");
    return listeItem;
}
//onChange=\"chargerProduitAccueilParCategorie("+item.id+")\"

function searchBar(){
    window.location.replace('/#/');
    filtrerAccueil();
}

function retourAccueil(){
    $(window).attr('location','/#/');
    window.location.reload();
}