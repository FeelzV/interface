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

     item.produits.forEach(element => itemRow.append("<h5 class=\"card-text\">"+"Item #"+element.idProduit
     +"\nNom du produit : "+element.nomProduit
     +"\nPrix : "+element.prix
     +"\nQuantite : "+element.quantite+"</h5>"
     ));
     
     let itemRow2 = document.getElementById('SuiteDescription').innerText = "Date : "+ item.date
     +"\nMontant total : "+ item.montant
     +"\nStatus : "+ item.status;

 }