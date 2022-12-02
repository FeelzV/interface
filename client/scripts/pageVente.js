function chargerpageVente(id){
     if(id != null){
         getVenteById(id);
     }
 }
 function getVenteById(id){
     $.ajax({
         url: "/ventes/"+id,
         beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
         success: function( result ) {
            console.log(result)
            fairePageVente(result);  
         }
     });
 }
 
 function fairePageVente(item){

     document.getElementById('titrepageVente').innerText = "Vente #"+item.id;

      
      let itemRow = document.getElementById('descriptionpageVente');

     item.produits.forEach(element => $('#descriptionpageVente').append("<div class=\"boxItemVente\"> <h5 class=\"card-text\">"+"Item #"+element.idProduit+"</h5>"
     +"<h6 class=\"card-text\">"+"Nom du produit : "+element.nomProduit+"</h6>"
     +"<h6 class=\"card-text\">"+"Prix : "+element.prix+"</h6>"
     +"<h6 class=\"card-text\">"+"Quantite : "+element.quantite+"</h6></div>"));
     
     
     let itemRow2 = document.getElementById('SuiteDescription').innerText = "Date : "+ item.date
     +"\nMontant total : "+ item.montant
     +"\nStatus : "+ item.status;

 }